import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from './Layouts/MainLayout'
import AuthenticationLayout from './Layouts/AuthenticationLayout'

import LogOutPage from './Pages/LogOutPage'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import NotFoundPage from './Pages/NotFoundPage'
import SettingsLayout from './Layouts/SettingsLayout'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ChangePasswordPage from './Pages/ChangePasswordPage'
import AuthenticationProtectedRoute from './ProtectedRoute/AuthenticationProtectedRoute'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthenticationCntextProvider } from './Context/AuthenticationCntext'
import PostDetailsPage from './Pages/PostDetailsPage'
import {HeroUIProvider} from "@heroui/react";


export const queryClient = new QueryClient() ;

function App() {
  
  const routers = createBrowserRouter([
    {path : '' , element : <MainLayout/> , children : [
        {index : true , element : <ProtectedRoute><HomePage/></ProtectedRoute>},
        {path : 'profile' ,element : <ProtectedRoute><ProfilePage/></ProtectedRoute>} ,
        {path : 'single-Post/:id' , element : <ProtectedRoute><PostDetailsPage/></ProtectedRoute>} ,
        
        {path : 'settings' , element : <SettingsLayout/>, children :[
          
          {index:true, element : <ProtectedRoute><ChangePasswordPage/></ProtectedRoute> } ,
          {path : "logOut" , element: <ProtectedRoute><LogOutPage/></ProtectedRoute>}

        ]},

        {path : '*', element : <ProtectedRoute><NotFoundPage/></ProtectedRoute>}
    ]},
    
    {path : '' , element : <AuthenticationLayout/> , children : [
        {path : 'register' , element : <AuthenticationProtectedRoute><RegisterPage/></AuthenticationProtectedRoute>} , 
        {path : 'login' , element : <AuthenticationProtectedRoute><LoginPage/></AuthenticationProtectedRoute>} , 
    ]} 

  ])
  
  return <>
    <HeroUIProvider>
      <AuthenticationCntextProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routers}></RouterProvider>
        </QueryClientProvider>
      </AuthenticationCntextProvider>
    </HeroUIProvider>
  </>
}

export default App