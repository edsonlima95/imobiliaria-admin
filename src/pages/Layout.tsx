import { useContext, useEffect } from "react"
import { NavMenuContext } from "../contexts/NavMenuContext"
import { api } from "../services/axios"
import { getCookie, removeCookies } from "cookies-next"
import { List, SignOut } from 'phosphor-react'
import { UserContext } from "../contexts/UserContext"
import Aside from "../components/Aside"

type LayoutProps = {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {

    const { isNavOpen, menuToggle } = useContext(NavMenuContext)

    const { setProfile } = useContext(UserContext)

    const token = getCookie("imobil.token")
    const id = getCookie("imobil.user_id")

    useEffect(() => {

        checkToken()

        if (token) {
            getPorfile()
        }

    }, [])

    async function checkToken() {
        await api.get("/auth/checkToken")
    }

    async function getPorfile() {
        const response = await api.get(`/users?user_id=${id}`)
        const { user } = response.data
        setProfile(user)
    }

    function logout() {
        removeCookies("")
    }

    return (

        <>
            <Aside />
            <header className={`fixed right-0 w-full lg:w-10/12 duration-700 px-5 py-5 shadow-lg z-20 bg-white`}>
                <div className="flex items-center justify-between h-6">
                    <List size={32} className="lg:hidden block cursor-pointer" onClick={menuToggle} />
                </div>
            </header>
            <main className={`ml-auto w-full lg:w-[81%] duration-700 `}>
                <section className="relative top-14 z-10 overflow-auto">
                    {children}
                </section>
            </main>
        </>
    )

}

export default Layout