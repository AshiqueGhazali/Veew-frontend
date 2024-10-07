import Logo from '../../../assets/veewWhiteLogo.png'
import './UserNavbar.css'



const UserNavbar:React.FC = () => {
  return (
    <nav className="navbar">
    <div className="logo">
        <img src={Logo} alt="" />
    </div>
    <div className='navCenter'>
        <ul className="nav-links">
        <li><a href="#home" className="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#events">Events</a></li>
        <li><a href="#pricing">Pricing</a></li>
        </ul>
    </div>
    <div className="nav-icons">
      <button className="icon-button">+</button>
      <div className="profile-icon">
        <span role="img" aria-label="profile">👤</span>
      </div>
    </div>
  </nav>
  )
}

export default UserNavbar