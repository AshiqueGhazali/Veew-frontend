import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import UserRegistration from './Pages/UserRegisteration/UserRegistration'


function App() {
 
  return (
    <>
      <Routes>
        <Route path='/landing' element={<LandingPage/>}></Route>
        <Route path='/register' element={<UserRegistration/>}></Route>
      </Routes>
    </>
  )
}

export default App
