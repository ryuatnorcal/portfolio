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

        <div
          className="inline-block h-8 w-8 animate-spin border-4 border-solid border-current border-e-transparent align-[-0.125em] text-fg motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
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
