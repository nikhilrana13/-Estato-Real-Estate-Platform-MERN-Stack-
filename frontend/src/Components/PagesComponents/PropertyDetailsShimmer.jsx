import ShimmerBlock from "./ShimmerBlock";

const PropertyDetailsShimmer = () => {
  return (
    <section className="w-full">
      <div className="flex w-full px-[2rem] lg:px-[7rem] xl:px-[12rem] py-5 flex-col bg-white gap-6">
        
        {/* Breadcrumb shimmer */}
        <div className="flex gap-3">
          <ShimmerBlock className="h-3 w-20" />
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-3 w-28" />
        </div>

        {/* Title row */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <ShimmerBlock className="h-6 w-64" />
            <ShimmerBlock className="h-4 w-48" />
            <ShimmerBlock className="h-4 w-72" />
          </div>
          <ShimmerBlock className="h-10 w-32 rounded-md" />
        </div>

        {/* Image gallery */}
        <ShimmerBlock className="h-[320px] w-full rounded-lg" />

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 items-center">
              <ShimmerBlock className="h-5 w-20" />
              <ShimmerBlock className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs shimmer */}
      <div className="w-full bg-white border-t py-4 flex justify-center gap-6">
        <ShimmerBlock className="h-4 w-20" />
        <ShimmerBlock className="h-4 w-24" />
        <ShimmerBlock className="h-4 w-24" />
      </div>

      {/* Content shimmer */}
      <div className="bg-[#F4F4F4] px-[2rem] lg:px-[7rem] xl:px-[12rem] py-6 flex gap-4">
        <div className="w-[70%] bg-white p-5 rounded-md flex flex-col gap-4">
          <ShimmerBlock className="h-5 w-48" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-[90%]" />
          <ShimmerBlock className="h-4 w-[80%]" />
        </div>

        <div className="w-[30%] bg-white p-5 rounded-md flex flex-col gap-4">
          <ShimmerBlock className="h-6 w-40" />
          <ShimmerBlock className="h-10 w-full rounded-md" />
          <ShimmerBlock className="h-10 w-full rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsShimmer