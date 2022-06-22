import { Carousel } from '3d-react-carousal'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import classNames from '../helpers/classNames'
import Setting from '../public/images/setting.png'
import Twitter from '../public/images/twitter.png'
import Web from '../public/images/web.png'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/reducers/userReducer'

type BannerProps = {
  hidden: boolean
  slides: Array<React.ReactNode>
  blur: boolean
  menu: string
}

const Banner = ({ hidden, slides, blur, menu }: BannerProps): JSX.Element => {
  
  const user = useSelector(selectUser)
  const [avatarError, setAvatarError] = useState(false)

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
                <Image 
                  src={avatarError?'/images/default_avatar.png':(process.env.API_URL + user.avatar)} 
                  alt="avatar" 
                  onError={(e)=>{setAvatarError(true)}} 
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col ml-[18rem]">
                <div className="text-[26px] text-slate-800">{user.username}</div>
                <div className="text-[#6C757D] text-[16px] ml-3 mt-3">
                  {user.bio}
                </div>
              </div>
              <div className="flex ml-[]">
                <Link href="/user/edit">
                  <a>
                    <div className="mr-6">
                      <Image src={Setting} alt="avatar" />
                    </div>
                  </a>
                </Link>
                <Link href={user.twitter?user.twitter:''}>
                  <a>
                    <div className="mr-6">
                      <Image src={Twitter} alt='twitter' />
                    </div>
                  </a>
                </Link>
                <Link href={user.website?user.website:''}>
                  <a>
                    <div className="mr-6">
                      <Image src={Web} alt='website' />
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Banner
