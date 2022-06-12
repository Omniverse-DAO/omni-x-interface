import {Carousel} from '3d-react-carousal'
import React from 'react'
import classNames from '../helpers/classNames'



type BannerProps = {
  hidden: boolean,
  slides:Array<React.ReactNode>
}

const Banner = ({ hidden, slides }: BannerProps) : JSX.Element => {
  return (
    <>
      <div className={
        classNames(
          'w-full',
          'mt-40',
          hidden?'hidden':''
        )}>
        <Carousel slides={slides} autoplay={true} interval={3000}/>
      </div>
    </>
  )
}

export default Banner