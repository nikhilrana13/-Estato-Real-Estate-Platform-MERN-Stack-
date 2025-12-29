import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import nouser from "../../assets/unknownuser.webp"

const ContactSellerForm = ({propertyId,userdata,usertype}) => {
  const [errors,setErrors] = useState({})
  const [input,SetInput] = useState({
    propertyId:propertyId,
    name:"",
    email:"",
    phoneNumber:"",
  })
  const [loading,setLoading] = useState(false)
  // console.log("p id",propertyId)
  // console.log("user data",userdata)

    const validate = () => {
    let newErrors = {};

    if (!input.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!input.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(input.phoneNumber)) {
      newErrors.phoneNumber = "Enter valid 10 digit number";
    }
    if(!input.email){
      newErrors.email = "Email is Required"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


    const handleInputChange = (e)=>{
      const {name,value,type,checked} = e.target
      SetInput({...input,[name]:type === "checkbox" ? checked:value})
      // remove error on typing
      setErrors(prev => ({...prev,[name]:""}))
    }


    const onSubmit = async()=>{
       const token = localStorage.getItem("token")
        if (!token) {
        toast.error("Please log in");
        return;
       }
      if(!validate()) return
       const data = {
         propertyId:propertyId,
         name:input.name,
         phonenumber:input.phoneNumber,
         email:input.email
       }
      //  console.log("data",data)
     
       try {
        setLoading(true)
         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/lead/add-lead`,data,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          },withCredentials:true
         })
         if(response.data){
           toast.success(response?.data?.message)
         }
       } catch (error) {
        console.log("failed to send details",error)
      if (error.response?.status === 401) {
      toast.error("Please log in");
    } else {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
       }finally{
           setLoading(false)
       }
    }

  return (
    <div className="w-full bg-white  rounded-xl shadow-sm p-5 flex flex-col gap-4">
      
      {/* Top Alert */}
      <div className="w-full bg-[#FFF7D9] border border-[#F3E2A2] text-[#6A5400] rounded-md px-4 py-3 flex items-center gap-2">
        <span className="text-xl">⚡</span>
        <span className="text-[0.8rem] font-[500]">
          Great choice! Better priced property in this area
        </span>
      </div>
      {/* Contact Seller Header */}
      <h2 className="text-[1.2rem] font-[600]">Contact Seller</h2>

      {/* Seller Card */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-md  flex items-center justify-center text-black font-[600] text-lg">
          <img src={userdata?.profilepic || nouser} alt="user image" />
        </div>
        <div className="flex flex-col">
          <span className="font-[600] text-[0.9rem]">{userdata?.username || "NA"}</span>
          <span className="text-[#666] text-[0.8rem]">{usertype || "NA"}</span>
          <span className="font-[600] text-[0.9rem]">{userdata?.phoneNumber ? userdata.phoneNumber.slice(0,5) + "...." :"NA"}</span>
        </div>
      </div>

      {/* Input Label */}
      <p className="text-[0.85rem] font-[500] mt-2">Please share your contact details we send you seller details on given phone number or via email </p>

      {/* Name Field */}
      <div className="flex flex-col w-full">
        <label className="text-[0.8rem] text-[#6A5ACD]">Name</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          className="w-full border-b border-[#A393F5] outline-none py-1 focus:border-[#5E40E0]" />
          {errors.name && (
          <p className="text-red-500 text-[0.75rem]">{errors.name}</p>
        )}
      </div>
      {/* Phone Input */}
      <div className="flex flex-col w-full mt-2">
        <div className="flex items-center gap-3">
          <select  name="phonesuffix" className="border-b py-1 text-[0.9rem]">
            <option value="+91">+91</option>
          </select>
          <input
            type="text"
            placeholder="Phone"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={handleInputChange}
            className="w-full outline-none py-1 border-b text-[0.9rem]  border-[#A393F5]"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-[0.75rem]">
            {errors.phoneNumber}
          </p>
        )}
      </div>
      {/* Email */}
      <input
        type="email"
        name="email"
        value={input.email}
        onChange={handleInputChange}
        placeholder="Email" 
        className="border-b py-2 outline-none text-[0.9rem]"
      />
       {errors.email && (
          <p className="text-red-500 text-[0.75rem]">
            {errors.email}
          </p>
        )}

      {/* Checkboxes */}
      <div className="flex items-start gap-2 mt-2">
        <input type="checkbox" className="mt-1" />
        <p className="text-[0.8rem] text-[#444]">
          I agree to be contacted by Housing and agents via{" "}
          <span className="text-green-500 inline-flex items-center gap-[3px] font-[600]">
            <FaWhatsapp /> WhatsApp, SMS, phone, email etc
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" />
        <p className="text-[0.8rem] text-[#444]">I am interested in Home Loans</p>
      </div>

      {/* Submit Button */}
      <button onClick={()=> onSubmit()} className="w-full bg-[#5E23DC] disabled:opacity-50 text-white py-3 rounded-md font-[600] mt-2">
       {
        loading ? <Loader2 className="mx-auto w-5 h-5 animate-spin text-white" /> : "  Get Contact Details"
       }
      </button>
    </div>
  );
};

export default ContactSellerForm;
