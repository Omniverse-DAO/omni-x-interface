import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from './Header'
import { useRouter } from 'next/router'
import Banner from './Banner'
import SideBar from './SideBar'

import banner_1 from '../public/images/banner-1.png'
import banner_2 from '../public/images/banner-2.png'
import banner_3 from '../public/images/banner-3.png'
import banner_4 from '../public/images/banner-4.png'
import banner_5 from '../public/images/banner-5.png'
import banner_6 from '../public/images/banner-6.png'
import Image from 'next/image'

type LayoutProps = {
  children?: React.ReactNode
}

const firstSlides:Array<React.ReactNode> = []
firstSlides.push(<Image src={banner_1} alt="banner - 1" />)
firstSlides.push(<Image src={banner_2} alt="banner - 2" />)
firstSlides.push(<Image src={banner_3} alt="banner - 3" />)

const secondSlides:Array<React.ReactNode> = []
secondSlides.push(<Image src={banner_4} alt="banner - 4" />)
secondSlides.push(<Image src={banner_5} alt="banner - 5" />)
secondSlides.push(<Image src={banner_6} alt="banner - 6" />)

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
      <main className='w-full flex flex-col'>
        <SideBar />
        <Header menu={menu} />
        <Banner hidden={false} slides={menu==='home'?firstSlides:secondSlides} />
        {children}
      </main>
    </>
  )
}

export default Layout