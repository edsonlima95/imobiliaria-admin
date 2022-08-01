import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/Form/Input"
import { Select } from "../../../components/Form/Select"
import { Textarea } from "../../../components/Form/TextArea"
import { CheckBox } from "../../../components/Form/CheckBox"
import Layout from "../../Layout"
import BreadCrumb from "../../../components/Breadcrumb"
import Label from "../../../components/Form/Label"
import FieldSet from "../../../components/Form/FieldSet"
import ErrorMessage from "../../../components/Message"
import { api } from "../../../services/axios"
import { UserContext } from "../../../contexts/UserContext"
import { toast } from "react-toastify"

type Data = {
    id?: number,
    title: string,
    user_id: number,
    description: string,
    address: string,
    number: number,
    complement?: string,
    neighborhood: string,
    city: string,
    state: string,
    status: boolean,
    type: string,
    price: number,
    rental_price: number,
    file: [{}],

    area: number,
    garage: number,
    bedroom: number,
    bathroom: number,
    kitchen: number,
    living_room: number,
    dining_room: number,
    suites: number,

    pool: boolean,
    gym: boolean,
    closet: boolean,
    furnished_kitchen: boolean,
    backyard: boolean,
    garden: boolean,
    deck: boolean,
    american_kitchen: boolean,
    grill: boolean
}

function Create() {

    const router = useRouter()
    const { params } = router.query
    const form = useRef<HTMLFormElement>(null)

    const { user } = useContext(UserContext)
    const id = params?.[0] ? params[0] : undefined
    const { handleSubmit, register, control, setError, setValue, getValues, reset, formState: { errors } } = useForm<Data>()

    useEffect(() => {

        if (id) {

            //Busca os dados para atualizar
            api.get(`/imobils/${id}/edit`).then((response) => {

                const { imobil } = response.data

                setValue("id", imobil.id)
                setValue("title", imobil.title)
                setValue("description", imobil.description)
                setValue("address", imobil.address)
                setValue("number", imobil.number)
                setValue("complement", imobil.complement)
                setValue("city", imobil.city)
                setValue("state", imobil.state)
                setValue("neighborhood", imobil.neighborhood)

                setValue("status", imobil.status)
                setValue("type", imobil.type)
                setValue("price", imobil.price)
                setValue("rental_price", imobil.rental_price)

                setValue("area", imobil.area)
                setValue("garage", imobil.garage)
                setValue("bathroom", imobil.bathroom)
                setValue("bedroom", imobil.bedroom)
                setValue("kitchen", imobil.kitchen)
                setValue("living_room", imobil.living_room)
                setValue("dining_room", imobil.dining_room)
                setValue("suites", imobil.suites)

                setValue("pool", imobil.pool)
                setValue("gym", imobil.gym)
                setValue("closet", imobil.closet)
                setValue("furnished_kitchen", imobil.furnished_kitchen)
                setValue("american_kitchen", imobil.american_kitchen)
                setValue("backyard", imobil.backyard)
                setValue("garden", imobil.garden)
                setValue("deck", imobil.deck)
                setValue("grill", imobil.grill)

            }).catch((err) => {

                toast.error(err.response.data.message)

            })
        }

    }, [])

    async function onSubmit() {

        const data = new FormData(form.current as HTMLFormElement)

        if (data.get("id")) {
            update(data)
        } else {
            console.log(data.get("price"))
            // create(data)
        }

    }

    async function create(data: FormData) {

        try {
            await api.post("/imobils", data)

        } catch (err: any) {

            const { errors } = err.response.data

            for (const erro of errors) {
                setError(erro.field, { message: erro.message })
            }
        }

    }

    async function update(data: FormData) {

        try {

            const response = await api.put(`/imobils/${id}`, data)
            toast.success(response.data.message)

        } catch (err: any) {

            const { errors } = err.response.data

            for (const erro of errors) {
                setError(erro.field, { message: erro.message })
            }
        }

    }

    return (
        <Layout>
            <div className="p-5">
                <BreadCrumb title="Lista" link="imobil" active="Cadastro" />

                <form ref={form} onSubmit={handleSubmit(onSubmit)}>

                    <input type="hidden" name="user_id" value={user?.id} />
                    <input type="hidden"  {...register("id")} />

                    <FieldSet title="Dados do imóvel">

                        <div className="w-full flex gap-2">

                            {id && (<div className="mb-3 lg:w-2/12">
                                <Label title="Situação" label="status" />
                                <Select {...register('status')} id="status">
                                    <option value={`${true}`} >Disponível</option>
                                    <option value={`${false}`} >Não disponível</option>
                                </Select>
                                <ErrorMessage error={errors.type?.message} />
                            </div>)}


                            <div className="mb-3 lg:w-5/12">
                                <Label title="Titulo" label="title" />
                                <Input type="text" {...register('title')} id="title" placeholder="Digite o titulo" />
                                <ErrorMessage error={errors.title?.message} />
                            </div>

                            <div className="mb-3 lg:w-5/12">
                                <Label title="Imagem" label="file" />
                                <Input type="file" {...register('file')} id="file" />
                                <ErrorMessage error={errors.file?.message} />
                            </div>
                        </div>

                        <div className="mb-3 lg:w-full">
                            <Label title="Descrição" label="description" />
                            <Textarea {...register('description')} id="description" placeholder="Digite o titulo" />
                            <ErrorMessage error={errors.description?.message} />
                        </div>

                        <div className="w-full flex gap-2">
                            <div className="mb-3 lg:w-6/12">
                                <Label title="Tipo" label="type" />
                                <Select {...register('type')} id="type">
                                    <option value="rent">Alugar</option>
                                    <option value="sale">Comprar</option>
                                </Select>
                                <ErrorMessage error={errors.type?.message} />
                            </div>
                            <div className="mb-3 lg:w-6/12">
                                <Label title="Preço de venda" label="price" />
                                <Input type="text" {...register('price')} id="price" className="money" placeholder="Digite o preço de compra" />
                                <ErrorMessage error={errors.price?.message} />
                            </div>
                            <div className="mb-3 lg:w-6/12">
                                <Label title="Preço de locação" label="rental_price" />
                                <Input type="text" {...register('rental_price')} id="rental_price" placeholder="Digite o preço de locação" />
                                <ErrorMessage error={errors.rental_price?.message} />
                            </div>
                        </div>

                    </FieldSet>

                    <FieldSet title="Endereço do imóvel">

                        <div className="w-full flex gap-2">
                            <div className="mb-3 lg:w-5/12">
                                <Label title="Endereço" label="address" />
                                <Input type="text" {...register('address')} id="address" placeholder="Digite o endereço" />
                                <ErrorMessage error={errors.address?.message} />
                            </div>
                            <div className="mb-3 lg:w-5/12">
                                <Label title="Complemento" label="complement" />
                                <Input type="text" {...register('complement')} id="complement" placeholder="Digite o titulo" />
                                <ErrorMessage error={errors.complement?.message} />
                            </div>
                            <div className="mb-3 lg:w-2/12">
                                <Label title="Numero" label="number" />
                                <Input type="number" min={1} {...register('number')} id="number" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.number?.message} />
                            </div>
                        </div>

                        <div className="w-full flex gap-2">
                            <div className="mb-3 lg:w-4/12">
                                <Label title="Bairro" label="neighborhood" />
                                <Input type="text" {...register('neighborhood')} id="neighborhood" placeholder="Digite o bairro" />
                                <ErrorMessage error={errors.neighborhood?.message} />
                            </div>
                            <div className="mb-3 lg:w-4/12">
                                <Label title="Cidade" label="city" />
                                <Input type="text" {...register('city')} id="city" placeholder="Digite a cidade" />
                                <ErrorMessage error={errors.city?.message} />
                            </div>

                            <div className="mb-3 lg:w-4/12">
                                <Label title="Estado" label="state" />
                                <Input type="text" {...register('state')} id="state" placeholder="Digite o estado" />
                                <ErrorMessage error={errors.state?.message} />
                            </div>
                        </div>

                    </FieldSet>

                    <FieldSet title="Partições do imóvel">
                        <div className="w-full flex gap-2">
                            <div className="mb-3 lg:w-3/12">
                                <Label title="Area m²" label="area" />
                                <Input type="number" min={1} {...register('area')} id="area" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.area?.message} />
                            </div>
                            <div className="mb-3 lg:w-3/12">
                                <Label title="Garagem" label="garage" />
                                <Input type="number" min={1} {...register('garage')} id="garage" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.garage?.message} />
                            </div>
                            <div className="mb-3 lg:w-3/12">
                                <Label title="Quartos" label="bedroom" />
                                <Input type="number" min={1} {...register('bedroom')} id="bedroom" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.bedroom?.message} />
                            </div>
                            <div className="mb-3 lg:w-3/12">
                                <Label title="Banheiro" label="bathroom" />
                                <Input type="number" min={1} {...register('bathroom')} id="bathroom" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.bathroom?.message} />
                            </div>
                        </div>
                        <div className="w-full flex gap-2">
                            <div className="mb-3 lg:w-3/12">
                                <Label title="Cozinha" label="kitchen" />
                                <Input type="number" min={1} {...register('kitchen')} id="kitchen" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.kitchen?.message} />
                            </div>
                            <div className="mb-3 lg:w-3/12">
                                <Label title="sala de star" label="living_room" />
                                <Input type="number" min={1} {...register('living_room')} id="living_room" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.living_room?.message} />
                            </div>
                            <div className="mb-3 lg:w-3/12">
                                <Label title="Sala de jantar" label="dining_room" />
                                <Input type="number" min={1} {...register('dining_room')} id="dining_room" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.dining_room?.message} />
                            </div>
                            <div className="mb-3 lg:w-3/12">
                                <Label title="Suites" label="suites" />
                                <Input type="number" min={1} {...register('suites')} id="suites" placeholder="Digite o numero" />
                                <ErrorMessage error={errors.suites?.message} />
                            </div>
                        </div>
                    </FieldSet>

                    <FieldSet title="Atributos do imóvel">
                        <div className="flex justify-between">

                            <div className="form-check form-check-inline">
                                <CheckBox title="Psicina" {...register('pool')} label="pool" />
                            </div>
                            <div className="form-check form-check-inline">
                                <CheckBox title="Academia" {...register('gym')} label="gym" />
                            </div>
                            <div className="form-check form-check-inline">
                                <CheckBox title="Armário" {...register('closet')} label="closet" />
                            </div>
                            <div className="form-check form-check-inline">
                                <CheckBox title="Cozinha mobiliada" {...register('furnished_kitchen')} label="furnished_kitchen" />
                            </div>
                            <div className="form-check form-check-inline">
                                <CheckBox title="Quintal" {...register('backyard')} label="backyard" />
                            </div>
                            <div className="form-check form-check-inline">
                                <CheckBox title="Jardim" {...register('garden')} label="garden" />
                            </div>
                            <div className="form-check form-check-inline">
                                <CheckBox title="Deca" {...register('deck')} label="deck" />
                            </div>
                            <div className="form-check form-check-inline">
                                <CheckBox title="Cozinha americana" {...register('american_kitchen')} label="american_kitchen" />
                            </div>
                            <div className="form-check form-check-inline">
                                <CheckBox title="Churrasqueira" {...register('grill')} label="grill" />
                            </div>
                        </div>
                    </FieldSet>

                    <button type="submit">Enviar</button>
                </form>

            </div>
        </Layout>
    )

}
export const getServerSideProps: GetServerSideProps = async (cxt) => {

    const token = getCookie("imobil.token", cxt)

    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default Create