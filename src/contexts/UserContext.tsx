import { getCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/axios";


type UserProps = {
    id: number,
    name: string,
    email: string,
}

type UserContextProps = {
    user: UserProps | undefined,
    getProfile: (id: number) => Promise<void>
}

type UserContextProviderProps = {
    children: React.ReactNode
}


export const UserContext = createContext({} as UserContextProps)


export function UserContextProvider({ children }: UserContextProviderProps) {

    const token = getCookie("imobil.token")
    const id = getCookie("imobil.user_id")

    const [user, setUser] = useState<UserProps | undefined>(undefined)

    async function getProfile(id: number) {
        const response = await api.get(`/users?user_id=${id}`)
        const { user } = response.data
        setUser(user)
    }

    async function checkToken() {
       await api.get(`/auth/checkToken`)
    }

    useEffect(() => {
        if (token) {
            checkToken()
            getProfile(Number(id))
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, getProfile }}>
            {children}
        </UserContext.Provider>
    )

}