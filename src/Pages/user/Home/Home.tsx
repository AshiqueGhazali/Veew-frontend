import { getToken } from '../../../api/user'
import UserNavbar from '../../../Components/user/UserNavbar/UserNavbar'
import './Home.css'


const Home = () => {
 
  return (
  <>
    <UserNavbar/>
    <div className="hero-banner">
      <div className='homePage-header'>
          <h1>Ready for Something New?<br />
          Start Searching!</h1>
          <input type="text" className='search-input' />
          <button className='btn search-btn'>Search</button>
      </div>
    </div>
  </>
  )
}

export default Home