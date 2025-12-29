const EnquiryCardShimmer = () => {
  return (
    <div className="bg-white px-4 py-6 rounded-md gap-3 flex flex-col animate-pulse">
      
      {/* Top Row */}
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          {/* Image shimmer */}
          <div className="w-10 h-10 rounded-md bg-gray-200"></div>

          {/* Name shimmer */}
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>

        {/* Date shimmer */}
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col gap-3 sm:flex-row justify-between">
        <div className="flex flex-col gap-2">
          {/* Requirement shimmer */}
          <div className="h-3 w-40 bg-gray-200 rounded"></div>

          {/* Address shimmer */}
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Phone shimmer */}
        <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
      </div>

    </div>
  );
};

export default EnquiryCardShimmer