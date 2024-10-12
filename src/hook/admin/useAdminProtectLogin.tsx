import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store/store';
import { Navigate} from 'react-router-dom';

const UseAdminProtectLogin = () => {
    const adminStatus = useSelector((state:RootState)=>state.admin.Admin.status)
    const prevRoute = localStorage.getItem("prevRoute") || "/";    

    if (adminStatus) {
        return <Navigate to={prevRoute} replace />; 
    }

    return null;
}

export default UseAdminProtectLogin