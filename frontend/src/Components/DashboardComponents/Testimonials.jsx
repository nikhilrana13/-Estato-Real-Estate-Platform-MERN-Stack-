import React, { useRef, useState, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



const testimonialsData = [
  {
    id: 1,
    name: "Hrishikesh Panigrahi",
    location: "Goa",
    date: "January 9, 2024",
    rating: 5,
    text:
      "Estato.com surpassed my expectations! Not only did they provide excellent service.",
    plan: "Assist +",
    rm: "Krishan Kant",
    avatar: "https://i.pravatar.cc/64?img=12",
  },
  {
    id: 2,
    name: "Atul Agarwal",
    location: "Gurgaon",
    date: "December 29, 2023",
    rating: 5,
    text:
      "Estato.com is a game-changer! The platform is intuitive, the service is top-notch and the whole process was lightning-fast.",
    plan: "Premium +",
    rm: null,
    avatar: "https://i.pravatar.cc/64?img=7",
  },
  {
    id: 3,
    name: "Neha Sharma",
    location: "Delhi",
    date: "November 14, 2023",
    rating: 5,
    text:
      "Very professional team — they handled everything smoothly and were always available to answer queries. Highly recommended!",
    plan: "Business",
    rm: "Rohit Singh",
    avatar: "https://i.pravatar.cc/64?img=5",
  },
  {
    id: 4,
    name: "Ravi Kumar",
    location: "Chandigarh",
    date: "October 1, 2023",
    rating: 5,
    text:
      "Fast responses and quality leads. Our listing sold quickly thanks to the visibility boost features.",
    plan: "Assist",
    rm: null,
    avatar: "https://i.pravatar.cc/64?img=8",
  },
  {
    id: 5,
    name: "Priya Verma",
    location: "Mumbai",
    date: "September 12, 2023",
    rating: 5,
    text:
      "Clean interface, easy to upload properties and the support team was really helpful throughout.",
    plan: "Standard",
    rm: "Sahil Mehra",
    avatar: "https://i.pravatar.cc/64?img=15",
  },
  {
    id: 6,
    name: "Aman Singh",
    location: "Bengaluru",
    date: "August 22, 2023",
    rating: 5,
    text:
      "Excellent experience — got good quality buyers and the process was transparent. Will use again.",
    plan: "Premium",
    rm: null,
    avatar: "https://i.pravatar.cc/64?img=18",
  },
];

const TestimonialCard = ({ t }) => {
  return (
    <div style={{ height: "350px" }} className="testimonial-card min-w-[280px] lg:min-w-[340px]  rounded-2xl border p-6 flex-shrink-0">
      <div className="flex justify-between items-start mb-3">
        <div className="text-gray-400">
          <FaQuoteLeft size={34} />
        </div>
        <div className="text-sm text-gray-400">{t.date}</div>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: t.rating }).map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 text-sm leading-6">{t.text}</p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <img
          src={t.avatar}
          alt={`${t.name} avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-gray-800">{t.name}</div>
          <div className="text-xs text-gray-400">From {t.location}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
          Plan: {t.plan}
        </span>
        {t.rm && (
          <span className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full">
            Assisted RM: {t.rm}
          </span>
        )}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const carouselRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(1);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w >= 1200) setVisibleCount(3);
      else if (w >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollByCard = (dir = "next") => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector(".testimonial-card");
    const gap = 20; // grid gap in px
    const step = (card?.offsetWidth || 320) + gap;
    el.scrollBy({
      left: dir === "next" ? step : -step,
      behavior: "smooth",
    });

    // update center index roughly
    const total = testimonialsData.length;
    setCenterIndex((prev) =>
      dir === "next" ? Math.min(prev + 1, total - 1) : Math.max(prev - 1, 0)
    );
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    // small delay to allow layout
    setTimeout(() => {
      if (visibleCount === 3) {
        // center first visible group
        const card = el.querySelector("div.min-w-[280px]");
        if (card) {
          const step = card.offsetWidth + 20;
          el.scrollLeft = step; // show second card in center initially
        }
      } else {
        el.scrollLeft = 0;
      }
    }, 100);
  }, [visibleCount]);

  return (
    <div className="w-full py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
          Testimonials
        </h2>
        <div className="h-2 w-12 bg-gray-200 rounded mx-auto mb-6 opacity-60" />

        <div className="relative">
          {/* Arrows */}
          <button
            aria-label="Previous testimonials"
            onClick={() => scrollByCard("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white w-11 h-11 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
          >
            <IoIosArrowBack />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth px-12 py-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonialsData.map((t, idx) => {
              // determine center styling when visibleCount === 3
              const center =
                visibleCount === 3
                  ? idx === centerIndex
                  : visibleCount === 2
                  ? idx === centerIndex
                  : false;

              return (
                <div
                  key={t.id}
                  className={`snap-center transition-transform duration-300 ${
                    center ? "scale-105 shadow-xl" : "scale-100"
                  }`}
                >
                  <TestimonialCard t={t} />
                </div>
              );
            })}
          </div>

          <button
            aria-label="Next testimonials"
            onClick={() => scrollByCard("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white w-11 h-11 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
