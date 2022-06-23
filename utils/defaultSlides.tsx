import Image from 'next/image'
import banner_1 from '../public/images/banner-1.png'
import banner_2 from '../public/images/banner-2.png'
import banner_3 from '../public/images/banner-3.png'

const default_slides:Array<React.ReactNode> = []
default_slides.push(<Image src={banner_1} alt="banner - 1" />)
default_slides.push(<Image src={banner_2} alt="banner - 2" />)
default_slides.push(<Image src={banner_3} alt="banner - 3" />)

export default default_slides