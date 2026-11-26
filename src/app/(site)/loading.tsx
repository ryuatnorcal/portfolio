'use client'
import { useContent } from "@/hooks/useContent"

const Loading = () => {
  const { hasError } = useContent()

  if (hasError) {
    return (
      <div className="w-screen h-screen flex justify-center items-center flex-col" role="alert">
        <div className="text-center tracking-wider text-xl">
          <div>Sorry, the content couldn&apos;t be loaded.</div>
          <div>コンテンツを読み込めませんでした。</div>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 rounded-md border border-current hover:bg-white hover:text-black transition-colors duration-300"
        >
          Retry / 再読み込み
        </button>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">

        {/* three square dots that light up in turn */}
        <div className="flex gap-2" role="status">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden
              className="loading-dot block h-3 w-3 bg-fg"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
          <span className="sr-only">Loading...</span>
        </div>
        <div className="mt-5 text-center font-mono text-sm tracking-wide text-fg-muted">
          <div>
          Loading...
          </div>
          <div>しばらくお待ちください。</div>
        </div>
    </div>
  )
}

export default Loading
