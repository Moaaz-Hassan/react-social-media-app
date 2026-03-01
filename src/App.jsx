// Layouts
import MainLayout from './Layouts/MainLayout'
import AuthenticationLayout from './Layouts/AuthenticationLayout'

// Pages
import FollowersPage from './Pages/FollowersPage'
import FollowingPage from './Pages/FollowingPage'
import NotificationPage from './Pages/NotificationPage'
import SuggestionsFriendsPage from './Pages/SuggestionsFriendsPage'
import UsersProfilePage from './Pages/UsersProfilePage'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import NotFoundPage from './Pages/NotFoundPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ChangePasswordPage from './Pages/ChangePasswordPage'
import PostDetailsPage from './Pages/PostDetailsPage'
// ProtectedRoutes
import AuthenticationProtectedRoute from './ProtectedRoute/AuthenticationProtectedRoute'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

// servises
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthenticationCntextProvider } from './Context/AuthenticationCntext'
import {HeroUIProvider} from "@heroui/react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


export const queryClient = new QueryClient() ;

function App() {
  
  const routers = createBrowserRouter([
    {path : '' , element : <MainLayout/> , children : [
        {index : true , element : <ProtectedRoute><HomePage/></ProtectedRoute>},
        {path : 'profile' ,element : <ProtectedRoute><ProfilePage/></ProtectedRoute>} ,
        {path : 'single-Post/:id' , element : <ProtectedRoute><PostDetailsPage/></ProtectedRoute>} ,
        {path : 'users-profile/:id' , element : <ProtectedRoute><UsersProfilePage/></ProtectedRoute>} ,
        {path : 'suggestions-friends' , element : <ProtectedRoute><SuggestionsFriendsPage/></ProtectedRoute>} ,
        {path : 'notifications' , element : <ProtectedRoute><NotificationPage/></ProtectedRoute>} ,
        {path : 'following/:id' , element : <ProtectedRoute><FollowingPage/></ProtectedRoute>} ,
        {path : 'followers/:id' , element : <ProtectedRoute><FollowersPage/></ProtectedRoute>} ,
        {path:"change-password", element : <ProtectedRoute><ChangePasswordPage/></ProtectedRoute> } ,
        {path : '*', element : <ProtectedRoute><NotFoundPage/></ProtectedRoute>}
    ]},
    
    {path : '' , element : <AuthenticationLayout/> , children : [
        {path : 'register' , element : <AuthenticationProtectedRoute><RegisterPage/></AuthenticationProtectedRoute>} , 
        {path : 'login' , element : <AuthenticationProtectedRoute><LoginPage/></AuthenticationProtectedRoute>} , 
    ]} 

  ])
  
  return <div className=' bg-gray-50 min-h-screen'>
    <HeroUIProvider>
      <AuthenticationCntextProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routers}></RouterProvider>
        </QueryClientProvider>
      </AuthenticationCntextProvider>
    </HeroUIProvider>
  </div>
}

export default App