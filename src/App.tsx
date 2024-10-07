import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './Routes/UserRoutes'



function App() {
 
  return (
    <>
      <ToastContainer/>
      <UserRoutes/>
    </>
  )
}

export default App
