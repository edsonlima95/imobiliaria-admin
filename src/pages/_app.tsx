import type { AppProps } from 'next/app'
import { NavMenuProvider } from '../contexts/NavMenuContext'
import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from '../contexts/UserContext'
import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.min.css'

function MyApp({ Component, pageProps }: AppProps) {



  return (
    <>
     
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UserContextProvider>
        <NavMenuProvider>
          <Component {...pageProps} />
        </NavMenuProvider>
      </UserContextProvider>
    </>
  )
}

export default MyApp
