import { getCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/axios";


type UserProps = {
    id: number,
    name: string,
    cover?: string,
    email: string,
}

type UserContextProps = {
    user: UserProps | undefined,
    setProfile: (user: UserProps) => Promise<void>,
}

type UserContextProviderProps = {
    children: React.ReactNode
}


export const UserContext = createContext({} as UserContextProps)


export function UserContextProvider({ children }: UserContextProviderProps) {

    
    const [user, setUser] = useState<UserProps | undefined>(undefined)


    async function setProfile(user: UserProps) {
        setUser(user)
    }

    return (
        <UserContext.Provider value={{ user, setProfile }}>
            {children}
        </UserContext.Provider>
    )

}