import { useEffect, useState } from 'react'
import { getToken } from '../api/user';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { login } from '../Redux/slice/userAuthSlice';


export interface DecodedJwt{
  id:string;
  role: string;
  userName?:string;
  iat: number;
  exp: number;
}

function UserProtectRoutes() {

  const [status,setStatus]=useState<boolean>(false)
  const dispatch=useDispatch()
 
  const [loading,setIsLoading]=useState<boolean>(true)

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const response = await getToken();
        
        const data:DecodedJwt= response.data.decoded as DecodedJwt
        setIsLoading(true)
        if (response.data) {
            dispatch(login(data.id))
            setStatus(true)
        }
      }catch (error){
        console.log(error)
         setIsLoading(false)
         setStatus(false)
      }
    };
    checkAuth();
   

  },[]);

  
  if(loading && !status){
     return <div>loaidng...</div>
  }
  
  return status ?<Outlet/>:<Navigate to="/landing"/>;

}

export default UserProtectRoutes