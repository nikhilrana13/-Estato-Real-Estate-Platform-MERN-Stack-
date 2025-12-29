import React from "react";
import { motion } from "framer-motion";
import {
  
  HiOutlineBuildingOffice2,
  HiOutlinePhoneArrowUpRight,
  HiOutlineClipboardDocumentCheck,
  HiOutlineEnvelope
} from "react-icons/hi2";
import { SearchCheckIcon } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Search property",
    desc: "Search property by name, city, locality or project",
    icon: SearchCheckIcon,
  },
  {
    id: 2,
    title: "Open property details",
    desc: "View photos, pricing, amenities & complete project details",
    icon: HiOutlineBuildingOffice2,
  },
  {
    id: 3,
    title: "Click on contact",
    desc: "Tap on contact button to connect with the seller",
    icon: HiOutlinePhoneArrowUpRight,
  },
  {
    id: 4,
    title: "Fill your details",
    desc: "Enter your name, phone & email securely",
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    id: 5,
    title: "Seller details sent",
    desc: "Seller contact number is sent directly to your email",
    icon: HiOutlineEnvelope,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full px-6 py-8 md:px-[8rem] ">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          How it works
        </h2>
        <p className="text-gray-600 mt-2">
          Simple, fast & secure way to connect with property sellers
        </p>
      </div>

      {/* Steps */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="w-14 h-14 mx-auto rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-2xl">
              <step.icon />
            </div>

            {/* Text */}
            <h3 className="mt-5 font-semibold text-gray-900 text-lg">
              {step.title}
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
