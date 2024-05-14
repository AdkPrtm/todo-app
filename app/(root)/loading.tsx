function LoadingIndicator() {
  return (
    <div className="col-span-6 lg:col-span-5 max-lg:h-[calc(100vh-24px)] overflow-hidden">
      <div className="flex flex-col items-center justify-center col-span-1 bg-[#f3f6f4] dark:bg-[#212121] p-10 h-full rounded-3xl border-2 border-[#f9f9f914]">
        <svg className="animate-spin -ml-1 mr-3 size-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div >
  )
}

export default LoadingIndicator