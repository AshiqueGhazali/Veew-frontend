import './LandingPage.css'
import GuestNavbar from "../../Components/user/GuestNavbar/GuestNavbar"
import FeatursCard from '../../Components/user/FeatursCard/FeatursCard'
import Accordion from '../../Components/user/Accordion/Accordion'
import Footer from '../../Components/user/Footer/Footer'

const LandingPage = () => {
  return (
    <>
    <GuestNavbar/>
      <div className='getStart'>
        <div className='landingPage-header'>
            <h1>Unlimited Events,<br />
            Workshops, and More.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Suspendisse varius 
            enim in eros elementum tristique. Duis cursus.</p>
            <button className='btn getStart-btn'>Get Start</button>
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