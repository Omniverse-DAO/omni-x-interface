import { useCallback } from 'react'
import Head from 'next/head'
import ConnectButton from './ConnectButton'
import useWallet from '../hooks/useWallet'

const Layout: React.FC = ({ children }) => {
    
    const {
        connect: connectWallet,
        disconnect: disconnectWallet,
    } = useWallet()

    const handleConnect = useCallback(async () => {
        await connectWallet()
      }, [connectWallet])

    return (
        <>
            <Head>
                <title>Omni-X Marketplace</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <div className='w-full flex'>
                <ConnectButton onConnect={handleConnect} />
            </div>
            {children}
        </>
    )
}

export default Layout