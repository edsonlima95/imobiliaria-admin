import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import Layout from "./Layout"

function Home() {

 
  return (
    <>
      <Layout>
        <h1 className="p-5">Home</h1>
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
