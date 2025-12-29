import React, { useEffect,useState,useRef } from 'react'
import { useFormContext } from 'react-hook-form'

const BuiltUpArea = ({PropertyType}) => {
const [unit, setUnit] = useState('sq.ft')
const [open, setOpen] = useState(false)
const dropdownRef = useRef(null)
 const { register, setValue,  } = useFormContext()

 // dynamic key 
  const areaKey = `${PropertyType}.plotArea`
  const unitKey = `${PropertyType}.plotAreaUnit`

useEffect(() => {
function onDoc(e) {
if (!dropdownRef.current) return
if (!dropdownRef.current.contains(e.target)) setOpen(false)
}
document.addEventListener('mousedown', onDoc)
return () => document.removeEventListener('mousedown', onDoc)
}, [])


 const units = ["sq.ft", "sq.yd", "sq.mt"]
  return (
     <div className="w-full  max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Built Up Area input */}
        <div className='mt-5'> 
          <label className="block text-[#B9B6BD] text-[0.7rem] font-medium mb-2">Built Up Area</label>

          <div className="relative">
            <input
              type="number"              
              {...register(areaKey,)}
              placeholder=""
              className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]"
            />
          </div>
        </div>

        {/* Right: Area Unit select (custom) */}
        <div className="relative mt-5" ref={dropdownRef}>
          <div className="text-[0.7rem] text-[#B9B6BD] mb-2">Select Area Unit</div>
           <input type="hidden" {...register(unitKey)} />
          <button
            type='button'
            onClick={() => setOpen((s) => !s)}
            className="w-full flex items-center justify-between border-b-2 border-transparent focus:outline-none py-2"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <div className="w-full">
              <div className="px-0 py-2 rounded-md text-left">
                <span className="inline-block px-4 py-2 text-sm font-semibold bg-white rounded-t-sm">{unit}</span>
              </div>
            </div>

            <svg className={`w-5 h-5 ml-3 transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* dropdown panel */}
          {open && (
            <div className="absolute right-0 left-0 mt-2 z-20">
              <div className="max-h-48 overflow-y-auto shadow-lg rounded-md border border-transparent scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white">
                <ul className="bg-white rounded-md">
                  {units.map((u) => (
                    <li
                      key={u}
                      onClick={() => {
                        setUnit(u)
                        setValue(unitKey,u)
                        setOpen(false)
                      }}
                      className={`px-4 py-3 cursor-pointer text-sm font-medium select-none transition-colors duration-150
                        ${u === unit ? 'bg-purple-600 text-white' : 'text-[#9b9b9b] hover:bg-[#f6f4ff] hover:text-purple-700'}
                      `}
                    >
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
           
   )
 }

 export default BuiltUpArea



