import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/user/LandingPage/LandingPage'
import UserRegistration from './Pages/user/UserRegisteration/UserRegistration'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {
 
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/landing' element={<LandingPage/>}></Route>
        <Route path='/sign-up/*' element={<UserRegistration/>}></Route>
      </Routes>
    </>
  )
}

export default App
