import React from "react";

const ShimmerBlock = ({ className = "" }) => {
  return (
    <div className={`bg-gray-200 rounded-md animate-pulse ${className}`} />
  );
};

export default ShimmerBlock;
