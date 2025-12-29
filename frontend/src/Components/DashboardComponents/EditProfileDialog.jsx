import React, { useEffect, useState } from 'react'
import { Button } from ".././ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ".././ui/dialog"
import { Edit } from 'lucide-react'
import unknownuser from "../../assets/unknown user.jpg"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { SetUser } from '@/Redux/AuthSlice'


const EditProfileDialog = () => {
  const user = useSelector((state) => state.Auth.user)
  const [imagePreview, setImagePreview] = useState(null)
  const [input, setInput] = useState({})
  const [loading, Setloading] = useState(false)
  const dispatch = useDispatch()



  useEffect(() => {
    if (user) {
      setInput({
        username: user.username || "",
        phoneNumber: user.phoneNumber || "",
        phonesuffix: user.phonesuffix,
        profilepic: user.profilepic || unknownuser
      })
      setImagePreview(user.profilePic || null)
    }
  }, [user])
  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === "profilepic") {
      const file = files[0]
      setInput((prev) => ({ ...prev, profilepic: file }))
      if (file) setImagePreview(URL.createObjectURL(file))
    } else {
      setInput((prev) => ({ ...prev, [name]: value }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    let formdata = new FormData()
    formdata.append("username", input.username)
    formdata.append("phoneNumber", input.phoneNumber)
    formdata.append("phonesuffix", input.phonesuffix)
    if (input.profilepic) formdata.append("profilepic", input.profilepic)
    try {
      Setloading(true)
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/update-profile`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }, withCredentials: true
      })
      if (response.data) {
        toast.success(response.data.message)
        dispatch(SetUser(response.data.data))
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
      console.log("failed to update profile", error)
    } finally {
      setTimeout(() => {
        Setloading(false)
      }, 1000);
    }
  }
  return (
    <Dialog>
        <DialogTrigger asChild>
          <span className='flex gap-2 cursor-pointer  text-sm text-[#5E23DC]'>
            <Edit className='w-5 h-5' />
            <span>Edit profile</span>
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] ">
          <DialogHeader className="p-4">
            <DialogTitle>Edit Your Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
             <div className="w-full flex p-4 flex-col md:flex-row gap-8">
            <div className='flex flex-col items-center gap-2'>
              {/* image */}
              {imagePreview ? (
                <>
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Profile image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              ) : (
                  <>
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden border">
                    <img
                      src={user?.profilepic || unknownuser}
                      alt="Profile image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
                
              )}
              <label htmlFor="Selectimage" className='border cursor-pointer text-[0.7rem] text-gray-500 rounded-md p-2'>Change image</label>
              <input id='Selectimage' name="profilepic" onChange={handleInputChange} accept="image/*" type="file" className='hidden' />
            </div>
            <div className='flex flex-col w-full gap-2'>
              {/* name */}
              <div className="flex flex-col py-1 gap-1">
                <span className="text-[#909098] font-[400] text-[0.7rem]">
                  Name
                </span>
                <input
                  type="text"
                  value={input.username}
                  name="username"
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-lg font-medium text-[#333]"
                />
              </div>
              {/* Phone number */}
              <div className="flex flex-col py-1 gap-1">
                <span className="text-[#909098] font-[400] text-[0.7rem]">
                  Phone Number
                </span>
                <div className='flex gap-2 flex-col md:flex-row'>
                  {/* suffix */}
                  <input  maxLength={4}
           pattern="^\+\d{1,3}$" value={input.phonesuffix} name="phonesuffix" onChange={handleInputChange} type="text"

                    className="w-full sm:w-[20%] bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-lg font-medium text-[#333] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none " />
                  <input
                    type="number"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-lg font-medium text-[#333] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

                  />
                </div>

              </div>
              {/* phone number */}
            </div>
          </div>
           <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {loading ? "please wait..." : "Save changes"}
            </Button>
          </DialogFooter>
          </form>
           </DialogContent>
    </Dialog>
  )
}

export default EditProfileDialog




