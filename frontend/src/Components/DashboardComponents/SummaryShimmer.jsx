const SummaryShimmer = () => {
  return (
    <div className="bg-white p-5 rounded-md animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded"></div>

      <div className="flex mt-3 flex-col justify-between sm:items-center md:flex-row gap-3">
        
        {/* LEFT SIDE */}
        <div className="flex gap-2">
          
          {/* Image skeleton */}
          <div className="w-[126px] h-[90px] bg-gray-200 rounded-md"></div>
          
          {/* Text skeleton */}
          <div className="flex ml-2 flex-col gap-2 mt-1">
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="mt-3 sm:mt-0">
          <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
        </div>

      </div>
    </div>
  );
};

export default SummaryShimmer;
