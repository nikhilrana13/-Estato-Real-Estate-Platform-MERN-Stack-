import React from "react";
import { MdCheckCircle, MdPending, MdError, MdDrafts } from "react-icons/md";

const ListingStatus = ({Activecount}) => {
  const data = [
    {
      title: "Active Listings",
      count: Activecount,
      icon: <MdCheckCircle size={26} />,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Pending Approval",
      count: 0,
      icon: <MdPending size={26} />,
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      title: "Rejected",
      count: 0,
      icon: <MdError size={26} />,
      color: "text-red-600",
      bg: "bg-red-100"
    },
    {
      title: "Drafts",
      count: 2,
      icon: <MdDrafts size={26} />,
      color: "text-blue-600",
      bg: "bg-blue-100"
    }
  ];

  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm">
      <h2 className="text-[1.1rem] font-[600] mb-4">Listing Status</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl border hover:shadow-sm transition-all duration-300 bg-white"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[0.85rem] text-gray-600">{item.title}</span>
              <span className="text-[1.4rem] font-[700]">{item.count}</span>
            </div>

            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full ${item.bg} ${item.color}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingStatus;
