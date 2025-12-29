import { LucideImagePlus, PlusCircleIcon } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const AddPropertyPhotos = ({PrevStep}) => {
  const [previewImages, setPreviewImages] = useState([])
  const {watch,setValue} = useFormContext()
  const selectedImages = watch("images") || []
  const propertyType = watch("Propertytype")

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))

    setPreviewImages((prev)=> [...prev,...previews])
    setValue("images",[...selectedImages,...files])
  }
  
 // store latest previews in ref to use in cleanup
  const previewsRef = useRef(previewImages)
   
  //  update ref whenever previewImages state changes
  useEffect(() => {
    previewsRef.current = previewImages
  }, [previewImages])

  const handleDeleteImage = (index) => {
    const removed = previewImages[index]
    if (removed) URL.revokeObjectURL(removed.url) // free browser memory
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  // cleanup object URLs on unmount (use ref to access latest previews)
  useEffect(() => {
    return () => {
      previewsRef.current.forEach((p) => URL.revokeObjectURL(p.url))
    }
  }, [])

  return (
    <div className='w-full'>
          <span onClick={PrevStep} className='font-[500] cursor-pointer items-center flex gap-2'>
                            <MdKeyboardArrowLeft />
                            Add Photos
                </span>
     <div className="flex mt-5 flex-col gap-2">
        
      <label
        htmlFor="imageUpload"
        className="w-full border-2 border-dashed border-purple-400 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition"
      > 
          {
            previewImages.length === 0 && (
            <>
             <LucideImagePlus className="text-purple-500 text-5xl mb-3" />
        <p className="text-gray-600">Drag and drop photos here</p>
        <span className="text-gray-500 my-2">or</span>
        <span className="px-6 py-2 bg-purple-500 text-white rounded-lg">
          Browse Files
        </span>
            </>
            )
          } 
          {
            previewImages.length > 0 && (
               <span className="flex  gap-3 text-[#767676]">
          <PlusCircleIcon /> Add More
        </span>
            )
          }
      </label>

      {/* HIDDEN FILE INPUT */}
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
    </div>

            {/* Previews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {previewImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.url}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded-md opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
    </div>
  )
}

export default AddPropertyPhotos