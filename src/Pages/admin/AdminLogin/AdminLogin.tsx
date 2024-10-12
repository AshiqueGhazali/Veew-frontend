import React, { useEffect, useState } from 'react'
import './adminLogin.css'
import Logo from '../../../assets/veewBlackLogo.png'
import AdminFooter from '../../../Components/admin/AdminFooter/AdminFooter'
import { toast } from 'react-toastify';
import { adminLogin } from '../../../api/admin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminlogin } from '../../../Redux/slice/adminAuthSlice';
import UseAdminProtectLogin from '../../../hook/admin/useAdminProtectLogin';


interface loginForm {
    userName:string;
    password:string
}

const AdminLogin:React.FC = () => {
    const redirect = UseAdminProtectLogin()  
    if(redirect)return redirect;

    const [formData,setFormdata] = useState<loginForm>({
        userName:'',
        password:''
    })
    const [error,setError]= useState<string|null>(null)

    

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleContinue = async()=>{
        try {
            const response = await adminLogin(formData)

            if(response.status===200){
                dispatch(adminlogin())
                navigate('/admin/')
            }
        } catch (error:any) {
            if(error.response.status===401){
                setError(error.response.data.message)
            }else{
                console.log(error);
            }
            
        }
    }

    useEffect(()=>{
        if(error){
            toast.error(error)
        }
    },[error])
  return (
    <div>
        <nav className='admin-navbar'>
            <img src={Logo} alt="" />
        </nav>
        <div className="admin-login-form"> 
            <div className="admin-form-head">
                <h2>Sign In </h2>
                <p>Enter your User Name to sign In for this app</p>
            </div>
            <div>
                <div className='form-input'>
                    <input type="text" name='userName' onChange={(e)=>setFormdata({...formData,userName:e.target.value})}  placeholder="Enter your User Name" />
                </div>
                <div className='form-input'>
                    <input type="password" name='password' onChange={(e)=>setFormdata({...formData,password:e.target.value})}  placeholder="Enter your password" />
                </div>
                <button className="admin-login-btn" onClick={handleContinue} >Continue</button>
            </div>
        </div>

        <AdminFooter/>
    </div>
  )
}

export default AdminLogin