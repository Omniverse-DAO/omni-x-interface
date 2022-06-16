import React from 'react'
import type { NextPage } from 'next'
import MetaMaskConnect from '../components/MetaMaskConnect'
import Tabs from '../components/Tabs'
import { WalletProvider } from '../components/WalletProvider'
import useWallet  from '../hooks/useWallet'

const Home: NextPage = () => {
  const context = useWallet()
  const [isBlur, setIsBlur] = React.useState<boolean>(false)
  React.useEffect(()=>{
    setIsBlur(context.signer?false:true)
  }, [context.signer])
  return (
    <>
      <WalletProvider>
        <MetaMaskConnect onConnect={async ()=>{context.connect()}} context={context}/>
        <Tabs blur={isBlur}/>
      </WalletProvider>
    </>
  )
}

export default Home
