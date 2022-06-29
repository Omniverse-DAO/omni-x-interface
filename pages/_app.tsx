import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { wrapper } from '../redux/store'
import 'react-responsive-modal/styles.css'

const AppWithoutSSR = dynamic(() => import('../components/App'), {
  ssr: false,
})

function AppWrapper({ Component, pageProps }: AppProps) {
  return (
    <AppWithoutSSR>
      <Component {...pageProps} />
    </AppWithoutSSR>
  )
}

export default wrapper.withRedux(AppWrapper)
