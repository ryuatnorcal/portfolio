const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
    
        <div
          className="col-span-1 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
        <div className="text-center mt-5 tracking-wider text-xl">
          <div>
          Loading...
          </div>
          <div>しばらくお待ちください。</div>
        </div>
    </div>  
  )
}

export default Loading