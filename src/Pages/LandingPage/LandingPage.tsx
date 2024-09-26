import './LandingPage.css'
import GuestNavbar from "../../Components/user/GuestNavbar/GuestNavbar"
import FeatursCard from '../../Components/user/FeatursCard/FeatursCard'
import Accordion from '../../Components/user/Accordion/Accordion'
import Footer from '../../Components/user/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  const handleAuthentication =()=>{
    navigate('/sign-up')
  }

  return (
    <>
    <GuestNavbar page='signIn'/>
      <div className='getStart'>
        <div className='landingPage-header'>
            <h1>Unlimited Events,<br />
            Workshops, and More.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Suspendisse varius 
            enim in eros elementum tristique. Duis cursus.</p>
            <button className='btn getStart-btn' onClick={handleAuthentication}>Get Start</button>
        </div>
      </div>
      <FeatursCard/>
      <Accordion/>
      <Footer/>
      <div>
        
      </div>
    </>
  )
}

export default LandingPage