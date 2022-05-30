import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Web3Status from './Web3Status'
import { useActiveWeb3React } from '../hooks/useWeb3'
// import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Interface } from '../utils/utils'

// export interface MainNavProps {
//   setNetId: any
//   netId: any
//   addresses: any
// }

const chains = [4, 97, 43113, 80001, 421611, 4002, 69]

const addresses: any = {
  '4': {
    address: '0xC8759D18D5c96cce77074249330b9b41A618e51A',
    image: '../static/logo/ethereum-eth-logo-1.svg',
    name: 'rinkeby',
    chainId: '10001',
    unit: 'ETH'
  },
  '97': {
    address: '0xCB3041291724B893E8BB3E876aC8f250D475685D',
    image: '../static/logo/dbanner1_copy_4_1.svg',
    name: 'bscscan',
    chainId: '10002',
    unit: 'BNB'
  },
  '43113': {
    address: '0xd88af13d0f204156BFad1680E1199EbEd0487A07',
    image: '../static/logo/dbanner1_copy_1.svg',
    name: 'FUJI',
    chainId: '10006',
    unit: 'AVAX'
  },
  '80001': {
    address: '0x864BA3671B20c2fD3Fe90788189e52Ef6D98fb65',
    image: '../static/logo/dbanner1_copy_3_1.svg',
    name: 'Mumbai',
    chainId: '10009',
    unit: 'MATIC'
  },
  '421611': {
    address: '0x900501b343e8975b0ec4f1439f355f0bf15c7b9f',
    image: '../static/logo/dbanner1_copy_2_1.svg',
    name: 'Arbitrum',
    chainId: '10010',
    unit: 'ETH'
  },
  '4002': {
    address: '0x484F40fC64D43fF7eECA7Ca51a801dB28A0F105d',
    image: '../static/logo/fantom-ftm-logo-1.svg',
    name: 'Fantom',
    chainId: '10012',
    unit: 'FTM'
  },
  '69': {
    address: '0x5464Af1E4a6AF705920eD1CD0f4cb10638A89FD8',
    image: '../static/logo/JtpX95Rt_400x400-1.svg',
    name: 'Kovan',
    chainId: '10011',
    unit: 'ETH'
  }
}

const MainNav = () => {
  const {active, chainId, account } = useActiveWeb3React() as Web3Interface
  const [netId, setNetId] = useState('4')

  const router = useRouter()
  const [show, setShow] = useState(false)

  const keys = Object.keys(addresses)

  const toggleModal = () => setShow(!show)
  const selectItem = (item: any) => {
    setNetId(item)
    toggleModal()
  }

  useEffect(() => {
    if(active && account) setNetId(chainId)
  }, [chainId])

  return(
    <div className='mainnavcorner h-[80px] abel z-10'>
      <div className='mainnav relative'>
        <div className='button-borders'>
          <button className='primary-button' onClick={() => router.push('/')}>HOME</button>
        </div>
        <div className='button-borders'>
          <button className='primary-button' onClick={() => router.push('/explore')}>EXPLORE</button>
        </div>

        <Web3Status addresses={addresses} chains={chains} />

        <div className='absolute flex w-[50px] right-[10px] top-[70px] sm:top-[0px]  h-full'>
          <button onClick={toggleModal} className="text-white rounded-lg text-sm text-center inline-flex items-center">
            {
              netId && (addresses[netId] && <img src={addresses[netId].image} className='w-[50px]' />)
            }
          </button>

          {
            show &&
            <div id="dropdownBottom" className="z-10 w-44 absolute top-[80px]">
              <ul className="" aria-labelledby="dropdownBottomButton">
                {
                  keys.map(item => (
                    <li key={item} onClick={() => selectItem(item)} className="h-[70px] flex items-center">
                      <a href="#" className="block">
                        <img className="w-[50px]" src={addresses[item].image} />
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MainNav