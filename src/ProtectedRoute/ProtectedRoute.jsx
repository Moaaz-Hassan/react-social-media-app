import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthenticationCntext from '../Context/AuthenticationCntext'

function ProtectedRoute({children}) {
    const {isLogedIn} =  useContext(AuthenticationCntext)
    return  isLogedIn ? children : <Navigate to={"/login"}/>
}

export default ProtectedRoute