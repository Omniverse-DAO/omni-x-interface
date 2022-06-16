import { Carousel } from '3d-react-carousal'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import classNames from '../helpers/classNames'
import Avatar from '../public/images/avatar.png'
import Setting from '../public/images/setting.png'
import Twitter from '../public/images/twitter.png'
import Web from '../public/images/web.png'
type BannerProps = {
  hidden: boolean
  slides: Array<React.ReactNode>
  blur: boolean
  menu: string
}

const Banner = ({ hidden, slides, blur, menu }: BannerProps): JSX.Element => {
  return (
    <>
      <div
        className={classNames(
          'w-full',
          'mt-40',
          hidden ? 'hidden' : '',
          blur && menu ==='home'? 'blur-sm' : ''
        )}
      >
        <Carousel slides={slides} autoplay={true} interval={3000} />
        {menu === 'home' && (
          <div className="flex justify-center w-full ">
            <div className="flex justify-between justify-center fw-60 mt-5 relative">
              <div className="-top-[10rem] left-[5rem] absolute">
                <Image src={Avatar} width={200} height={200} alt="avatar" />
              </div>
              <div className="flex flex-col ml-[18rem]">
                <div className="text-[26px] text-slate-800">seaviva.eth</div>
                <div className="text-[#6C757D] text-[16px] ml-3 mt-3">
                  <div>livin de life one day at a time</div>
                  <div>skyrim 4 lyfe</div>
                </div>
              </div>
              <div className="flex ml-[]">
                <Link href="/user/edit">
                  <div className="mr-6">
                    <Image src={Setting} alt="avatar" />
                  </div>
                </Link>
                <div className="mr-3">
                  <Image src={Twitter} alt="avatar" />
                </div>
                <div>
                  <Image src={Web} alt="avatar" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Banner
