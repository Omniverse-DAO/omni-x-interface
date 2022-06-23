import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { chain_list } from '../utils/utils'
import Round from '../public/images/round-refresh.png'
import eth from '../public/svgs/ethereum.svg'
import bsc from '../public/svgs/binance.svg'
import matic from '../public/svgs/polygon.svg'
import avalanche from '../public/svgs/avax.svg'
import fantom from '../public/svgs/fantom.svg'
import optimism from '../public/svgs/optimism.svg'
import arbitrum from '../public/svgs/arbitrum.svg'
import { NFTItem, IPropsNFTItem } from '../interface/interface'

const NFTBox = ({nft}: IPropsNFTItem) => {

  const [chain, setChain] = useState('eth')
  const [image, setImage] = useState('/images/image 29.png')

  useEffect(() => {
    const updateImage = async() => {
      const tokenURI = nft.token_uri
      setChain(chain_list[nft.chain])
      if (tokenURI) {
        try {
          // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
          const requestURL = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
          const tokenURIResponse = await (await fetch(requestURL)).json()
          const imageURI = tokenURIResponse.image
          setImage(imageURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))
        } catch (err) {
          console.log(err)
        }
      }
    }

    updateImage()
  }, [])

  return (
  	<div className="">
      <div className="nft-image-container">
        <img src={image} alt="nft-image" />
      </div>
      <div className="flex flex-row pt-2 justify-start">
        <div className="ml-1 text-[#6C757D] text-[12px] font-[500]">
          {nft.name}
        </div>
        <div className="ml-1 text-[#6C757D] text-[12px] font-[500]">
          {`#${nft.token_id}`}
        </div>
      </div>
      <div className="flex flex-row pt-2 justify-between align-middle">
        <div className="flex items-center">
          <div className="ml-1 p-0.5 px-5 bg-[#B00000] rounded-full text-[#F8F9FA] text-[16px] font-[500]">
            {'sell'}
          </div>
          <div className='ml-2 flex items-center'>
            <Image src={Round} alt="ether" width={20} height={20} />
          </div>
        </div>
        <div className="ml-1 text-[#6C757D] text-[16px] font-[500] flex items-center">
          <span>chain:</span>
          <div className="flex items-center ml-1">
            {chain === 'eth' &&
              <Image src={eth} alt="eth" width={16} height={16}/>
            }
            {chain === 'bsc' &&
              <Image src={bsc} alt="bsc" width={16} height={16}/>
            }
            {chain === 'matic' &&
              <Image src={matic} alt="matic" width={16} height={16}/>
            }
            {chain === 'avalanche' &&
              <Image src={avalanche} alt="avalanche" width={16} height={16}/>
            }
            {chain === 'fantom' &&
              <Image src={fantom} alt="fantom" width={16} height={16}/>
            }
            {chain === 'optimism' &&
              <Image src={optimism} alt="optimism" width={16} height={16}/>
            }
            {chain === 'arbitrum' &&
              <Image src={arbitrum} alt="arbitrum" width={16} height={16}/>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTBox