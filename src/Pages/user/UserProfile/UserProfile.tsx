import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store'
import { getUserProfileData } from '../../../api/user'
import { IUser } from '../../../interface/userInterface'
import Footer from '../../../Components/user/Footer/Footer'
import UserProfileSidebar from '../../../Components/user/UserProfileSidebar/UserProfileSidebar'
// import CircularMenu from '../../../Components/user/CircularMenu/CircularMenu'

const UserProfile:React.FC = () => {

    const userId = useSelector((state: RootState) => state.user.userData.id)  
  const [userData,setUserData] = useState<IUser|null>(null);
  const [isEdit , setEdit] = useState<boolean>(false)
 

  
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

  }, [userId,isEdit]);

  return (
    <>
     <div className='user-profile'>
        <div className='profile-page'></div>
        <div>
            <UserProfileSidebar userData={userData} setEdit={setEdit} isEdit={isEdit}/>
        </div>
     </div>
     {/* <CircularMenu/> */}
      <Footer/>
    </>
  )
}

export default UserProfile