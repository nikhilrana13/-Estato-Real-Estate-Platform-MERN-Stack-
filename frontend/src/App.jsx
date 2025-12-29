import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import DashboardHome from './Pages/DashboardHome'
import { Toaster } from './Components/ui/sonner'
import PropertyEnquires from './Components/DashboardComponents/PropertyEnquires'
import MyListings from './Components/DashboardComponents/MyListings'
import Dashboard from './Components/DashboardComponents/Dashboard'
import AddPropertyForm from './Components/DashboardComponents/AddPropertyFormComponent/AddPropertyForm'
import MyProfile from './Components/DashboardComponents/MyProfile'
import SearchProperties from './Components/PagesComponents/SearchProperties'
import EachPropertyDetails from './Pages/EachPropertyDetails'
import UsersWishlistProperty from './Components/PagesComponents/UsersWishlistProperty'
import ProtectedRoute from './Components/Middlewares/ProtectedRoute'
import ScrollToTop from './utils/ScrollToTop'

const App = () => {

  return (
    <div className='app'>
       <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/searchproperties' element={<SearchProperties />} /> 
        <Route path='/property/:id' element={<EachPropertyDetails />} />
        <Route path='/mywishlists' element={<ProtectedRoute><UsersWishlistProperty /></ProtectedRoute>} />

        {/* dashboard routes protected route */}
        <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<DashboardHome />}>
        <Route path='dashboard-home' element={<Dashboard />} />
        <Route path='enquiries' element={<PropertyEnquires />} />
        <Route path="mylistings" element={<MyListings />} />
        <Route path='add-property' element={<AddPropertyForm />} />
        <Route path='my-profile' element={<MyProfile />} />
        </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App