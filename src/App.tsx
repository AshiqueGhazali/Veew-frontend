import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'


function App() {
 
  return (
    <>
      <Routes>
        <Route path='/landing' element={<LandingPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
