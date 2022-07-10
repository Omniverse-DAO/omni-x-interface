import { useState, useEffect } from 'react'
import Link from 'next/link'
import headerStyle from '../styles/header.module.scss'
import classNames from '../helpers/classNames'
import Image from 'next/image'
import logo from '../public/images/logo.png'

type HeaderProps = {
  menu: string
}

type HoverType = {
  hoverMenu: string,
  isHover: boolean
}

const Header = ({ menu }: HeaderProps): JSX.Element => {
  const [isSearch, setSearch] = useState(false)
  const [hover, setHovering] = useState<HoverType>({
    hoverMenu: menu,
    isHover: false
  });

  const handleMouseOver = (hoverMenu: string) => {
    setHovering({
      hoverMenu: hoverMenu,
      isHover: true
    });
  };

  const handleMouseOut = () => {
    setHovering({
      hoverMenu: '',
      isHover: false
    });
  };
  return (
    <>
      <nav className={
        classNames(
          'bg-[#F8F9FA]',
          'border-gray-200',
          'px-2',
          'sm:px-4',
          'py-0',
          'rounded',
          'dark:bg-gray-800',
          'z-20',
          'fixed',
          'w-full',
        )}
      >
        <div className='flex flex-wrap items-start'>
          {
            !isSearch && 
            <button
              onClick={() => setSearch(true)}
              className='flex items-center'>
              <Image
                src={logo}
                className='mr-3'
                alt="logo"
              />
            </button>
          }
          {
            isSearch && 
            <input autoFocus type="text" placeholder='Acquire Your Desires' className="flex items-center bg-[#F8F9FA] bg-[url('../public/images/search.png')] w-[472px] h-[88px] border-0 focus:outline-0 focus:shadow-none focus:ring-offset-0 focus:ring-0 px-[85px]" onBlur={() => setSearch(false)}/>
          }  

          <div className='hidden justify-between items-center w-full md:flex md:w-auto mx-auto md:order-2' id='mobile-menu-3'>
            <ul className="flex flex-col md:flex-row md:space-x-8 md:text-sm md:font-medium" >
              <li onMouseOver={() => handleMouseOver('home')} onMouseOut={handleMouseOut}>
                <Link href='/'>
                  <a> 
                    <div className="w-[219px] h-[90px] bg-no-repeat bg-center" style={{backgroundImage: `url('/navbar/home${menu == 'home' ? '_active' : (hover.isHover && hover.hoverMenu == 'home' ? '_hover' : '')}.svg')`}}>
                      <div className="relative top-full text-center">
                        <span className={`px-10 py-2 text-lg bg-[#f1f1f1] rounded-[25px] ${hover.isHover && hover.hoverMenu == 'home'?'text-[#1E1C21] font-bold':'text-[#ADB5BD]'} ${hover.isHover && hover.hoverMenu != menu?'':'hidden'}`} >HOME</span>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
              <li onMouseOver={() => handleMouseOver('collections')} onMouseOut={handleMouseOut}>
                <Link href='/collections'>
                  <a>
                    <div className="w-[219px] h-[90px] bg-no-repeat bg-center" style={{backgroundImage: `url('/navbar/collections${menu == 'collections' ? '_active' : (hover.isHover && hover.hoverMenu == 'collections' ? '_hover' : '')}.svg')`}}>
                      <div className="relative top-full text-center">
                        <span className={`px-10 py-2 text-lg bg-[#f1f1f1] rounded-[25px] ${hover.isHover && hover.hoverMenu == 'collections'?'text-[#1E1C21] font-bold':'text-[#ADB5BD]'} ${hover.isHover && hover.hoverMenu != menu?'':'hidden'}`} >MARKET</span>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
              <li onMouseOver={() => handleMouseOver('analytics')} onMouseOut={handleMouseOut}>
                {/* <Link href='/analytics'> */}
                <a>
                  <div className="w-[219px] h-[90px] bg-no-repeat bg-center" style={{backgroundImage: `url('/navbar/analytics${menu == 'analytics' ? '_active' : (hover.isHover && hover.hoverMenu == 'analytics' ? '_hover' : '')}.svg')`}}>
                    <div className="relative top-full text-center">
                      <span className={`px-10 py-2 text-lg bg-[#f1f1f1] rounded-[25px] ${hover.isHover && hover.hoverMenu == 'analytics'?'text-[#1E1C21] font-bold':'text-[#ADB5BD]'} ${hover.isHover && hover.hoverMenu != menu?'':'hidden'}`} >ANALYTICS</span>
                    </div>
                  </div>
                </a>
                {/* </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header