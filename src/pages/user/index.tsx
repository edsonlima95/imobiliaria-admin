import { useContext, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../../components/Form/Input"
import { UserContext } from "../../contexts/UserContext"
import ErrorMessage from "../../components/Message"
import Label from "../../components/Form/Label"
import Layout from "../Layout"
import { api } from "../../services/axios"
import { toast } from "react-toastify"

type UserProps = {
    id?: number,
    name: string,
    email: string,
    file: [{}] | null,
    password?: string,
}

function Profile() {

    const { user, setProfile } = useContext(UserContext)
    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm<UserProps>()
    const form = useRef<HTMLFormElement>(null)

    if (user) {
        setValue("id", user.id)
        setValue("name", user.name as string)
        setValue("email", user?.email as string)
    }

    async function onSubmit() {

        const data = new FormData(form.current as HTMLFormElement)

        try {

            const response = await api.put(`/users/${user?.id}`, data)
            reset({
                file: null
            })

            setProfile(response.data.user)

            toast.success(response.data.message)
        } catch (err: any) {
            const { errors } = err.response.data

            for (const erro of errors) {
                toast.error(erro.message)
            }
        }
    }

    return (
        <Layout>
            <div className="flex justify-center p-5">
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className="bg-white mt-20 p-5 w-8/12 rounded my-4  flex flex-col items-center justify-center">

                    <div className="flex w-full gap-2">
                        <div className="mb-3 lg:w-full">
                            <Label title="Nome" label="name" />
                            <Input type="text" {...register('name')} id="title" placeholder="Digite o nome" />
                            <ErrorMessage error={errors.name?.message} />
                        </div>

                        <div className="mb-3 lg:w-full">
                            <Label title="Imagem" label="file" />
                            <Input type="file" {...register('file')} id="file" />
                            <ErrorMessage error={errors.file?.message} />
                        </div>

                    </div>
                    <div className="flex w-full gap-2">
                        <div className="mb-3 lg:w-full">
                            <Label title="E-mail" label="email" />
                            <Input type="text" {...register('email')} id="email" placeholder="Digite o email" />
                            <ErrorMessage error={errors.email?.message} />
                        </div>

                        <div className="mb-3 lg:w-full">
                            <Label title="Senha" label="password" />
                            <Input type="text" {...register('password')} id="password" placeholder="Digite a senha" />
                            <ErrorMessage error={errors.password?.message} />
                        </div>
                    </div>

                    <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2">{user?.id ? 'Atualizar' : 'Cadastrar'}</button>


                </form>
            </div>
        </Layout>
    )

}

export default Profile