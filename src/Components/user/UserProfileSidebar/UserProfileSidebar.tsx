import React, { useEffect, useState } from "react";
import "./UserProfileSidebar.css";
import { IUser } from "../../../interface/userInterface";
import ladyProfile from "../../../assets/girl-profile.jpeg";
import manProfile from "../../../assets/man-profile.jpeg";
import { editProfile, userLogout } from "../../../api/user";
import { toast } from "react-toastify";
import Api from "../../../services/axios";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/slice/userAuthSlice";
import { useNavigate } from "react-router-dom";

interface UserSidebarProps {
  userData: IUser | null;
  setEdit: (edit: boolean) => void;
  isEdit: boolean;
}

const UserProfileSidebar: React.FC<UserSidebarProps> = ({
  userData,
  setEdit,
  isEdit,
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [err, setErr] = useState<string>("");
  const [image, setImage] = useState<string>(userData?.image || "");
  const [isImage, setUploadImg] = useState<File | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultProfileImg = () => {
    if (image) {
      return image;
    }
    return userData?.gender === "female" ? ladyProfile : manProfile;
  };
  const imagestring = defaultProfileImg();

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setPhone(userData.phone ? userData.phone : "");
      setGender(userData.gender ? userData.gender : "");
      setAge(userData.age ? userData.age : undefined);
      setImage(userData.image ? userData.image : "");
    }
  }, [userData]);

  const validateEditForm = () => {
    const nameReg = /^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/;
    const phoneReg = /^\+?[1-9]\d{1,14}$/;

    console.log("haskhksfhkasfdhkadsjffffff");

    if (!firstName || !nameReg.test(firstName)) {
      setErr("Enter A valid Name");
      return false;
    }

    if (!lastName || !nameReg.test(lastName)) {
      setErr("Enter A valid Name");
      return false;
    }

    if (phone && !phoneReg.test(phone)) {
      setErr("Phone Number is not valid");
      return false;
    }

    if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
      setErr('Gender must be either "male", "female"');
      return false;
    }

    if (age && (age < 10 || age > 120)) {
      setErr("Age must be between 10 and 120.");
      return false;
    }

    setErr("");
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateEditForm()) {
        return;
      }
      const id = userData?.id ? userData.id : "";

      if (isImage) {
        const uploadedImageUrl = await handleUpload(isImage);
        setImage(uploadedImageUrl);
      }

      const response = await editProfile({
        id,
        firstName,
        lastName,
        phone,
        gender,
        age,
      });
      if (response.status === 200) {
        toast.success("Profile Updated");
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (img: File | null) => {
    if (img) {
      try {
        const formData = new FormData();
        formData.append("image", img);
        const response = await Api.post("/upload-img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Image uploaded successfully:", response.data);
        setImage(response.data.imageUrl);
        return response.data.imageUrl;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleImgChange = (img: File | null) => {
    if (img) {
      const imageUrl = URL.createObjectURL(img);
      setUploadImg(img);
      setImage(imageUrl);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();

      if (response.status === 200) {
        dispatch(logout());
        localStorage.removeItem("isLogin")
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-sidebar">
      <div className="profile-image">
        <img src={imagestring} alt="" />
        {isEdit ? (
          <div className="edit-btn">
            {/* <button>Edit Image</button> */}
            <input
              type="file"
              id="fileInput"
              name="image"
              style={{ display: "none" }}
              onChange={(e) =>
                handleImgChange(e.target.files ? e.target.files[0] : null)
              }
            />
            <label htmlFor="fileInput" className="btn">
              Edit Image
            </label>
          </div>
        ) : (
          <h4>{`${userData?.firstName} ${userData?.lastName}`}</h4>
        )}
      </div>
      {isEdit ? (
        <div className="edit-details">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
          />
          <input
            type="text"
            value={`${age ? age : ""}`}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Age"
          />
          {err ? <p className="err-text">{err}</p> : ""}
        </div>
      ) : (
        <div className="profile-details">
          <ul>
            <li>Email : {userData?.email}</li>
            <li>Age : {userData?.age ? userData.age : "Nil"}</li>
            <li>Gender : {userData?.gender ? userData.gender : "Nil"}</li>
            <li>Phone : {userData?.phone ? userData.phone : "Nil"}</li>
          </ul>
        </div>
      )}
      {isEdit ? (
        <div className="profile-btn">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </div>
      ) : (
        <div className="profile-btn">
          <button onClick={() => setEdit(true)}>Edit Profile</button>
          <button onClick={() => navigate("/")}>Back to Home</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfileSidebar;

{
  /* <div className='profile-links' >
            <ul>
            <Link to='/profile' className='profile-link'><li className={isActive('/profile')}><span className='sidebar-icons'><CgProfile/></span>Profile</li></Link>
            <Link to='/profile/events' className='profile-link'><li className={isActive('/profile/events')}><span className='sidebar-icons'><RiCalendarScheduleFill/></span>My Events</li></Link>
            <Link to='/profile/tickets' className='profile-link'><li className={isActive('/profile/tickets')}><span className='sidebar-icons'>< IoTicketSharp/></span>My Tickets</li></Link>
            <Link to='/profile/wallet' className='profile-link'><li className={isActive('/profile/wallet')}><span className='sidebar-icons'><IoWalletSharp/></span>Wallet</li></Link>
            <Link to='/profile/notification' className='profile-link'><li className={isActive('/profile/notification')}><span className='sidebar-icons'><MdNotificationsActive/></span>Notifications</li></Link>
            </ul>
        </div> */
}
