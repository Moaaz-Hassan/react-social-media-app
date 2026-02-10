import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthenticationLayout() {
  return <div>
    <Outlet></Outlet>
  </div>
}

export default AuthenticationLayout