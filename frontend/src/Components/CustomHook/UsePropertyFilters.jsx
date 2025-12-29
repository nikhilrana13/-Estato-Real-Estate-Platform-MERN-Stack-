import React, { useState } from 'react'

const UsePropertyFilters = () => {
    const [minPrice,SetMinPrice] = useState(5000)
    const [maxPrice,SetMaxPrice] = useState(10000000)
    const [propertytype,SetPropertytype] = useState([])
    const [Bhks,SetBhks] = useState([])
    const [Amenities,SetAmenities] = useState([])
    const [furnishType,SetFurnishType] = useState([])
    const [constructionStatus,SetConstructionStatus] = useState("")
    const [sortBy,SetSortBy] = useState("")

    
  return {minPrice,SetMinPrice,maxPrice,SetMaxPrice,propertytype,SetPropertytype,Bhks,SetBhks,furnishType,constructionStatus,SetConstructionStatus,Amenities,SetAmenities,SetFurnishType,sortBy,SetSortBy}
}

export default UsePropertyFilters