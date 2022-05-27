import Head from 'next/head'
import { useEffect, useState } from 'react'
// import MainNav from '../components/MainNav'
import Footer from './Footer'
// import Aos from 'aos'
// import 'aos/dist/aos.css'
import AdvancedONT from '../services/abis/AdvancedONT.json'

import { useActiveWeb3React } from '../hooks/useWeb3'
import { getContract } from '../utils/contracts.js'

import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { BigNumber, ethers } from 'ethers'
import { Web3Interface } from '../utils/utils'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Slide } from 'react-toastify'

const chains = [4, 97, 43113, 80001, 421611, 4002, 69]

const injected = new InjectedConnector({
  supportedChainIds: chains
})
const addresses = {
  '4': {
    address: '0xC8759D18D5c96cce77074249330b9b41A618e51A',
    image: '../static/logo/ethereum-eth-logo-1.svg',
    name: 'rinkeby',
    price: 0.05,
    chainId: '10001',
    unit: 'ETH'
  },
  '97': {
    address: '0xCB3041291724B893E8BB3E876aC8f250D475685D',
    image: '../static/logo/dbanner1_copy_4_1.svg',
    name: 'bscscan',
    price: 0.375,
    chainId: '10002',
    unit: 'BNB'
  },
  '43113': {
    address: '0xd88af13d0f204156BFad1680E1199EbEd0487A07',
    image: '../static/logo/dbanner1_copy_1.svg',
    name: 'FUJI',
    price: 2,
    chainId: '10006',
    unit: 'AVAX'
  },
  '80001': {
    address: '0x864BA3671B20c2fD3Fe90788189e52Ef6D98fb65',
    image: '../static/logo/dbanner1_copy_3_1.svg',
    name: 'Mumbai',
    price: 108,
    chainId: '10009',
    unit: 'MATIC'
  },
  '421611': {
    address: '0x900501b343e8975b0ec4f1439f355f0bf15c7b9f',
    image: '../static/logo/dbanner1_copy_2_1.svg',
    name: 'Arbitrum',
    price: 0.05,
    chainId: '10010',
    unit: 'ETH'
  },
  '4002': {
    address: '0x484F40fC64D43fF7eECA7Ca51a801dB28A0F105d',
    image: '../static/logo/fantom-ftm-logo-1.svg',
    name: 'Fantom',
    price: 130,
    chainId: '10012',
    unit: 'FTM'
  },
  '69': {
    address: '0x5464Af1E4a6AF705920eD1CD0f4cb10638A89FD8',
    image: '../static/logo/JtpX95Rt_400x400-1.svg',
    name: 'Kovan',
    price: 0.05,
    chainId: '10011',
    unit: 'ETH'
  }
}


export default function Web3Status() {
  const {chainId, activate, account, active, connector, error } = useWeb3React() as Web3Interface


  const [toChain, setToChain] = useState('4')
  const [netId, setNetId] = useState('4')

  const [ownTokenisLoading, setOwnTokenisLoading] = useState(true)
  const [isSwitching, setIsSwitching] = useState(false)

  const { library } = useActiveWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      errorToast('connect error')
    }
  }


  const loadingIcon = () => {
    return(
      <>
        <svg role='status' className='inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor'/>
          <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='#1C64F2'/>
        </svg>
      </>
    )
  }
  const errorToast = (error: any) =>{
    toast.error(error,{
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      transition: Slide
    })
  }

  useEffect(() => {
    if(!active) {
      connect()
    }
  }, [])

  return(
    <>
      {/* <MainNav setNetId={setNetId} netId={netId} addresses={addresses} /> */}

      <button id="connect-wallet" className='button-borders' onClick={connect} >
        <text>{('Connect to a wallet')}</text>
      </button>
    </>

  )

}
