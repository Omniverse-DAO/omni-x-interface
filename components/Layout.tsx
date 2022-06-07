import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from './Header'
import { useRouter } from 'next/router'
import Banner from './Banner'
import SideBar from './SideBar'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout: React.FC = ({ children }: LayoutProps) => {
  const router = useRouter()

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

  return (
    <>
      <Head>
        <title>Omni-X Marketplace</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <main className='w-full flex'>
        <SideBar />
        <Header menu={menu} />
        <Banner hidden={menu=='home'?false:true} />
        {children}
      </main>
    </>
  )
}

export default Layout