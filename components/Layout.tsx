import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Header from './Header'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, selectUpdatingUser, selectUser } from '../redux/reducers/userReducer'
import SideBar from './SideBar'
import useWallet  from '../hooks/useWallet'
import SnackbarComponent from './SnackBar'
import Banner from './Banner'
import default_slides from '../utils/defaultSlides'
type LayoutProps = {
  children?: React.ReactNode
}

const Layout: React.FC = ({ children }: LayoutProps) => {
  const router = useRouter()
  const {
    address,
  } = useWallet()
  
  const [ menu, setMenu ] = useState('home')
  const updatingUser = useSelector(selectUpdatingUser)

  const [isBlur, setIsBlur] = useState<boolean>(false)
  const [currentSlides, setCurrentSlides] = useState(default_slides)
  const user = useSelector(selectUser)

  const [collectionMenu, setCollectionMenu] = useState<boolean>(false);
  
  const dispatch = useDispatch()

  useEffect(() => {
    if ( address != undefined && !updatingUser ) {
      dispatch(getUser(address) as any)
    }
  }, [address, updatingUser, dispatch])

  useEffect(() => {
    setCollectionMenu(false);
    if ( router.pathname.includes('/collections')) {
      setMenu('collections')
      if ( router.pathname == '/collections' ) {
        setCollectionMenu(true);
      }
    } else if ( router.pathname === '/analytics' ) {
      setMenu('analytics')
    } else if ( router.pathname === '/' ) {
      setMenu('home')
    } else{
      setMenu('others')
    }
  }, [router.pathname])

  useEffect(()=>{
    setIsBlur(address?false:true)
  }, [address])

  useEffect(() => {
    if ( menu === 'home' && user.banners && user.banners.length == 3 ) {
      const new_slides:Array<React.ReactNode> = []
      new_slides.push(<img src={process.env.API_URL + user.banners[0]} alt="banner - 1" />)
      new_slides.push(<img src={process.env.API_URL + user.banners[1]} alt="banner - 2" />)
      new_slides.push(<img src={process.env.API_URL + user.banners[2]} alt="banner - 3" />)
      setCurrentSlides(new_slides)
    }
  }, [menu, user.banners])

  useEffect(() => {
    if ( menu === 'collections' ) {
      const new_slides:Array<React.ReactNode> = []
      new_slides.push(<img src='/images/banner-4.png' alt="banner - 1" />)
      new_slides.push(<img src='/images/banner-5.png' alt="banner - 2" />)
      new_slides.push(<img src='/images/banner-6.png' alt="banner - 3" />)
      setCurrentSlides(new_slides)
    } else if ( menu === 'home' ) {
      const new_slides:Array<React.ReactNode> = []
      if ( user.banners && user.banners.length == 3 ) {
        new_slides.push(<img src={process.env.API_URL + user.banners[0]} alt="banner - 1" />)
        new_slides.push(<img src={process.env.API_URL + user.banners[1]} alt="banner - 2" />)
        new_slides.push(<img src={process.env.API_URL + user.banners[2]} alt="banner - 3" />)
      } else {
        new_slides.push(<img src='/images/banner-1.png' alt="banner - 1" />)
        new_slides.push(<img src='/images/banner-2.png' alt="banner - 2" />)
        new_slides.push(<img src='/images/banner-3.png' alt="banner - 3" />)
      }
      setCurrentSlides(new_slides)
    }
  }, [menu])

  return (
    <>
      <Head>
        <title>Omni-X Marketplace</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <SnackbarComponent />
      <main className='w-full flex flex-col'>
        <SideBar />
        <Header menu={menu}/>
        <div className={menu==='home'||(menu==='collections'&&collectionMenu)?'':'hidden'}>
          <Banner slides={currentSlides} blur={isBlur} menu={menu} />
        </div>
        {children}
      </main>
    </>
  )
}

export default Layout