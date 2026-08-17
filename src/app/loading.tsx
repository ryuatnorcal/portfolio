const Loading = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-bg text-fg">
    
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-accent motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
