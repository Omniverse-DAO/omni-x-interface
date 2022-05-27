import React from 'react'
import { useRouter } from 'next/router'
import Web3Status from './Web3Status'

const Nav = () => {
  const router = useRouter()

  return(
    <div className='mainnavcorner h-[80px] abel z-10'>
      <div className='mainnav relative'>
        <div className='button-borders'>
          <button className='primary-button' onClick={() => router.push('/')}>OMNIVERSE</button>
        </div>
        <div className='button-borders'>
          <button className='primary-button' onClick={() => router.push('/explore')}>EXPLORE</button>
        </div>
        
        <Web3Status />
        
        <div className='absolute flex w-[50px] right-[10px] h-full'>
        </div>
      </div>
    </div>
  )
}

export default Nav