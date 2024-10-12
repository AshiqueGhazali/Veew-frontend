import React, { useEffect, useState } from 'react'
import './SideBar.css'
import Logo from '../../../assets/veewBlackLogo.png'
import { FaHome , FaUsers} from "react-icons/fa";
import { IoMdPricetags, IoMdList } from "react-icons/io";
import { IoTicketSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminlogout } from '../../../Redux/slice/adminAuthSlice';
import { adminLogout } from '../../../api/admin';

interface sideBarProp{
  isNearFooter:boolean
}

const SideBar:React.FC<sideBarProp> = ({isNearFooter}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const navigate = useNavigate()
    const location = useLocation()

    const sidebarHeight = isNearFooter ? '70vh' : '90vh';

    const dispatch = useDispatch()

    const toggleSidebar = ()=>{
        if(isMobile){
            setIsOpen(!isOpen)
        }
    }

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 1024) {
            setIsMobile(true);   
            setIsOpen(false);   
          } else {
            setIsMobile(false); 
            setIsOpen(true);   
          }
        };
    
        window.addEventListener('resize', handleResize);
        
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);


      const handleLogout = async()=>{
        try {
          const response = await adminLogout()

          if(response.status===200){
            dispatch(adminlogout())
            navigate('/admin/login')
          }
        } catch (error) {
          console.log(error);
          
        }
      }

      const isActive = (path:string)=>{
        return location.pathname === path? "active" : "";
      }

         
  return (
    <>
        <div className={`side-bar ${isOpen ? 'open': ''}`} style={{height:sidebarHeight}}>
            <img src={Logo} alt="Logo" className='logo' onClick={toggleSidebar} />
            <div className={`sidebar-list ${isOpen ? 'show' : ''}`}>
                <ul>
                <Link to='/admin/' className='sidebar-link'><li className={isActive('/admin/')}><span className='sidebar-icons'><FaHome/></span>{isOpen && 'Home'}</li></Link>
                <Link to='/admin/user-management' className='sidebar-link'><li className={isActive('/admin/user-management')}><span className='sidebar-icons'><FaUsers /></span>{isOpen && 'Users'}</li></Link>
                <Link to='/admin/pricing-management' className='sidebar-link'><li className={isActive('/admin/pricing-management')}><span className='sidebar-icons'><IoMdPricetags/></span>{isOpen && 'Pricing'}</li></Link>
                <Link to='/admin/event-management' className='sidebar-link'><li className={isActive('/admin/event-management')}><span className='sidebar-icons'><IoMdList/></span>{isOpen && 'Events'}</li></Link>
                <Link to='/admin/ticket-management' className='sidebar-link'><li className={isActive('/admin/ticket-management')}><span className='sidebar-icons'><IoTicketSharp/></span>{isOpen && 'Entry Pass'}</li></Link>
                </ul>
            </div>
            <div className={`logout-button ${isOpen ? 'show' : ''}`}>
                <button onClick={handleLogout}><span className='sidebar-icons'><LuLogOut/></span>{isOpen && 'Logout'}</button>
            </div>
        </div>
    </>
  )
}

export default SideBar