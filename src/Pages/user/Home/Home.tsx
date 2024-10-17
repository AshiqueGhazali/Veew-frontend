import UserNavbar from '../../../Components/user/UserNavbar/UserNavbar'
import './Home.css'
import Banner from '../../../assets/hero-banner2.jpg'




const Home = () => {
  return (
  <>
    <UserNavbar/>
    {/* <div className="hero-banner">
      <div className='homePage-header'>
          <h1>Ready for Something New?<br />
          Start Searching!</h1>
          <input type="text" className='search-input' />
          <button className='btn search-btn'>Search</button>
      </div>
    </div> */}
    <div className='home-hero'> 
        <img src={Banner} alt="" className='hero-banner' />
        <div className='hero-caption'>
        <h1>Ready for Something New?<br />
          Start Searching!</h1>
          <p>Find the right plan to fuel your growth</p>
          <div className='hero-search-btn'>
          <input type="text" className='search-input' />
          <button className='btn search-btn'>Search</button>
          </div>
        </div> 
    </div>
  </>
  )
}

export default Home