import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/user/LandingPage/LandingPage'
import UserRegistration from './Pages/user/UserRegisteration/UserRegistration'


function App() {
 
  return (
    <>
      <Routes>
        <Route path='/landing' element={<LandingPage/>}></Route>
        <Route path='/sign-up/*' element={<UserRegistration/>}></Route>
      </Routes>
    </>
  )
}

export default App
