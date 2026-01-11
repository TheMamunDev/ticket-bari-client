const ReviewSkeleton = () => {
  return (
    <section className="bg-base-200 mt-4 py-24 px-4 overflow-hidden min-h-[700px] flex flex-col justify-center items-center font-sans">
      <div className="relative w-full max-w-4xl h-[350px] flex items-center justify-center mb-8">
        <div className="hidden md:flex absolute transition-all duration-500 transform -translate-x-[75%] -rotate-6 scale-90 z-10 w-[400px] h-[280px] rounded-2xl p-6 shadow-2xl bg-gray-300/50 animate-pulse flex-col justify-between">
          <div className="h-4 w-24 bg-gray-300 rounded" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-300 rounded" />
            <div className="h-3 w-2/3 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <div className="h-3 w-20 bg-gray-300 rounded" />
          </div>
        </div>

        <div className="hidden md:flex absolute transition-all duration-500 transform translate-x-[75%] rotate-6 scale-90 z-10 w-[400px] h-[280px] rounded-2xl p-6 shadow-2xl bg-gray-300/50 animate-pulse flex-col justify-between items-end text-right">
          <div className="h-4 w-24 bg-gray-300 rounded" />
          <div className="space-y-2 w-full">
            <div className="h-3 w-full bg-gray-300 rounded" />
            <div className="h-3 w-2/3 bg-gray-300 ml-auto rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-20 bg-gray-300 rounded" />
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </div>

        <div className="absolute transition-all duration-500 transform z-30 w-[320px] md:w-[450px] h-[370px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between border-t-8 border-gray-200 animate-pulse">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="h-6 w-32 md:h-8 md:w-40 bg-gray-200 rounded" />
              <div className="h-6 w-20 bg-gray-100 rounded-full" />
            </div>

            <div className="h-6 w-48 bg-gray-200 rounded" />

            <div className="grid grid-cols-3 gap-3">
              <div className="h-10 bg-gray-50 border border-gray-100 rounded-xl" />
              <div className="h-10 bg-gray-50 border border-gray-100 rounded-xl" />
              <div className="h-10 bg-gray-50 border border-gray-100 rounded-xl" />
            </div>

            <div className="space-y-2 py-2">
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
            </div>
          </div>

          <div className="flex items-center gap-3 border-t pt-3 border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-2 w-16 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 max-w-2xl mx-auto px-4 space-y-3">
        <div className="h-8 w-64 bg-gray-300 rounded mx-auto animate-pulse" />
        <div className="h-4 w-full md:w-96 bg-gray-200 rounded mx-auto animate-pulse" />
        <div className="h-4 w-5/6 md:w-80 bg-gray-200 rounded mx-auto animate-pulse" />
      </div>
    </section>
  );
};

export default ReviewSkeleton;
