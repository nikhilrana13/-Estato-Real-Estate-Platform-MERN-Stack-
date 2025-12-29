import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const user = useSelector((state)=> state.Auth.user)

    if(!user){
        return <Navigate to="/" replace />
    }
    
  return children ? children : <Outlet />
}

export default ProtectedRoute