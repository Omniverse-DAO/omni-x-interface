import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { chain_list } from '../utils/utils'
import Round from '../public/images/round-refresh.png'
import { NFTItem, IPropsNFTItem } from '../interface/interface'
import LazyLoad from 'react-lazyload'
import {useDraggable} from '@dnd-kit/core'

const NFTBox = ({nft, index}: IPropsNFTItem) => {

  const [chain, setChain] = useState('eth')
  const [image, setImage] = useState('/images/omnix_logo_black_1.png')
  const [imageError, setImageError] = useState(false)

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `draggable-${index}`,
    data: {
      type: 'NFT',
    }
  })
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 99
  } : undefined

  useEffect(() => {
    const updateImage = async() => {
      const metadata = nft.metadata
      setChain(chain_list[nft.chain])
      if (metadata) {
        try {
          // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
          const image_uri = JSON.parse(metadata).image
          setImage(image_uri.replace('ipfs://', 'https://ipfs.io/ipfs/'))
        } catch (err) {
          console.log(err)
        }
      }
    }

    updateImage()
  }, [])

  return (
  	<div >
      <div className="nft-image-container" ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <LazyLoad placeholder={<img src={'/images/omnix_logo_black_1.png'} alt="nft-image" />}>
          <img src={imageError?'/images/omnix_logo_black_1.png':image} alt="nft-image" onError={(e)=>{setImageError(true)}} data-src={image} />
        </LazyLoad>
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
