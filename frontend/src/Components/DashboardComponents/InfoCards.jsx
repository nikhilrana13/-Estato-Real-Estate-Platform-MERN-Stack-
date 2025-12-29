import React from 'react'
import infoicon1 from "../../assets/customer-service.png"
import warningimg from "../../assets/warning.png"
import calculatorimg from "../../assets/calculator.png"
import { MdKeyboardArrowRight, MdQrCode2 } from 'react-icons/md'
import { IoAlert } from 'react-icons/io5'

const InfoCards = () => {

    const CardDetails = [
        {
            image: infoicon1,
            title1: "Not Sure which Package is best for you?",
            title2: "Let us help you out with our interactive plan finder",
            link: "Find my plan",
            ArrowIcon: <MdKeyboardArrowRight />
        },
        {
            image: warningimg,
            title1: "Attention!",
            title2: "Beware of fraudsters asking you to scan OR code for receiving payments",
            link: "Know More",
            ArrowIcon: <MdKeyboardArrowRight />
        },
        {
            image: calculatorimg,
            title1: "Property Value Calculator",
            title2: "Calculate the right value of your property",
            link: "Estimate price",
            ArrowIcon: <MdKeyboardArrowRight />
        },
    ]


    return (
        <>
            {
                CardDetails.map((info, index) => {
                    return (
                        <div key={index} className='w-full sm:w-[350px] px-2 py-5 rounded-md bg-white  flex sm:flex-row flex-col   gap-3'>
                            <div>
                                <img src={info?.image} alt="Card Image" className='w-20 object-cover h-20' />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <p className='text-[0.8rem]  font-[700] leading-4'>{info?.title1}</p>
                                <p className='text-[0.8rem] max-w-[200px]  text-[#6C6C6C]'>{info?.title2}</p>
                                <span className='self-end cursor-pointer  text-[0.8rem] font-[500] flex items-center gap-2'>
                                    <span className='text-[#7B4BE2]'>{info?.link}</span>
                                    <span className='ml-1 text-[#7B4BE2]'>{info?.ArrowIcon}</span>
                                </span>
                            </div>
                        </div>
                       
                    )
                })
            }
        </>
    )
}

export default InfoCards