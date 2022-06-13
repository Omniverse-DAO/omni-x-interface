import type { NextPage } from 'next'
// import Avatar from '../public/images/avatar.png'
import Tabs from '../components/Tabs'


const Home: NextPage = () => {
  return (
    <>
      <div className=''>
        {/* <Image src={Avatar} alt='avatar' /> */}
        <Tabs />
        
      </div>
    </>
  )
}

export default Home
