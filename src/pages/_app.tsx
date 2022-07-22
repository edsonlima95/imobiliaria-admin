import type { AppProps } from 'next/app'
import { NavMenuProvider } from '../contexts/NavMenuContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <NavMenuProvider>
      <Component {...pageProps} />
    </NavMenuProvider>
  )
}

export default MyApp
