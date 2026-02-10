import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthenticationCntext from '../Context/AuthenticationCntext'

function AuthenticationProtectedRoute({children}) {
    const {isLogedIn } =  useContext(AuthenticationCntext)
    return  isLogedIn ? <Navigate to={"/"}/> :  children 


}

export default AuthenticationProtectedRoute