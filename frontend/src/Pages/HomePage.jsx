import axios from 'axios'
import { HeroSection } from '../Components/PagesComponents/HeroSection'
import Navbar from '../Components/PagesComponents/Navbar'
import React, { useEffect, useRef, useState } from 'react'
import TopPicks from '../Components/PagesComponents/TopPicks'
import SellPropertyCTA from '../Components/PagesComponents/SellPropertyCta'
import HowItWorks from '../Components/PagesComponents/HowItWorks'
import Footer from '../Components/PagesComponents/Footer'

const HomePage = () => {
  const [UserCurrentLocation, setUserCurrentLocation] = useState("India")
  const savedcity = localStorage.getItem("city")
 

  // fetch current location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // get coordinates
        const { lat, lon } = await getUserLocation()
        // get city
        const city = await getCityFromCoords(lat, lon)
        setUserCurrentLocation(city || "India")
      } catch (error) {
        console.log("failed to fetch location", error)
        setUserCurrentLocation("India")
      }
    }
    fetchLocation()
  }, [])
  
   const displayCity = savedcity || UserCurrentLocation


  return (
    <div className='w-full'>
      <Navbar  />
      <section className='w-full'>
        <HeroSection displayCity={displayCity} />
          <TopPicks />
        <SellPropertyCTA />
        <HowItWorks />
      </section>
      <Footer />
    </div>
  )
}

export default HomePage


// helper functions
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported")
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    },
      (err) => reject(err)
    )
  })
}

const getCityFromCoords = async (lat, lon) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
  const data = await res.json()
  const addr = data?.address || {}
  return addr.state || addr.state_district || addr.city || addr.country || "Unknown";
}