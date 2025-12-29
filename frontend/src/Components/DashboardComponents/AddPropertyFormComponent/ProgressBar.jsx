import { Progress } from '../../ui/progress'
import React, { useState } from 'react'

const ProgressBar = ({progress}) => {
  return (
    <div className='flex mt-4 items-center gap-4'>
      <Progress
        value={progress}
        className="w-full bg-[#EBEBF0] [&>*]:bg-[#FCD26E]"
      />
      <span className='text-[0.7rem] text-[#767676]'>{progress}%</span>
    </div>
  )
}

export default ProgressBar