import React,{ useState } from 'react';
import Logo from '../../../assets/veewWhiteLogo.png'
import { CgProfile } from "react-icons/cg";
import './UserNavbar.css'
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoTicketSharp, IoWalletSharp  } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/slice/userAuthSlice';
import { userLogout } from '../../../api/user';
import { IUser } from '../../../interface/userInterface';


interface UserNavbarProps {
  userData: IUser|null; 
}

const UserNavbar:React.FC<UserNavbarProps> = ({userData}) => {

  const [dropdownVisible,setDropdownVisible]=useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleLogout = async()=>{
    try {
      const response = await userLogout()
      if(response.status===200){
        dispatch(logout())
        navigate('/landing')
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <nav className="navbar">
    <div className="logo">
        <img src={Logo} alt="" />
    </div>
    <div className='navCenter'>
        <ul className="nav-links">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/pricing">Pricing</a></li>
        </ul>
    </div>
    <div className="nav-icons">
      <button className="icon-button">+</button>
      <div className="profile-icon" onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <CgProfile />
      </div>
    </div>

    {dropdownVisible && (
        <div className="dropdown-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
          <div className="user-info">
            <img src="https://via.placeholder.com/50" alt="User" className="profile-pic" />
            <div>
              <p className="user-name">{`${userData?.firstName} ${userData?.lastName}`}</p>
              <p className="user-email">{userData?.email}</p>
            </div>
          </div>
          <ul>
            <Link to={'/userEvents'} className='dropdown-link'><li><span className='navlink-icons'><RiCalendarScheduleFill /></span> My Events</li></Link>
            <Link to={'/userEvents'} className='dropdown-link'><li><span className='navlink-icons'><IoTicketSharp /></span> My Ticket</li></Link>
            <Link to={'/userEvents'} className='dropdown-link'><li><span className='navlink-icons'><IoWalletSharp/></span> Wallet</li></Link>
            <Link to={'/userEvents'} className='dropdown-link'><li><span className='navlink-icons'><MdNotificationsActive/></span> Notifications</li></Link>
            <li className='active' onClick={handleLogout}><span className='navlink-icons'><TbLogout2/></span> Logout</li>
          </ul>
        </div>
      )}
  </nav>
  )
}

export default UserNavbar