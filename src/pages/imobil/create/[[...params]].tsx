import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "../../../components/Form/Input"
import { Select } from "../../../components/Form/Select"
import { Textarea } from "../../../components/Form/TextArea"
import { CheckBox } from "../../../components/Form/CheckBox"
import { api } from "../../../services/axios"
import { UserContext } from "../../../contexts/UserContext"
import { toast } from "react-toastify"
import { currency } from '../../../helpers/maskInputCurrency'
import { formatCurrency, formatPtBr } from "../../../helpers/formatNumber"
import Layout from "../../Layout"
import BreadCrumb from "../../../components/Breadcrumb"
import Label from "../../../components/Form/Label"
import FieldSet from "../../../components/Form/FieldSet"
import ErrorMessage from "../../../components/Message"
import { Imobilreducer } from "../../../store/reducer"

type Data = {
    id?: number,
    title: string,
    user_id: number,
    category_id: number,
    description: string,
    address: string,
    number: number | null,
    complement?: string,
    neighborhood: string,
    city: string,
    state: string,
    status: boolean,
    type: string,
    price: string | null,
    rental_price: string | null,
    file: [{}] | null,

    area: number | null,
    garage: number | null,
    bedroom: number | null,
    bathroom: number | null,
    kitchen: number | null,
    living_room: number | null,
    dining_room: number | null,
    suites: number | null,

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

type Category = {
    id: number,
    title: string,
}



function Create() {

    const initialState = {
        imobil: null
    }

    const router = useRouter()
    const { params } = router.query
    const form = useRef<HTMLFormElement>(null)

    const [categories, setCategories] = useState<Category[]>()

    const { user } = useContext(UserContext)
    const id = params?.[0] ? params[0] : undefined
    const { handleSubmit, register, control, setError, setValue, reset, formState: { errors } } = useForm<Data>()



    useEffect(() => {

        getCategories()
        resetFields()

        if (id) {

            //Busca os dados para atualizar
            api.get(`/imobils/${id}/edit`).then((response) => {

                const { imobil } = response.data

                setValue("id", imobil.id)
                setValue("title", imobil.title)
                setValue("category_id", imobil.category_id)
                setValue("description", imobil.description)
                setValue("address", imobil.address)
                setValue("number", imobil.number)
                setValue("complement", imobil.complement)
                setValue("city", imobil.city)
                setValue("state", imobil.state)
                setValue("neighborhood", imobil.neighborhood)

                setValue("status", imobil.status)
                setValue("type", imobil.type)
                setValue("price", formatPtBr(imobil.price))
                setValue("rental_price", formatPtBr(imobil.rental_price))

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

        /**
         * Limpa os campos após mudar a rota, ou seja se o usuário estiver no formulario
         * de edição com os campos setos se nao limpar os campos ao mudar a rota para criar
         * os campos permaneceram com os valores vindo la da edição no formulario
         */
    }, [router.query.params])

    async function onSubmit(teste: Data) {

        const data = new FormData(form.current as HTMLFormElement)

        data.set("price", formatCurrency(teste.price as string))
        data.set("rental_price", formatCurrency(teste.rental_price as string))

        if (data.get("id")) {
            update(data)
        } else {
            create(data)
        }

    }

    async function create(data: FormData) {

        try {
            const response = await api.post("/imobils", data)
            toast.success(response.data.message)
            resetFields()
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

    async function getCategories() {
        api.get("/categories").then((response) => {
            setCategories(response.data.categories)
        }).catch((err) => {
            console.log(err)
        });
    }

    //Forma o campo preço
    function setPrice(e: React.ChangeEvent<HTMLInputElement>) {
        setValue('price', e.target.value)
    }

    //Formata o campo preço de locação
    function setRentalPrice(e: React.ChangeEvent<HTMLInputElement>) {
        setValue('rental_price', e.target.value)
    }

    //Reseta os campos
    function resetFields() {
        reset({
            title: "",
            user_id: undefined,
            description: "",
            address: "",
            number: null,
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            status: false,
            type: "",
            price: null,
            rental_price: null,
            file: null,
            area: null,
            garage: null,
            bedroom: null,
            bathroom: null,
            kitchen: null,
            living_room: null,
            dining_room: null,
            suites: null,
            pool: false,
            gym: false,
            closet: false,
            furnished_kitchen: false,
            backyard: false,
            garden: false,
            deck: false,
            american_kitchen: false,
            grill: false
        })
    }

    return (
        <Layout>

            <div className="p-5">
                <BreadCrumb title="Lista" link="imobil" active="Cadastro" />

                <form ref={form} onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 rounded my-4">

                    <input type="hidden" name="user_id" value={user?.id} />
                    <input type="hidden"  {...register("id")} />

                    <FieldSet title="Dados do imóvel">

                        <div className="w-full flex gap-2">

                            {id && (<div className="mb-3 lg:w-2/12">
                                <Label title="Situação" label="status" />
                                <Select {...register('status')} id="status">
                                    <option value={`${false}`} >Disponível</option>
                                    <option value={`${true}`} >Não disponível</option>
                                </Select>
                                <ErrorMessage error={errors.type?.message} />
                            </div>)}

                            <div className="mb-3 lg:w-3/12">
                                <Label title="Categoria" label="category_id" />
                                <Select {...register('category_id')} id="category_id">
                                    <option selected disabled>Selecione a categoria</option>
                                    {categories?.map(category => (
                                        <>
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        </>
                                    ))}
                                </Select>
                                <ErrorMessage error={errors.category_id?.message} />
                            </div>

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
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => <Input type="text" {...register("price")} onChange={(e) => setPrice(currency(e))} id="price" placeholder="Digite o preço de compra" />}
                                />

                                <ErrorMessage error={errors.price?.message} />
                            </div>
                            <div className="mb-3 lg:w-6/12">
                                <Label title="Preço de locação" label="rental_price" />
                                <Controller
                                    name="rental_price"
                                    control={control}
                                    render={({ field }) => <Input type="text" {...register("rental_price")} onChange={(e) => setRentalPrice(currency(e))} id="rental_price" placeholder="Digite o preço de compra" />}
                                />

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
                    <div className="flex justify-end mt-5">
                        <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2">{id ? 'Atualizar' : 'Cadastrar'}</button>
                    </div>

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