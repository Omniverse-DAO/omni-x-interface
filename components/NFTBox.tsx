import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { chain_list } from '../utils/utils'
import Round from '../public/images/round-refresh.png'
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
              <img src="/svgs/ethereum.svg" className="w-[16px] h-[16px]" />
            }
            {chain === 'bsc' &&
              <img src="/svgs/binance.svg" className="w-[16px] h-[16px]" />
            }
            {chain === 'matic' &&
              <img src="/svgs/polygon.svg" className="w-[16px] h-[16px]" />
            }
            {chain === 'avalanche' &&
              <img src="/svgs/avax.svg" className="w-[16px] h-[16px]" />
            }
            {chain === 'fantom' &&
              <img src="/svgs/fantom.svg" className="w-[16px] h-[16px]" />
            }
            {chain === 'optimism' &&
              <img src="/svgs/optimism.svg" className="w-[16px] h-[16px]" />
            }
            {chain === 'arbitrum' &&
              <img src="/svgs/arbitrum.svg" className="w-[16px] h-[16px]" />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTBox