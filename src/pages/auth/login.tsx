import {  useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { api } from "../../services/axios"
import { toast } from 'react-toastify'
import Router from 'next/router'
import { GetServerSideProps } from "next"
import { getCookie, setCookie } from "cookies-next"
import { UserContext } from "../../contexts/UserContext"

type Data = {
    name: string,
    email: string,
    password: string
}


function Login() {

    const [isLogin, setIsLogin] = useState(false)
    const {getProfile} = useContext(UserContext)

    const { handleSubmit, reset, register, formState: { errors } } = useForm<Data>()


    async function onSubmit(data: Data) {

        if (isLogin) {

            signIn(data)
        } else {

            login(data,)
        }

    }

    async function signIn(data: Data) {
        try {
            await api.post("/auth/signIn", data)

            Router.push("/auth/login")

        } catch (e) {

            const { errors } = e.response?.data

            for (const item of errors) {
                toast.error(item.message)
            }

        }
    }

    async function login(data: Data) {
        try {
            const response = await api.post("/auth/login", data)
            
            const { user } = response.data
            const { token } = response.data

            setCookie("imobil.token",token, {
                maxAge: 600 * 60 * 24 * 30,//30dias
                path: "/"
            })
            setCookie("imobil.user_id",user.id, {
                maxAge: 600 * 60 * 24 * 30,//30dias
                path: "/"
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            getProfile(user.id)

            Router.push("/")

        } catch (e) {

            const { errors } = e.response?.data

            for (const item of errors) {
                console.log(item.field)
                toast.error(item.message)
            }

            toast.error(e.response?.data.message)
        }
    }

    function signOrLogin() {
        reset({ name: "" })
        reset({ email: "" })
        reset({ password: "" })
        setIsLogin(!isLogin)
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">

            <form onSubmit={handleSubmit(onSubmit)} className="w-3/12 bg-white rounded-lg p-5 shadow-lg" noValidate>
                <h1 className="mb-5 text-center text-3xl font-bold text-gray-700">Cadastre-se</h1>

                {isLogin && (
                    <div>
                        <input type="text" className="w-full px-3 mb-4 rounded-lg h-12 border-gray-300 border-2" {...register("name")} placeholder="Digite seu nome" />
                    </div>
                )}

                <div>
                    <input type="email" className="w-full px-3 mb-4 rounded-lg h-12 border-gray-300 border-2" {...register("email")} placeholder="Digite seu e-mail" />
                </div>
                <div>
                    <input type="password" className="w-full px-3 mb-4 rounded-lg h-12 border-gray-300 border-2" {...register("password")} placeholder="Digite uma senha" />
                </div>
                <span className="underline cursor-pointer text-gray-800 mb-4 block" onClick={signOrLogin}>{!isLogin ? 'Cadastre-se' : 'Logar'}</span>
                <button type="submit" className="w-full bg-green-600 h-12 rounded-lg text-white text-lg font-bold uppercase">Cadastrar</button>
            </form>
        </div>
    )

}

export const getServerSideProps: GetServerSideProps = async (cxt) => {

    const token = getCookie("imobil.token",cxt)

    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default Login