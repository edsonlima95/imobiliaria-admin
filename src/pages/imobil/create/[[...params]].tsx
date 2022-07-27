import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import Layout from "../../Layout"
import Router, { useRouter } from 'next/router'
import { useEffect } from "react"
import BreadCrumb from "../../../components/Breadcrumb"

function Create() {
    const router = useRouter()
    const { params } = router.query


    useEffect(() => {

        if (params?.[0]) {

            const id = params[0]

            //Busca os dados para atualizar
        }

    }, [])

    return (
        <Layout>
            <div className="p-5">
                <BreadCrumb title="Lista" link="imobil" active="Cadastro" />
                <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">

                    <h2 id="accordion-flush-heading-2">
                        <button type="button" className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                            <span>Is there a Figma file available?</span>
                            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </h2>
                    <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
                        <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                            <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                        </div>
                    </div>

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

export default Create