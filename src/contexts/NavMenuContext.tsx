import React, { createContext, useState } from "react";


type NavMenuContextProps = {

    isNavOpen: boolean,
    menuToggle: () => void

}

type NavMenuProviderProps = {
    children: React.ReactNode
}

export const NavMenuContext = createContext({} as NavMenuContextProps)



export function NavMenuProvider({ children }: NavMenuProviderProps) {

    const [isNavOpen, setIsNavOpen] = useState(true)


    function menuToggle() {
        setIsNavOpen(!isNavOpen)
    }

    return (
        <NavMenuContext.Provider value={{isNavOpen, menuToggle}}>
            {children}
        </NavMenuContext.Provider>
    )

}