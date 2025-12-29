import React from 'react'

const ActiveBadge = () => {
  return (
       <div className="flex items-center gap-2">
      {/* Green circle with check */}
      <div className="w-4 h-4 rounded-full border-2 border-[#20D189] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-[#20D189]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* ACTIVE Text */}
      <span className="text-[#20D189] font-semibold text-[0.8rem] tracking-wide">
        ACTIVE
      </span>
    </div>
  )
}

export default ActiveBadge