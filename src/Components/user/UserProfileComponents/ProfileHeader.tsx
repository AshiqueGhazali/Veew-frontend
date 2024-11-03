import { ChevronDownIcon} from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { listType } from '../../../Pages/user/UserProfile/UserProfile'
  

interface headerProp {
    title:string
    listType:string
    setListType:(type:listType)=>void
}
const ProfileHeader:React.FC<headerProp> = ({title , setListType , listType}) => {
    const navigate = useNavigate()

    const handleButtonNavigation = ()=>{
        if(title==='Events'){
            navigate('/add-new-event')
        }else if(title==='Tickets'){
            navigate('/events')
        }
    }
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      {(title==='Events' || title === "Tickets") && <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="hidden sm:block">
          <button
            type="button"
            onClick={()=>setListType('EXPIRED')}
            className={`${listType==='EXPIRED' ? 'bg-[#937e54] hover:bg-[#bea980] text-white' : 'bg-white hover:bg-gray-50 text-gray-900'} inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300`}
          >
            Expired
          </button>
        </span>

        <span className="ml-3 hidden sm:block">
          <button
            type="button"
            onClick={()=>setListType('UPCOMING')}
            className={`${listType==='UPCOMING' ? 'bg-[#937e54] hover:bg-[#bea980] text-white' : 'bg-white hover:bg-gray-50 text-gray-900'} inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300`}
          >
            Upcoming
          </button>
        </span>

        <span className="sm:ml-3">
          <button
            type="button"
            onClick={handleButtonNavigation}
            className="inline-flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ADD NEW
          </button>
        </span>

        {/* Dropdown */}
        <Menu as="div" className="relative ml-3 sm:hidden">
          <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
            More
            <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <div
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                Edit
              </div>
            </MenuItem>
            <MenuItem>
              <div
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                View
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>}
    </div>
  )
}

export default ProfileHeader