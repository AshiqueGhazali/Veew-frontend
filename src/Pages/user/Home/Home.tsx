import { useEffect, useState } from 'react'
import UserNavbar from '../../../Components/user/UserNavbar/UserNavbar'
import './Home.css'
import { getUserProfileData } from '../../../api/user'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store';
import { IUser } from '../../../interface/userInterface'



const Home = () => {
  const userId = useSelector((state: RootState) => state.user.userData.id)  
  const [userData,setUserData] = useState<IUser|null>(null)
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await getUserProfileData(userId);
          if (response.status === 200) {
            setUserData(response.data.userData);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        console.error('User ID is null or undefined');
      }
    };

    fetchUserData(); 

  }, [userId]);


  return (
  <>
    <UserNavbar userData={userData}/>
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