import './GuestNavbar.css'
import Logo from '../../../assets/veewLogo.png'

const GuestNavbar = () => {
  return (
      <div className="GuestNavbar">
          <div className='GuestNavbar-left'>
              <img src={Logo} alt="" />
          </div>
          <div className='GuestNavbar-right'>
            <button className="dark-btn">Sign In</button>
          </div>
      </div>
  )
}

export default GuestNavbar