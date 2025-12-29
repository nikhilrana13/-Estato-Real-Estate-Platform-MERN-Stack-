import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const CustomerSupport = () => {
    return (
        <div className="w-full mt-7 bg-white rounded-3xl p-6 md:p-8 border">

            {/* Heading */}
            <h2 className="text-[1.1rem] md:text-[1.25rem] font-semibold text-gray-900 mb-5">
                Customer Support
            </h2>

            {/* Cards */}
            <div className="flex flex-col md:flex-row gap-5">

                {/* Call Card */}
                <div className="w-full md:w-[40%] bg-white border rounded-2xl p-6 flex items-start gap-4">
                    <div className="text-[#6B4EFF] text-[1.8rem]">
                        <FiPhoneCall />
                    </div>

                    <div>
                        <h3 className="text-[1rem] font-semibold text-gray-900">Call Us</h3>
                        <p className="text-gray-500 text-[0.9rem]">1800-313-4777</p>
                    </div>
                </div>

                {/* Email Card */}
                <div className="w-full md:w-[40%] bg-white border rounded-2xl p-6 flex items-start gap-4">
                    <div className="text-[#6B4EFF] text-[1.8rem]">
                        <HiOutlineMail />
                    </div>

                    <div>
                        <h3 className="text-[1rem] font-semibold text-gray-900">Email Us</h3>
                        <p className="text-gray-500 text-[0.9rem]">support@Estato.com</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomerSupport;
