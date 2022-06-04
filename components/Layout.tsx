import { useCallback, useState, useEffect } from 'react'
import Head from 'next/head'
import useWallet from '../hooks/useWallet'
import Header from './Header'
import { useRouter } from 'next/router'
import Banner from './Banner'
import ConnectButton from './ConnectButton'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout: React.FC = ({ children }: LayoutProps) => {
  const router = useRouter()
  
  const {
    connect: connectWallet,
  } = useWallet()

  const [ menu, setMenu ] = useState('home')

  useEffect(() => {
    if ( router.pathname === '/market' ) {
      setMenu('market')
    } else if ( router.pathname === '/analytics' ) {
      setMenu('analytics')
    } else {
      setMenu('home')
    }
  }, [router.pathname])

  const handleConnect = useCallback(async () => {
    await connectWallet()
  }, [connectWallet])

  return (
    <>
      <Head>
        <title>Omni-X Marketplace</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <div className='w-full flex'>
        <Header menu={menu} />
        <Banner hidden={menu=='home'?false:true} />
        <ConnectButton onConnect={handleConnect} />
      </div>
      {children}
    </>
  )
}

export default Layout