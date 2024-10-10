import React from 'react'
import './AdminDashboard.css'
import SideBar from '../../../Components/admin/SideBar/SideBar'
import AdminFooter from '../../../Components/admin/AdminFooter/AdminFooter'
import UseAdminRouteProtect from '../../../hook/admin/useAdminProtectRoute'


const AdminDashboard:React.FC = () => {
  UseAdminRouteProtect()

  return (
    <div className='dashboard'>
      <div className='admin-dashboard'>
          <SideBar/>
          <div className='dashboard-pages'>
            <div>
              <h2>Dashboard</h2>
            </div>
          </div>
      </div>
      <AdminFooter/>
    </div>
  )
}

export default AdminDashboard