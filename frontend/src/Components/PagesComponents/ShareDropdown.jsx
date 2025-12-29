import React, { useEffect, useRef, useState } from "react";
import { Share2, Link, Facebook, Mail, Twitter } from "lucide-react";
import { toast } from "sonner";

const ShareDropdown = ({ propertyLink }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(propertyLink);
    toast.success("Link copied to clipboard");
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Share Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <Share2 className="text-[#5E23DC] cursor-pointer'" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border z-50">
          <p className="text-center text-sm font-semibold text-gray-700 px-4 py-3 border-b">
            SHARE WITH YOUR FAMILY & FRIENDS
          </p>

          <div className="py-2">
            <ShareItem icon={<Link />} label="COPY TO CLIPBOARD" onClick={copyLink} />

            <ShareItem
              icon={<Facebook />}
              label="FACEBOOK"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${propertyLink}`,
                  "_blank"
                )
              }
            />

            <ShareItem
              icon={<Mail />}
              label="MAIL"
              onClick={() =>
                window.open(`mailto:?subject=Property&body=${propertyLink}`)
              }
            />

            <ShareItem
              icon={<Twitter />}
              label="TWITTER"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${propertyLink}`,
                  "_blank"
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareDropdown;

/* ---------- item ---------- */
const ShareItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100"
  >
    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
      {icon}
    </span>
    {label}
  </button>
);
