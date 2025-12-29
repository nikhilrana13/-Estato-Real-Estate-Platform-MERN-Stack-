const SearchHeaderShimmer = () => {
  return (
    <div className="flex flex-col md:items-center sm:justify-between md:flex-row gap-2 animate-pulse">
      {/* RESULT COUNT SHIMMER (Showing 1-10 of 120 results) */}
      <div className="h-3 bg-gray-200 rounded w-44 sm:w-56" />

      {/* HEADER + SORT ROW */}

      {/* <div className="flex flex-col md:items-center sm:justify-between md:flex-row gap-2">
        <div className="h-4 bg-gray-200 rounded w-[260px] sm:w-[320px]" />

        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-9 bg-gray-200 rounded w-32" />
        </div>

      </div> */}

    </div>
  );
};

export default SearchHeaderShimmer;