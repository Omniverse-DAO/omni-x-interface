import {Carousel} from '3d-react-carousal'
import classNames from '../helpers/classNames'
import banner_1 from '../public/images/banner-1.png'
import banner_2 from '../public/images/banner-2.png'
import banner_3 from '../public/images/banner-3.png'
import Image from 'next/image'

const slides:Array<React.ReactNode> = []
slides.push(<Image src={banner_1} alt="banner - 1" />)
slides.push(<Image src={banner_2} alt="banner - 2" />)
slides.push(<Image src={banner_3} alt="banner - 3" />)

type BannerProps = {
  hidden: boolean
}

const Banner = ({ hidden }: BannerProps) : JSX.Element => {
  return (
    <>
      <div className={
        classNames(
          'w-full',
          'lg:mx-20',
          'mt-40',
          hidden?'hidden':''
        )}>
        <Carousel slides={slides} autoplay={true} interval={3000}/>
      </div>
    </>
  )
}

export default Banner