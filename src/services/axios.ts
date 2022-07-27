import Router from 'next/router';
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'

const token = getCookie("imobil.token")

export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: { Authorization: `Bearer ${token}` }
})

api.interceptors.response.use(response => {

    return response

}, (error) => {
    if (error.response.status === 401) {

        deleteCookie('imobil.token')
        deleteCookie('imobil.user_id')

        Router.push("/auth/login")
    }

    return Promise.reject(error)

})