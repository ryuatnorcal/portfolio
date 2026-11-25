'use client'
import { useEffect, useRef } from "react"

/**
 * Full-bleed WebGL background: a procedural liquid/ink texture that ripples
 * and smears around the cursor (or touch), inspired by liquid-displacement
 * hero banners. No external dependencies.
 *
 * How it works:
 *  - A small offscreen 2D canvas stores a "velocity trail": every pointer move
 *    stamps a soft blob whose R/G channels encode the movement direction.
 *    Each frame the trail fades back to neutral grey (0.5, 0.5).
 *  - The trail is uploaded as a texture and used to displace the UVs of a
 *    domain-warped fbm noise field, with a per-channel offset for a subtle
 *    chromatic-aberration fringe, plus film grain and a vignette.
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
uniform sampler2D u_trail;
uniform float u_time;
uniform vec2 u_res;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

// Liquid ink field: returns a colour for a given point.
vec3 liquid(vec2 p) {
  float t = u_time * 0.04;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 1.5),
                fbm(p + 3.5 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 3.0 * r);

  vec3 ink    = vec3(0.035, 0.035, 0.045);  // near black
  vec3 crimson = vec3(0.62, 0.10, 0.22);
  vec3 rose   = vec3(0.95, 0.55, 0.68);
  vec3 teal   = vec3(0.05, 0.28, 0.32);

  vec3 col = mix(ink, crimson, smoothstep(0.35, 0.85, f));
  col = mix(col, teal, smoothstep(0.4, 1.0, length(q)) * 0.55);
  col = mix(col, rose, smoothstep(0.72, 0.95, f * r.x * 1.6));
  // glossy highlights on ridges
  col += vec3(0.9) * pow(smoothstep(0.6, 0.9, r.y * f * 1.5), 6.0) * 0.35;
  return col;
}

void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);

  vec2 vel = texture2D(u_trail, uv).rg - 0.5;   // -0.5..0.5
  float strength = length(vel);
  vec2 disp = vel * 0.35;

  vec2 p = uv * aspect * 2.2;
  // chromatic split proportional to local disturbance
  vec2 ca = disp * (0.25 + strength * 2.0);
  vec3 col;
  col.r = liquid(p - (disp + ca) * aspect * 2.2).r;
  col.g = liquid(p - disp * aspect * 2.2).g;
  col.b = liquid(p - (disp - ca) * aspect * 2.2).b;

  // vignette + darken so overlaid text stays readable
  float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * aspect));
  col *= mix(0.35, 0.85, vig);

  // film grain
  col += (hash(uv * u_res + fract(u_time) * 100.0) - 0.5) * 0.06;

  gl_FragColor = vec4(col, 1.0);
}
`

const TRAIL_SIZE = 128

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

type LiquidBannerProps = {
  className?: string
}

const LiquidBanner = ({ className = '' }: LiquidBannerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_res')

    // --- trail (displacement) canvas ---
    const trail = document.createElement('canvas')
    trail.width = TRAIL_SIZE
    trail.height = TRAIL_SIZE
    const tctx = trail.getContext('2d')!
    tctx.fillStyle = 'rgb(128,128,128)'
    tctx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE)

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

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

    // --- pointer ---
    let last: { x: number, y: number } | null = null
    const stamp = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width
      const y = (clientY - rect.top) / rect.height
      if (x < 0 || x > 1 || y < 0 || y > 1) { last = null; return }
      if (last) {
        const dx = x - last.x
        const dy = y - last.y
        const speed = Math.min(Math.hypot(dx, dy) * 18, 1)
        const len = Math.hypot(dx, dy) || 1
        // encode direction into R/G (screen y is flipped vs. texture v)
        const r = Math.round(128 + (dx / len) * 127 * speed)
        const g = Math.round(128 - (dy / len) * 127 * speed)
        const px = x * TRAIL_SIZE
        const py = y * TRAIL_SIZE
        const radius = TRAIL_SIZE * 0.12
        const grad = tctx.createRadialGradient(px, py, 0, px, py, radius)
        grad.addColorStop(0, `rgba(${r},${g},128,0.6)`)
        grad.addColorStop(1, `rgba(${r},${g},128,0)`)
        tctx.fillStyle = grad
        tctx.beginPath()
        tctx.arc(px, py, radius, 0, Math.PI * 2)
        tctx.fill()
      }
      last = { x, y }
    }
    const onPointer = (e: PointerEvent) => stamp(e.clientX, e.clientY)
    const onLeave = () => { last = null }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    // --- render loop, paused when off screen ---
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(canvas)

    let raf = 0
    const start = performance.now()
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      // relax trail toward neutral grey
      tctx.fillStyle = 'rgba(128,128,128,0.06)'
      tctx.fillRect(0, 0, TRAIL_SIZE, TRAIL_SIZE)
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, trail)
      gl.uniform1f(uTime, reduceMotion ? 0 : (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerleave', onLeave)
      gl.deleteTexture(tex)
      gl.deleteBuffer(buf)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block w-full h-full bg-black ${className}`}
    />
  )
}

export default LiquidBanner
