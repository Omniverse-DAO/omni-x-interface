import Head from 'next/head'
import MainNav  from '../components/MainNav'
import Footer from '../components/Footer'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useEffect } from 'react'


export default function Home() {

  return (
    <div className="main w-full overflow-hidden ">
      <Head>
        <title>Omniverse DAO</title>
        <meta name="description" content="A homepage for Omniverse DAO" />
        <link rel="icon" href="/static/favicon.ico" />
        
      </Head>
      <MainNav />

      <Footer />
    </div>
  )
}
