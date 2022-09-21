import { removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import { CaretDown, DotsNine, House, ListDashes, PlusCircle, SignOut, User, X } from 'phosphor-react'
import { useContext } from 'react'
import { NavMenuContext } from '../../contexts/NavMenuContext'
import { UserContext } from '../../contexts/UserContext'
import Link from 'next/link'


function Aside() {

  const { isNavOpen, menuToggle } = useContext(NavMenuContext)
  const { user } = useContext(UserContext)

  const router = useRouter()

  function logout() {
    removeCookies("imobil.user_id")
    removeCookies("imobil.token")
    router.push("/auth/login")
  }

  return (

    <aside className={`-left-[300px] lg:left-0 lg:w-2/12 duration-700 bg-gray-800 fixed z-30 h-screen ${isNavOpen ? 'w-5/12 left-0 duration-700 z-10' : '-left-[300px] duration-1000 z-10'}`}>
      <div className="flex items-center w-full h-16 border-b border-gray-600">
        <div className="relative w-2/12 mx-5">
          {user?.cover ? (
            <img className="w-10 h-10 rounded-full" src={`${process.env.NEXT_PUBLIC_API_URL}/profile/${user?.cover}`} alt="" />
          ) : (
            <img className="w-10 h-10 rounded-full" src="/images/avatar.png" alt="" />
          )}
          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
        </div>
        <div className='text-white font-bold'>{user?.name} </div>
      </div>
      <div className="flex justify-end p-3">
        <X size={32} onClick={menuToggle} className="lg:hidden block text-white" />
      </div>
      <nav className='h-full mt-5 bg-gray-800'>

        <ul className="relative">

          <Link href="/">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer">
              <DotsNine size={20} className="mr-2" />
              <span className="text-lg">Início</span>
            </a>
          </Link>

          <li className="relative" id="sidenavEx1">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#imovel" aria-expanded="true" aria-controls="imovel">
              <House size={20} className="mr-2" />
              <span className="text-lg">Imoveis</span>
              <CaretDown size={20} className="ml-auto" />
            </a>
            <ul className="relative accordion-collapse collapse" id="imovel" aria-labelledby="sidenavEx1" data-bs-parent="#sidenavExample">
              <li className="relative">
                <Link href="/imobil/create"><a className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-gray-900 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark"><PlusCircle size={18} className="mr-1" /> Cadastrar</a></Link>
              </li>
              <li className="relative">
                <Link href="/imobil"><a className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-gray-900 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark"><ListDashes size={18} className="mr-1" /> Listar</a></Link>
              </li>

            </ul>
          </li>

          <li>
            <Link href="/user">
              <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer">
                <User size={20} className="mr-2" />
                <span className="text-lg">User</span>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/">
              <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer">
                <SignOut size={20} className="mr-2" />
                <span onClick={logout} className="text-lg">Sair</span>
              </a>
            </Link>
          </li>


        </ul>
      </nav>
    </aside>

  )

}

export default Aside