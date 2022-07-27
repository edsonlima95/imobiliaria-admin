import { useContext, useEffect } from "react"
import Aside from "../components/Aside"
import { NavMenuContext } from "../contexts/NavMenuContext"
import { List, Gear } from 'phosphor-react'
import Router from 'next/router'
import { getCookie } from "cookies-next"

type LayoutProps = {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {

    const { isNavOpen, menuToggle } = useContext(NavMenuContext)

    useEffect(() => {

    }, [])


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