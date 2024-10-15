import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../Pages/user/LandingPage/LandingPage'
import UserRegistration from '../Pages/user/UserRegisteration/UserRegistration'
import 'react-toastify/dist/ReactToastify.css';
import { UserLogin } from '../Pages/user/UserLogin/UserLogin'
import Home from '../Pages/user/Home/Home'
import UserProtectRoutes from './UserProtectRoutes';
import UserProfile from '../Pages/user/UserProfile/UserProfile';




const UserRoutes:React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/landing' element={<LandingPage/>}/>
        <Route path='/sign-up/*' element={<UserRegistration/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route element={<UserProtectRoutes/>} >
          <Route path='/' element={<Home/>}/>
          <Route path='/profile/*' element={<UserProfile/>} />
        </Route>
      </Routes>
    </>
  )
}

export default UserRoutes

