'use client'
import { useEffect, useRef, useState } from "react"

/**
 * Full-bleed WebGL hero background: photo 1 is shown liquid-warped under a
 * smoky veil, and the cursor (or a finger) scrubs it away like a scratch card
 * to reveal photo 2 underneath. No external dependencies.
 *
 * Interaction:
 *  - Moving the pointer swirls the smoke and permanently scrubs the top layer
 *    away along the path, revealing the next image.
 *  - Once SCRUB_TARGET of the banner is scrubbed, the rest of the top layer
 *    dissolves. The revealed image then becomes the top layer right away (no
 *    smoke screen in between), the following image goes underneath, and the
 *    smoke colour moves to the next palette. Images loop in order.
 *  - With one image, plain smoke is on top and the image is revealed; it is
 *    shown for HOLD_MS, then the smoke rolls back in.
 *
 * How it works:
 *  - An eased "brush" follows the pointer and is stamped along its path into
 *    two small offscreen canvases:
 *      velocity: R/G encode movement direction, relaxing back to grey (0.5);
 *                used to displace / swirl the smoke.
 *      reveal:   white where the brush has been (never fades); the scrub mask.
 *    Coverage of the reveal canvas is measured a few times a second.
 *  - Both are uploaded as textures and blurred in the shader; the reveal edge
 *    is broken up with noise so it burns away like smoke. A global `u_clear`
 *    value drives the full dissolve / refill with a noisy organic front.
 *  - With no images, a procedural gold layer is revealed instead.
 */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_velocity;
uniform sampler2D u_reveal;
uniform sampler2D u_top;    // image shown under the smoke veil
uniform float u_hasTop;
uniform float u_topAspect;
uniform sampler2D u_under;  // image revealed by scrubbing
uniform float u_hasUnder;
uniform float u_underAspect;
uniform float u_time;
uniform float u_clear;      // 0 = smoke as painted, 1 = fully dissolved
uniform float u_settle;     // 0..1: eases the top image's warp/veil in after a swap
uniform vec2 u_res;
uniform vec3 u_ink;         // smoke palette
uniform vec3 u_mid;
uniform vec3 u_hi;
uniform vec3 u_acc;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // quintic: smoother than cubic
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

// Soft 9-tap blur so the trail textures never show blob edges.
vec4 soft(sampler2D tex, vec2 uv) {
  vec2 o = 1.5 / vec2(256.0);
  vec4 c = texture2D(tex, uv) * 0.25;
  c += (texture2D(tex, uv + vec2(o.x, 0.0)) + texture2D(tex, uv - vec2(o.x, 0.0))
      + texture2D(tex, uv + vec2(0.0, o.y)) + texture2D(tex, uv - vec2(0.0, o.y))) * 0.125;
  c += (texture2D(tex, uv + o) + texture2D(tex, uv - o)
      + texture2D(tex, uv + vec2(o.x, -o.y)) + texture2D(tex, uv + vec2(-o.x, o.y))) * 0.0625;
  return c;
}

// Domain-warped smoke field; returns (density, warp.x, warp.y).
vec3 smoke(vec2 p) {
  float t = u_time * 0.025;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) - t));
  return vec3(fbm(p + 2.6 * r), r);
}

vec3 smokeColor(vec3 s) {
  float f = s.x;
  vec3 col = mix(u_ink, u_mid, smoothstep(0.3, 0.85, f));
  col = mix(col, u_acc, smoothstep(0.35, 0.9, s.y) * 0.5);
  col = mix(col, u_hi, smoothstep(0.62, 0.95, f * s.z * 1.5) * 0.8);
  return col;
}

// Fallback revealed layer when there are no images.
vec3 goldSmoke(vec3 s) {
  float f = s.x;
  vec3 col = mix(vec3(0.10, 0.07, 0.05), vec3(0.85, 0.52, 0.18), smoothstep(0.25, 0.8, f));
  return mix(col, vec3(1.0, 0.92, 0.78), smoothstep(0.55, 0.95, f * s.y * 1.6));
}

// cover-fit an image of the given aspect to the canvas
vec2 coverUv(vec2 uv, float imageAspect) {
  float canvasAspect = u_res.x / u_res.y;
  vec2 scale = canvasAspect > imageAspect
    ? vec2(1.0, imageAspect / canvasAspect)
    : vec2(canvasAspect / imageAspect, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

vec3 revealLayer(vec2 uv, vec3 s) {
  if (u_hasUnder > 0.5) return texture2D(u_under, coverUv(uv, u_underAspect)).rgb * 0.85;
  return goldSmoke(s);
}

void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);

  vec2 vel = soft(u_velocity, uv).rg - 0.5;  // -0.5..0.5
  // dead zone: 8-bit fading stalls a few steps from neutral grey
  vel = sign(vel) * max(abs(vel) - 0.06, 0.0);
  float speed = length(vel);
  vec2 disp = vel * 0.22;

  // smoke, swirled by the cursor; slight chromatic split where disturbed
  vec2 p = uv * aspect * 1.8;
  vec2 ca = disp * (0.15 + speed);
  vec3 sR = smoke(p - (disp + ca) * aspect * 1.8);
  vec3 sG = smoke(p - disp * aspect * 1.8);
  vec3 sB = smoke(p - (disp - ca) * aspect * 1.8);
  vec3 col = vec3(smokeColor(sR).r, smokeColor(sG).g, smokeColor(sB).b);

  // top image: liquid-warped by the smoke and the cursor, under a smoke veil
  if (u_hasTop > 0.5) {
    // starts identical to the revealed image right after a swap, then settles
    // into a gentle liquid drift with a light smoky haze
    vec2 base = uv + ((sG.yz - 0.5) * 0.05 * u_settle) + disp * 0.6;
    vec2 cat = ca * 0.5;
    vec3 img = vec3(texture2D(u_top, coverUv(base + cat, u_topAspect)).r,
                    texture2D(u_top, coverUv(base, u_topAspect)).g,
                    texture2D(u_top, coverUv(base - cat, u_topAspect)).b) * 0.85;
    float veil = (0.08 + 0.17 * smoothstep(0.4, 0.95, sG.x)) * u_settle;
    col = mix(img, col, veil);
  }

  // scrub mask with smoky, drifting edges
  float m = soft(u_reveal, uv).r;
  float edgeNoise = fbm(uv * aspect * 5.0 + vec2(u_time * 0.08, -u_time * 0.05));
  float reveal = smoothstep(0.28, 0.62, m + (edgeNoise - 0.5) * 0.45 * smoothstep(0.0, 0.2, m));

  // full dissolve / refill with an organic, noisy front
  float front = fbm(uv * aspect * 2.5 + vec2(7.0, 3.0) + u_time * 0.03);
  float dissolve = smoothstep(front - 0.12, front + 0.12, u_clear * 1.4 - 0.2);
  reveal = max(reveal, dissolve);

  vec3 under = revealLayer(uv + disp * 0.5, sG);
  col = mix(col, under, reveal);
  // faint glowing rim, in the palette's highlight colour, where smoke burns away
  float rim = reveal * (1.0 - reveal) * 4.0;
  col += u_hi * rim * 0.2;

  // vignette + darken so overlaid text stays readable
  float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * aspect));
  col *= mix(0.35, 0.85, vig);

  // film grain
  col += (hash(uv * u_res + fract(u_time) * 100.0) - 0.5) * 0.04;

  gl_FragColor = vec4(col, 1.0);
}
`

// Smoke colourways, used in turn after each full reveal: ink, mid, highlight, accent.
const PALETTES: number[][][] = [
  [[0.035, 0.035, 0.045], [0.60, 0.10, 0.22], [0.92, 0.55, 0.66], [0.05, 0.27, 0.31]], // crimson
  [[0.02, 0.03, 0.05], [0.08, 0.25, 0.55], [0.55, 0.85, 0.95], [0.30, 0.10, 0.45]],     // ocean
  [[0.04, 0.03, 0.02], [0.65, 0.28, 0.06], [1.0, 0.80, 0.45], [0.35, 0.05, 0.10]],      // ember
  [[0.02, 0.04, 0.035], [0.05, 0.42, 0.32], [0.70, 0.95, 0.75], [0.10, 0.18, 0.40]],    // jade
  [[0.03, 0.02, 0.05], [0.38, 0.12, 0.60], [0.90, 0.65, 0.98], [0.55, 0.10, 0.30]],     // violet
]

const TRAIL_SIZE = 256
const VELOCITY_FADE = 0.035   // per frame; lower = longer swirl
const FOLLOW = 0.16           // brush easing toward the pointer (0..1)
const SCRUB_TARGET = 0.8      // fraction scrubbed that triggers the full reveal
const COVERAGE_MARGIN = 0.06  // border (fraction of each side) not counted toward it
const CLEAR_MS = 1400         // remaining smoke dissolving away
const SETTLE_MS = 1500        // new top image easing into its liquid drift
const HOLD_MS = 3500          // single-image mode: image fully shown
const REFILL_MS = 2200        // single-image mode: smoke rolling back in
const MAX_IMAGE_SIDE = 2048   // images are downscaled to this to save GPU memory

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

const makeTexture = (gl: WebGLRenderingContext, unit: number) => {
  const tex = gl.createTexture()!
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return tex
}

const makeTrail = (fill: string, willReadFrequently = false) => {
  const canvas = document.createElement('canvas')
  canvas.width = TRAIL_SIZE
  canvas.height = TRAIL_SIZE
  const ctx = canvas.getContext('2d', { willReadFrequently })!
  ctx.fillStyle = fill
  ctx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE)
  return { canvas, ctx }
}

const easeInOut = (t: number) => {
  const x = Math.min(Math.max(t, 0), 1)
  return x * x * (3 - 2 * x)
}

type Phase = 'scrub' | 'clearing' | 'hold' | 'refill'

type LiquidBannerProps = {
  className?: string
  /**
   * Images in display order. The first is shown under the smoke veil and
   * scrubbing reveals the second; each full reveal advances by one.
   * Falls back to a procedural layer when empty.
   */
  images?: string[]
}

// Phones and tablets (no hover, or a narrow screen) get a static first image:
// the WebGL shader is too heavy for them.
const STATIC_QUERY = '(max-width: 767px), (hover: none)'

const LiquidBanner = ({ className = '', images = [] }: LiquidBannerProps) => {
  const imagesKey = images.join('|')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // decided on the client only, so server and first client render match
  const [mode, setMode] = useState<'pending' | 'static' | 'webgl'>('pending')

  useEffect(() => {
    const mq = window.matchMedia(STATIC_QUERY)
    const update = () => setMode(mq.matches ? 'static' : 'webgl')
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (mode !== 'webgl') return
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // --- program ---
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return
    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uni = (name: string) => gl.getUniformLocation(program, name)
    const uTime = uni('u_time')
    const uRes = uni('u_res')
    const uClear = uni('u_clear')
    const uSettle = uni('u_settle')
    const uHasTop = uni('u_hasTop')
    const uTopAspect = uni('u_topAspect')
    const uHasUnder = uni('u_hasUnder')
    const uUnderAspect = uni('u_underAspect')
    gl.uniform1i(uni('u_velocity'), 0)
    gl.uniform1i(uni('u_reveal'), 1)
    gl.uniform1i(uni('u_top'), 2)
    gl.uniform1i(uni('u_under'), 3)
    gl.uniform1f(uHasTop, 0)
    gl.uniform1f(uHasUnder, 0)
    gl.uniform1f(uClear, 0)

    let paletteIndex = 0
    const applyPalette = (index: number) => {
      const [ink, mid, hi, acc] = PALETTES[index % PALETTES.length]
      gl.uniform3fv(uni('u_ink'), ink)
      gl.uniform3fv(uni('u_mid'), mid)
      gl.uniform3fv(uni('u_hi'), hi)
      gl.uniform3fv(uni('u_acc'), acc)
    }
    applyPalette(paletteIndex)

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)

    // --- trails ---
    const velocity = makeTrail('rgb(128,128,128)')
    const reveal = makeTrail('rgb(0,0,0)', true)
    const velocityTex = makeTexture(gl, 0)
    const revealTex = makeTexture(gl, 1)

    // 1x1 placeholder on units 2 and 3 until images load
    const placeholderTex = makeTexture(gl, 2)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))
    gl.activeTexture(gl.TEXTURE3)
    gl.bindTexture(gl.TEXTURE_2D, placeholderTex)

    // --- background images (one texture each, used in list order) ---
    // With 2+ images, images[top] sits under the smoke veil and images[under]
    // (the next one) is revealed by scrubbing. With 1 image, plain smoke is on
    // top and the image is revealed.
    const srcs = imagesKey ? imagesKey.split('|') : []
    const loaded: ({ tex: WebGLTexture, aspect: number } | undefined)[] = srcs.map(() => undefined)
    const layered = srcs.length > 1
    let top = 0
    let under = layered ? 1 : 0

    const bind = (unit: number, index: number, hasLoc: WebGLUniformLocation | null, aspectLoc: WebGLUniformLocation | null) => {
      const entry = loaded[index]
      if (!entry) { gl.uniform1f(hasLoc, 0); return }
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, entry.tex)
      gl.uniform1f(aspectLoc, entry.aspect)
      gl.uniform1f(hasLoc, 1)
    }
    const bindLayers = () => {
      if (layered) bind(2, top, uHasTop, uTopAspect)
      if (srcs.length) bind(3, under, uHasUnder, uUnderAspect)
    }

    let disposed = false
    srcs.forEach((src, index) => {
      const img = new Image()
      // cross-origin images must be CORS-enabled to be used as WebGL textures
      img.crossOrigin = 'anonymous'
      img.decoding = 'async'
      img.onload = () => {
        if (disposed) return
        // downscale large photos before upload
        const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(img.naturalWidth, img.naturalHeight))
        let source: TexImageSource = img
        if (scale < 1) {
          const c = document.createElement('canvas')
          c.width = Math.round(img.naturalWidth * scale)
          c.height = Math.round(img.naturalHeight * scale)
          c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
          source = c
        }
        const tex = makeTexture(gl, 4)   // scratch unit, so units 2/3 stay as bound
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
        loaded[index] = { tex, aspect: img.naturalWidth / img.naturalHeight }
        bindLayers()
      }
      img.onerror = () => console.warn(`LiquidBanner: could not load ${src}`)
      img.src = src
    })

    // --- sizing ---
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const { clientWidth: w, clientHeight: h } = canvas
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // --- pointer → eased brush ---
    let target: { x: number, y: number } | null = null   // normalised pointer, 0..1
    let brush: { x: number, y: number } | null = null    // eased position
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1
      target = inside ? { x, y } : null
      if (inside && !brush) brush = { x, y }
    }
    const onLeave = () => { target = null }
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    // Trails are square but the banner usually isn't: squash blobs vertically
    // by the canvas aspect so they look round on screen.
    const blob = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, alpha: number) => {
      const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight)
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(1, aspect)
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
      grad.addColorStop(0, `rgba(${color},${alpha})`)
      grad.addColorStop(1, `rgba(${color},0)`)
      ctx.fillStyle = grad
      ctx.fillRect(-radius, -radius, radius * 2, radius * 2)
      ctx.restore()
    }

    // --- scratch-card state ---
    let phase: Phase = 'scrub'
    let phaseStart = 0
    let settleStart = -Infinity   // when the current top image was swapped in
    let frameCount = 0

    // Fraction of the banner scrubbed (sampled on every other pixel). A thin
    // border is ignored: the brush is centred on the pointer, so the very
    // edges are hard to reach and would make the target feel unreachable.
    const measureCoverage = () => {
      const { data } = reveal.ctx.getImageData(0, 0, TRAIL_SIZE, TRAIL_SIZE)
      const margin = Math.round(TRAIL_SIZE * COVERAGE_MARGIN)
      let hit = 0
      let total = 0
      for (let y = margin; y < TRAIL_SIZE - margin; y += 2) {
        for (let x = margin; x < TRAIL_SIZE - margin; x += 2) {
          total++
          if (data[(y * TRAIL_SIZE + x) * 4] > 115) hit++   // ~ where the shader shows the image
        }
      }
      return hit / total
    }

    // Move the brush toward the pointer and paint along the path it travelled.
    const paint = () => {
      if (!brush) return
      if (!target) { brush = null; return }
      const prev = { ...brush }
      brush.x += (target.x - brush.x) * FOLLOW
      brush.y += (target.y - brush.y) * FOLLOW
      const dx = brush.x - prev.x
      const dy = brush.y - prev.y
      const dist = Math.hypot(dx, dy)
      if (dist < 0.0005) return

      const speed = Math.min(dist * 30, 1)
      const r = Math.round(128 + (dx / dist) * 110 * speed)
      const g = Math.round(128 - (dy / dist) * 110 * speed)   // texture v is flipped
      const vRadius = TRAIL_SIZE * 0.1
      const rRadius = TRAIL_SIZE * 0.11
      const step = rRadius * 0.2
      const steps = Math.max(1, Math.ceil((dist * TRAIL_SIZE) / step))
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        const px = (prev.x + dx * t) * TRAIL_SIZE
        const py = (prev.y + dy * t) * TRAIL_SIZE
        blob(velocity.ctx, px, py, vRadius, `${r},${g},128`, 0.25)
        // only scrub while the smoke is in place
        if (phase === 'scrub') blob(reveal.ctx, px, py, rRadius, '255,255,255', 0.16 + speed * 0.12)
      }
    }

    const updatePhase = (now: number) => {
      const elapsed = now - phaseStart
      gl.uniform1f(uSettle, easeInOut((now - settleStart) / SETTLE_MS))
      switch (phase) {
        case 'scrub':
          if (++frameCount % 12 === 0 && measureCoverage() >= SCRUB_TARGET) {
            phase = 'clearing'
            phaseStart = now
          }
          gl.uniform1f(uClear, 0)
          break
        case 'clearing':
          gl.uniform1f(uClear, easeInOut(elapsed / CLEAR_MS))
          if (elapsed >= CLEAR_MS) {
            if (layered) {
              // No smoke screen in between: the revealed image becomes the top
              // layer right away, the following image goes underneath, and the
              // scrub starts over with a fresh mask and smoke colour.
              reveal.ctx.fillStyle = 'rgb(0,0,0)'
              reveal.ctx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE)
              top = under
              under = (top + 1) % srcs.length
              bindLayers()
              paletteIndex++
              applyPalette(paletteIndex)
              gl.uniform1f(uClear, 0)
              settleStart = now
              phase = 'scrub'
            } else {
              // single image / no images: show it, then smoke rolls back in
              phase = 'hold'
            }
            phaseStart = now
          }
          break
        case 'hold':
          gl.uniform1f(uClear, 1)
          if (elapsed >= HOLD_MS) {
            // wipe the scrub mask and bring the smoke back in a new colour
            reveal.ctx.fillStyle = 'rgb(0,0,0)'
            reveal.ctx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE)
            paletteIndex++
            applyPalette(paletteIndex)
            phase = 'refill'
            phaseStart = now
          }
          break
        case 'refill':
          gl.uniform1f(uClear, 1 - easeInOut(elapsed / REFILL_MS))
          if (elapsed >= REFILL_MS) {
            phase = 'scrub'
            phaseStart = now
          }
          break
      }
    }

    // --- render loop, paused when off screen ---
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(canvas)

    let raf = 0
    const start = performance.now()
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return

      velocity.ctx.fillStyle = `rgba(128,128,128,${VELOCITY_FADE})`
      velocity.ctx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE)
      paint()
      updatePhase(now)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, velocityTex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, velocity.canvas)
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, revealTex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, reveal.canvas)

      gl.uniform1f(uTime, reduceMotion ? 0 : (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('pointerleave', onLeave)
      gl.deleteTexture(velocityTex)
      gl.deleteTexture(revealTex)
      gl.deleteTexture(placeholderTex)
      loaded.forEach((entry) => entry && gl.deleteTexture(entry.tex))
      gl.deleteBuffer(buf)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [imagesKey, mode])

  if (mode !== 'webgl') {
    const first = images[0]
    return (
      <div aria-hidden="true" className={`block w-full h-full overflow-hidden bg-black ${className}`}>
        {mode === 'static' && first && (
          // eslint-disable-next-line @next/next/no-img-element -- URL may be on any host
          <img src={first} alt="" decoding="async" className="h-full w-full object-cover brightness-[0.7]" />
        )}
        {/* vignette, matching the shader's darkening so the hero text stays readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block w-full h-full bg-black ${className}`}
    />
  )
}

export default LiquidBanner
