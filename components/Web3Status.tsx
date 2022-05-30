// import Head from 'next/head'
// import { useEffect, useState } from 'react'

import { useActiveWeb3React } from '../hooks/useWeb3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Interface } from '../utils/utils'

import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'

export interface Web3StatusProps {
  addresses: any
  chains: number[]
}

export default function Web3Status({addresses, chains}: Web3StatusProps) {
  const {activate, active, chainId, account } = useActiveWeb3React() as Web3Interface

  const injected = new InjectedConnector({
    supportedChainIds: chains
  })

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      errorToast('connect error')
    }
  }

  const errorToast = (error: any) =>{
    toast.error(error,{
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      transition: Slide
    })
  }

  const handleConnect = () => { 
    if(!active) connect()
  }

  return(
    <>
      <button id="connect-wallet" className='button-borders' onClick={handleConnect} >
        <text>{active && account ? `${account}`  : 'Connect to a wallet'}</text>
      </button>
      {active && chainId ? (
        <div id="network" className='button-borders'>
          <text>{addresses[chainId].name ?? 'Wrong Network'}</text>
        </div>) 
        : (<>  </>)
      }
    </>
  )
}
 