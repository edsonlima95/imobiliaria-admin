import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { api } from "../services/axios"
import Layout from "./Layout"

function Home() {

  const { user } = useContext(UserContext)


  const [total, setTotal] = useState(0)
  const [sale, setSale] = useState(0)
  const [rent, setRent] = useState(0)

  useEffect(() => {

    api.get(`/imobils/count/${user?.id}`).then((response) => {

      const { total } = response.data
      const { sale } = response.data
      const { rent } = response.data

      setTotal(total)
      setRent(rent)
      setSale(sale)

    }).catch((error) => {
      console.log(error)
    });

  },)

  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row justify-around p-5 text-center md:text-start">
          <div className="mb-2 flex flex-col-reverse items-center lg:w-3/12 bg-white rounded shadow-md p-3">
            <div className="flex mx-5 flex-col">
              <p className="text-gray-600 text-xl font-bold ">Imóveis</p>
              <p className="text-gray-500">Cadastrados</p>
            </div>
            <span className="text-gray-400 font-bold italic text-6xl">{total}</span>
          </div>

          <div className="mb-2 flex flex-col-reverse items-center lg:w-3/12 bg-white rounded shadow-md p-3">
            <div className="flex mx-5 flex-col">
              <p className="text-gray-600 text-xl font-bold ">Imóveis</p>
              <p className="text-gray-500">Alugados</p>
            </div>
            <span className="text-gray-400 font-bold italic text-6xl">{rent}</span>
          </div>

          <div className="mb-2 flex  flex-col-reverse items-center lg:w-3/12 bg-white rounded shadow-md p-3">
            <div className="flex mx-5 flex-col">
              <p className="text-gray-600 text-xl font-bold ">Imóveis</p>
              <p className="text-gray-500">Vendidos</p>
            </div>
            <span className="text-gray-400 font-bold italic text-6xl">{sale}</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-[100px]  md:text-[150px] italic font-bold text-gray-200">
            Bem vindo
          </h1>
        </div>
      </Layout>
    </>
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
