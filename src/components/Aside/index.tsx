import { List, Gear, House } from 'phosphor-react'
import { useContext } from 'react'
import { NavMenuContext } from '../../contexts/NavMenuContext'



function Aside(){

    const { isNavOpen } = useContext(NavMenuContext)

    return (
        <aside className={`w-[19%] ${isNavOpen ? 'left-0' : '-left-[19%]'} duration-700 bg-gray-800 fixed h-screen`}>
          <div className="flex items-center w-full h-16 border-b border-gray-600">
            <div className="relative w-2/12 mx-5">
              <img className="w-10 h-9 rounded-full" src="/images/avatar5.png" alt="" />
              <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
            <p className='text-white font-bold'>Edson Lima</p>
          </div>
          <nav className='h-full mt-5'>
            <ul>
              <li>
                <button type="button" className="flex items-center p-2 w-full text-base font-normal text-white transition duration-75 group hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <House size={24} />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Imoveis</span>
                  <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <ul id="dropdown-example" className="hidden py-2 space-y-2">
                  <li>
                    <a className="flex items-center p-2 pl-11 w-full text-base font-normal text-white transition duration-75 group hover:bg-gray-900">Products</a>
                  </li>
                  <li>
                    <a className="flex items-center p-2 pl-11 w-full text-base font-normal text-white transition duration-75 group hover:bg-gray-900">Billing</a>
                  </li>
                  <li>
                    <a className="flex items-center p-2 pl-11 w-full text-base font-normal text-white transition duration-75 group hover:bg-gray-900">Invoice</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-base font-normal text-white hover:bg-gray-700">
                  <House size={24} />
                  <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
    )

}

export default Aside