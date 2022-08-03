import { useContext, useEffect } from "react"
import { NavMenuContext } from "../contexts/NavMenuContext"
import { List, Gear } from 'phosphor-react'
import { api } from "../services/axios"
import Aside from "../components/Aside"
import { getCookie } from "cookies-next"
import { UserContext } from "../contexts/UserContext"

type LayoutProps = {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {

    const { isNavOpen, menuToggle } = useContext(NavMenuContext)
    const { setProfile, user } = useContext(UserContext)

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

    return (

        <>
            <Aside />
            <main className={`ml-auto ${isNavOpen ? 'w-[81%]' : 'w-full'} duration-700 `}>
                <header className={`fixed ${isNavOpen ? 'w-[81%]' : 'w-full'} duration-700 px-5 py-3 shadow-lg z-20 bg-white`}>
                    <div className="flex justify-between">
                        <List size={32} className="cursor-pointer" onClick={menuToggle} />
                        <Gear size={32} />
                    </div>
                </header>
                <section className="relative top-14 z-10">
                    {children}
                </section>
            </main>
        </>
    )

}

export default Layout