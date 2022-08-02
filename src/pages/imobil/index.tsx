import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { Pencil, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination } from "../../components/Pagination";
import { api } from "../../services/axios";
import Layout from "../Layout";
import Link from "next/link";
import BreadCrumb from "../../components/Breadcrumb";

type ImobilProps = {
    id?: number,
    title: string,
    address: string,
    neighborhood: string,
    number: number,
    city: string,
    state: string,
}

type PaginatePoops = {
    total: number,
    current_page: number,
    per_page: number,
    first_page: number,
    last_page: number,
    onPageLink: (link: number) => void
}

function Home() {

    const [imobils, setImobils] = useState<ImobilProps>()
    const [paginate, setPaginate] = useState({} as PaginatePoops)

    const user_id = getCookie("imobil.user_id")

    useEffect(() => {


        api.get(`/imobils?page=1&user_id=${user_id}`).then(response => {
            const { data, meta } = response.data.imobils

            setImobils(data)
            setPaginate(meta)

        }).catch(error => {
            console.log(error)
        })

    }, [])

    async function link(link: number) {

        const response = await api.get(`/imobils?page=${link}&user_id=${user_id}`)
        const { data, meta } = response.data.imobils

        setImobils(data)
        setPaginate(meta)
    }

    async function destroy(id: number) {
        const response = await api.delete(`/imobils/${id}?page=${paginate.current_page}`)
        const { data, meta } = response.data.imobils

        setImobils(data)
        setPaginate(meta)

        toast.success(response.data.message)
    }

    return (
        <Layout>
            <div className="overflow-x-auto relative p-5">
                <BreadCrumb title="Cadastrar" link="imobil/create" active="Lista" />
                {imobils?.length > 0 ? (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    id
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Titulo
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Endereço
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Numero
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Bairro
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Cidade
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Estado
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {imobils?.map(imobil => (
                                <tr key={imobil.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-4 px-6">
                                        {imobil.id}
                                    </td>
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {imobil.title}
                                    </th>

                                    <td className="py-4 px-6">
                                        {imobil.address}
                                    </td>
                                    <td className="py-4 px-6">
                                        {imobil.number}
                                    </td>
                                    <td className="py-4 px-6">
                                        {imobil.neighborhood}
                                    </td>
                                    <td className="py-4 px-6">
                                        {imobil.city}
                                    </td>
                                    <td className="py-4 px-6">
                                        {imobil.state}
                                    </td>
                                    <td>
                                        <Link href={`/imobil/create/${imobil.id}`}><a type="button" className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-0 font-medium rounded-full text-sm px-1.5 py-1.5 mr-2 mb-2"><Pencil size={20} /></a></Link>
                                        <a type="button" onClick={() => destroy(imobil.id)} className="focus:outline-none text-white bg-red-500 hover:bg-red-600 cursor-pointer focus:ring-0 font-medium rounded-full text-sm px-1.5 py-1.5 mr-2 mb-2"><Trash size={20} /></a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                ) : (
                    <div className="mt-5 p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                        <span className="font-medium">Informação!</span> Ainda não existem imóveis cadastrados
                    </div>
                )}
                <div className="flex justify-end mt-3">
                    <Pagination
                        total={paginate.total}
                        current_page={paginate.current_page}
                        first_page={paginate.first_page}
                        last_page={paginate.last_page}
                        per_page={paginate.per_page}
                        onPageLink={link}
                    />
                </div>

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

export default Home