import { ArrowLeftCircle, Backpack, HeartIcon, PhoneCall, Share2Icon } from 'lucide-react'
import Navbar from '../Components/PagesComponents/Navbar'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PropertyImageGallery from '../Components/PagesComponents/PropertyImageGallery'
import { MdArrowBack, MdKeyboardArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import viewonmap from "../assets/viewOnMap.3e01b667.svg"
import PropertyOverview from '../Components/PagesComponents/PropertyOverView'
import PropertyAmenities from '../Components/PagesComponents/PropertyAmenities'
import ContactSellerForm from '../Components/PagesComponents/ContactSellerform'
import { formatLabel, formatPrice } from '@/utils/formatters'
import noimage from "../assets/Nopropertyimg.jpg"
import { GiCoinsPile } from 'react-icons/gi'
import ContactSellerformDialog from '../Components/PagesComponents/ContactSellerformDialog'
import ShareDropdown from '../Components/PagesComponents/ShareDropdown'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../Redux/AuthSlice'
import { FaHeart } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import PropertyDetailsShimmer from '../Components/PagesComponents/PropertyDetailsShimmer'

const EachPropertyDetails = () => {
    const [propertydetails, setPropertyDetails] = useState({})
    const [ActiveTab, setActiveTab] = useState("LOCALITY")
    const overViewRef = useRef()
    const AmenitiesRef = useRef()
    const localityRef = useRef()
    const [openDialog, setOpenDialog] = useState(false)
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.Auth.user)
    const isWishlisted = !!propertydetails?._id && user?.mywishlists?.includes(propertydetails?._id);
    const isLoading = !propertydetails?._id

    // console.log("property", location.state)
    // console.log("id",location.state?._id)
    const tabs = ["OVERVIEW", "AMENITIES", "LOCALITY"]

    // fetch properties details
    useEffect(() => {
        const fetchPropertisDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/property/${id}`, { withCredentials: true })
                if (response.data) {
                    setPropertyDetails(response?.data?.data)
                }

            } catch (error) {
                console.log("failed to get details", error)
            }
        }
        fetchPropertisDetails()
    }, [id])
    // console.log("property",propertydetails)
    const handleScrollTo = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop - 110,
            behavior: "smooth"
        });
    }
    const sectionDistance = (ref) => {
        if (!ref.current) return Infinity;
        return Math.abs(ref.current.getBoundingClientRect().top - 120);
    };
    // handle scroll spy
    useEffect(() => {
        const onScroll = () => {
            const d1 = sectionDistance(localityRef);
            const d2 = sectionDistance(overViewRef);
            const d3 = sectionDistance(AmenitiesRef);
            const min = Math.min(d1, d2, d3);
            if (min === d1) setActiveTab("LOCALITY");
            else if (min === d2) setActiveTab("OVERVIEW");
            else if (min === d3) setActiveTab("AMENITIES");
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    // normalize
    const details = propertydetails?.residential || propertydetails.commercial
    // console.log("details",details)
    const city = details?.address?.city
    const bhk = details?.bhk
    const typeofproperty = details?.type
    const propertycategory = propertydetails?.residential ? "residential" : propertydetails?.commercial ? "commercial" : "commercial"
    const formatLookingToForUI = (value) => {
        if (!value) return "";
        if (value === "Sell") return "Buy";
        if (value === "Rent") return "Rent";
        return value;
    };
    const lookingTo = formatLookingToForUI(propertydetails?.lookingTo)

    // RESIDENTIAL amenities
    const flatA = details?.flatAmenities || [];
    const societyA = details?.societyAmenities || [];

    // Convert society amenities -> { name: "gym" } format
    const formattedSocietyA = societyA.map((item) => ({ name: item }))
    // merged
    const residentialAmenities = [...flatA, ...formattedSocietyA]

    // COMMERCIAL amenities
    const commercialAmenities = details?.amenities || [];

    // FINAL AMENITIES (priority: residential > commercial)
    const finalAmenities = residentialAmenities.length > 0 ? residentialAmenities : commercialAmenities.map((item) => ({ name: item }))
    // stop scroll when dialog box open
    useEffect(() => {
        document.body.style.overflow = openDialog ? "hidden" : "auto"
        return () => (document.body.style.overflow = "auto")
    }, [openDialog])

    const AddTowishlist = async () => {
        const token = localStorage.getItem("token")

        if (!token) {
            toast.error("Please login to add wishlist")
            return
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/property/${propertydetails?._id}/wishlist`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }, withCredentials: true
            })
            // console.log("response",response.data)
            if (response.data) {
                const propertyId = response?.data?.data?.propertyId
                const message = response?.data?.message
                if (!propertyId) return;
                let updatedWishlist = user?.mywishlists || []
                if(message === "Added to wishlist"){
                    updatedWishlist = [...updatedWishlist,propertyId]
                }
                if(message === "Removed from wishlist"){
                    updatedWishlist = updatedWishlist.filter((id)=> id !== propertyId)
                }
                dispatch(SetUser({...user,mywishlists:updatedWishlist}))
                toast.success(message)
            }

        } catch (error) {
            console.log("failed to add property to wishlist", error)
            toast.error(error?.response?.data?.error || "Something went wrong")
        }
    }

    return (
        <>
            <div className='w-full'>
                <Navbar />
                {/* property details */}
                {
                    isLoading ? (
                        <PropertyDetailsShimmer />
                    ):(
               <section className='w-full'>
                    <div className='flex w-full  px-[2rem] lg:px-[7rem]   xl:px-[12rem] py-5 flex-col bg-[#FFFFFF] '>
                        <div className="flex items-center gap-4 text-[0.8rem] text-[#747474]">
                            {/* Home */}
                            <NavLink to="/" className="hover:text-[#5E23DC] flex items-center gap-1">
                                Home
                            </NavLink>
                            <MdKeyboardArrowRight />
                            {/* Property in City */}
                            <NavLink
                                to={`/searchproperties?city=${city}&type=${propertycategory}&lookingto=${lookingTo}`}
                                className="hover:text-[#5E23DC]"
                            >
                                Property in {city}
                            </NavLink>
                            <MdKeyboardArrowRight />
                            {/* Current Property (no link) */}
                            <span className="text-[#222222] font-[500]">
                                {bhk ? `${bhk}` : ""} {typeofproperty}
                            </span>
                        </div>
                        <div className='flex  flex-col mt-3 md:items-center gap-3 sm:justify-between md:flex-row '>
                            <div className='flex gap-3 flex-col '>
                                <div className='flex gap-5 justify-between'>
                                    <span className='font-[500] text-[1.3rem]'>{details?.bhk} {formatLabel(typeofproperty || "NA")}</span>
                                    <div className='flex items-center gap-3'>
                                        <ShareDropdown propertyLink={window.location.href} />
                                        {
                                            isWishlisted ? (
                                                <FaHeart size={29} onClick={() => AddTowishlist()} className="cursor-pointer transition text-[#E62878]" />
                                            ) : (

                                                <CiHeart onClick={() => AddTowishlist()} size={29} className="cursor-pointer transition text-[#E62878]" />
                                            )
                                        }

                                    </div>
                                </div>
                                <span className='text-[0.8rem]'>By <span className='text-[0.8rem] text-[#5E23DC]'>{details?.address?.buildingName} </span></span>
                                <span className='text-[#747474] font-[400]  text-[0.7rem] sm:text-[1rem]'>
                                    {details?.address?.buildingName || "NA"} {details?.address?.locality || "NA"} {details?.address?.city || "NA"}
                                </span>
                            </div>
                            <div className='flex flex-col  gap-5'>
                                <span className='font-[700]'>{formatPrice(details?.propertyPrice) || "NA"}</span>
                                <button disabled={openDialog} onClick={() => setOpenDialog(true)} className="bg-[#5E23DC] justify-center gap-2 font-[600] text-white text-[0.8rem] rounded-md px-10 py-3  flex items-center">
                                    <PhoneCall />   Contact Seller
                                </button>
                            </div>
                        </div>
                        {/* Images slide */}
                        <div className='w-full'>
                            <PropertyImageGallery images={propertydetails?.images || [noimage]} />
                        </div>
                        {/* details */}
                        <div className='grid p-3 grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7'>
                            <div className=' flex py-2 sm:py-3  border-r px-3 text-center flex-col gap-1 justify-center'>
                                <span className='font-[500] text-[1rem] '>{details?.plotArea || "NA"} {details?.plotAreaUnit}</span>
                                <span className='font-[400] text-[0.8rem] '>Built Up Area</span>
                            </div>
                            <div className=' flex py-2 sm:py-3  border-r px-3 text-center flex-col gap-1 justify-center'>
                                <span className='font-[500] text-[1rem] '>{formatPrice(details?.propertyPrice || "NA")}</span>
                                <span className='font-[400] text-[0.8rem] '>Price</span>
                            </div>
                            <div className=' flex py-2 sm:py-3  border-r px-3 text-center  flex-col gap-1 justify-center'>
                                <span className='font-[500] text-[1rem] '>{details?.advancedDetails?.ageOfProperty || "NA"} year Old</span>
                                <span className='font-[400] text-[0.8rem] '>Age of property</span>
                            </div>

                            <div className=' flex py-2 sm:py-3  border-r px-3 text-center  flex-col gap-1 justify-center'>
                                <span className='font-[500] text-[1rem]'>{formatLabel(details?.constructionStatus || "NA")}</span>
                                <span className='font-[400] text-[0.8rem]'>Possession status</span>
                            </div>

                            <div className=' flex py-2 sm:py-3  border-r px-3 text-center flex-col gap-1 justify-center'>
                                <span className='font-[500] text-[1rem] '>{details?.advancedDetails?.yourFloor || "NA"} of {details?.advancedDetails?.totalFloor || "NA"}</span>
                                <span className='font-[400] text-[0.8rem] '>floor</span>
                            </div>
                            <div className=' flex py-2 sm:py-3  border-r px-3 text-center flex-col gap-1 justify-center'>
                                <span className='font-[500] text-[1rem] '>{details?.furnishType || "NA"}</span>
                                <span className='font-[400] text-[0.8rem] '>Furnishing</span>
                            </div>
                            <div className=' flex py-2 sm:py-3  border-r px-3 text-center flex-col gap-1 justify-center'>
                                <span className='font-[500] text-[1rem] '>{details?.address?.locality || "NA"}</span>
                                <span className='font-[400] text-[0.8rem] '>locality</span>
                            </div>
                        </div>
                    </div>
                    {/* Tabs*/}
                    <div className=' sticky top-[-0px] z-50  w-full  bg-white  border-t'>
                        <div className='flex items-center sm:justify-center gap-3 border-t pt-4   overflow-y-auto'>
                            {
                                tabs.map((tab, i) => <span key={i} onClick={() => {
                                    setActiveTab(tab); if (tab === "OVERVIEW") handleScrollTo(overViewRef); if (tab === "AMENITIES") handleScrollTo(AmenitiesRef); if (tab === "LOCALITY") handleScrollTo(localityRef)
                                }}
                                    className={`py-2 px-5 border-b-2 cursor-pointer font-[600] transition ${ActiveTab === tab && "text-[#7C4CE3] border-[#7C4CE3]"}`}>{tab}</span>)
                            }
                        </div>
                    </div>
                    {/* property details  */}
                    <div className='bg-[#F4F4F4] mt-5 px-[1.5rem] lg:px-[7rem] gap-3 min-h-screen   xl:px-[12rem] py-3 flex flex-col md:flex-row'>
                        {/* right side */}
                        <div className='w-full  md:w-[70%] flex flex-col gap-2'>
                            {/* property location */}
                            <div ref={localityRef} className='bg-white rounded-md  p-5 flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <img src={viewonmap} alt="location" className='w-14 h-[40px]' />
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-[0.8rem] font-[500] text-[#666666]'>Property Location</span>
                                        <p className='text-[1rem] font-[600]'>{details?.address?.buildingName || "NA"} {details?.address?.locality || "NA"} {details?.address?.city || "NA"}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Property OverView */}
                            <div ref={overViewRef}>
                                <PropertyOverview
                                    data={propertydetails}
                                />
                            </div>
                            {/* Amenities */}
                            <div ref={AmenitiesRef}>
                                <PropertyAmenities Amenities={finalAmenities} />
                            </div>

                        </div>
                        {/* left side */}
                        <div className='w-full   md:w-[30%] flex flex-col gap-2'>
                            {/* contact seller form */}
                            <div className="sticky top-[60px] z-[40]">
                                <ContactSellerForm propertyId={propertydetails?._id} userdata={propertydetails?.userId} usertype={propertydetails?.whoYouAre
                                } />
                            </div>
                        </div>
                    </div>
                </section>
                    )
                }

               

            </div>
            <ContactSellerformDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                propertyId={propertydetails?._id}
                userdata={propertydetails?.userId}
                usertype={propertydetails?.whoYouAre}
            />
        </>

    )
}

export default EachPropertyDetails