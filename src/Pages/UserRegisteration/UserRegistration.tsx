import './UserRegistration.css'
import FeatureList from "../../Components/user/FeatureList/FeatureList"
import GuestNavbar from "../../Components/user/GuestNavbar/GuestNavbar"
import RegistrationForm from "../../Components/user/RegistrationForm/RegistrationForm"


const UserRegistration = () => {
  return (
    <div className="user-registration">
      <GuestNavbar />
      <div className="content">
        <FeatureList />
        <RegistrationForm/>
      </div>
    </div>
  )
}

export default UserRegistration