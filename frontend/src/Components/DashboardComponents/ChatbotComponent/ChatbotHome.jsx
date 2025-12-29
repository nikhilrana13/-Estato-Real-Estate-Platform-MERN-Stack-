import React, { useEffect, useRef, useState } from 'react'
import logo from "../../../assets/2logo.jpg"
import { IoIosCloseCircle } from 'react-icons/io'
import { useSelector } from 'react-redux'
import ailogo from "../../../assets/Graident Ai Robot.webp"
import { Send } from 'lucide-react'
import { IoSend } from 'react-icons/io5'
import { FaAngleLeft } from 'react-icons/fa'
import axios from 'axios'


const ChatbotHome = ({ open, setOpen }) => {
    const [step, setStep] = useState(1)
    const user = useSelector((state) => state.Auth.user)
    const [messages,setMessages] = useState([])
    const [sendMessage,setSendMessages] = useState("")
    const [loading,setLoading] = useState(false)
    const [isTyping,setIsTyping] = useState(false)
    const bottomref = useRef()

    // auto scroll on new message
    useEffect(()=>{
        bottomref.current?.scrollIntoView({behaviour:"smooth"})
    },[messages,loading])
    const handleSendMessage = (e)=>{
        const value = e.target.value
        setSendMessages(value)
        if(value.trim().length > 0){
            setIsTyping(true)
        }else{
            setIsTyping(false)
        }
    }

    const handleChatbotResponse = async()=>{
        //  console.log("submit")
        if(!sendMessage.trim()) return 
         setMessages(prev => [...prev, { role: "user", message: sendMessage }])
         setLoading(true)
         setSendMessages("")
         setIsTyping(false)
        try {
             const response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/property/chatsupport`,{
                role:"user",
                message:sendMessage
             },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },withCredentials:true
             }
            )
            console.log("response",response.data)
            const botdata = response.data.data
            if(botdata){
                setMessages((prev)=> [...prev,{ role:botdata?.role,message:botdata?.reply}])
            }
        } catch (error) {
            // console.log("failed to send message",error)
        }finally{
                setLoading(false)
        }
    }
    return (
        <div className={`fixed bottom-24 right-6 bg-white w-[350px] overflow-y-auto h-[420px] rounded-xl flex flex-col shadow-2xl z-[9999] ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-90 translate-y-6 pointer-events-none"} `}>
            {
                step === 1 && (
                    <>
                        <div className='flex flex-col border p-4 bg-[#32075E] gap-2'>
                            <div className='flex items-center justify-between'>
                                <img src={logo} alt="logo" className='w-10 rounded-md h-10' />
                                {/* Close Button */}
                                <button onClick={() => setOpen(false)}>
                                    <IoIosCloseCircle size={28} className="text-white hover:scale-110 transition" />
                                </button>
                            </div>
                            <span className='text-[1.2rem] text-white font-[500]'>
                                Welcome to Estato <br />Support!
                            </span>
                            <span className='text-[0.8rem] text-white font-[400]'>For property Owners</span>
                        </div>
                        {/* body */}
                        <div className='flex flex-col gap-3  p-4'>
                            <span className="flex-1 p-3 text-sm text-gray-600 overflow-y-auto">
                                Hi 👋 {user?.username || "User"}  <br />
                                How can I help you today?
                            </span>
                        </div>
                        {/* Ask a Question */}
                        <div onClick={()=> setStep(2)}  className='mt-10  mx-auto'>
                            <button className="bg-[#5E23DC] font-[600] text-white text-[0.8rem] rounded-md px-8 py-4  flex items-center">
                                Ask a Question ?
                            </button>
                        </div>
                    </>
                )
            }
            {
                step === 2 && (
                    <div className='flex flex-col'>
                        {/* header */}
                      <div className='flex items-center  py-2 px-4 justify-between'>
                        <div className='flex items-center gap-2'>
                            <FaAngleLeft onClick={()=> setStep(1)} className='cursor-pointer' />
                            <img src={ailogo} alt="logo" className='w-10 h-10' />
                            <div className='flex flex-col'>
                                <span className='text-[0.8rem] font-[500]'>EBot</span>
                                <span className='text-[0.8rem] text-[#6C6F74] font-[500]'>The team can also help</span>
                            </div>
                        </div>
                         {/* Close Button */}
                        <button onClick={() => setOpen(false)}>
                                    <IoIosCloseCircle size={28} className="text-black hover:scale-110 transition" />
                        </button>
                      </div>
                      {/* Body where message shows */}
                       <div className='bg-[#F4F5F7] h-[303px] p-3 flex flex-col no-scrollbar overflow-y-auto'>
                         {/* my message */}
                            {messages?.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[70%] mt-2 px-4 py-2 rounded-lg shadow-sm text-sm
                                                 ${msg.role === "user"
                                            ? "bg-white self-end"
                                            : "bg-[#E6E9FF] self-start"}`}
                                >
                                    {msg.message}
                                </div>
                            ))}
                            {loading && (
                                <span className="text-xs text-gray-500 mt-2">EBot is typing...</span>
                            )}
                                 {/*ref for auto scroll */}
                                <div ref={bottomref}></div>
                       </div>
                       {/* fixed in bottom to send message */}
                        <div className='flex gap-4 w-full  items-center shadow-md py-2 px-4'>
                          <input value={sendMessage} onChange={handleSendMessage} type="text" className='w-full py-2 px-3 outline-none border rounded-md' placeholder='Type a message....' />
                         {/* Close Button */}
                        <button onClick={()=> handleChatbotResponse()}  className={`border p-2 rounded-md ${isTyping ? "bg-[#32075E]" : "bg-[#F0F0F2]"} `}>
                            <IoSend  size={26} className={` ${isTyping ? "text-white" : "text-[#6C6F74] " }  hover:scale-110 transition `}/>
                        </button>

                      </div>
                    </div>
                )
            }

        </div>
    )
}

export default ChatbotHome