import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { chain_list } from '../../utils/utils'
import { IPropsNFTItem } from '../../interface/interface'
import LazyLoad from 'react-lazyload'
import USD from '../../public/images/USD.png'


const NFTBox = ({nft}: IPropsNFTItem) => {
  const [chain, setChain] = useState('eth')
  const [image, setImage] = useState('/images/omnix_logo_black_1.png')
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const updateImage = async() => {
      console.log(nft)
      const metadata = nft.metadata
      setChain(chain_list[nft.chain])
      if (metadata) {
        try {
          // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
          const image_uri = JSON.parse(metadata).image
          setImage(image_uri.replace('ipfs://', 'https://ipfs.io/ipfs/'))
        } catch (err) {
          console.log("NFTBox err? ", err)
        }
      }
    }

    updateImage()
  }, [])

  return (
    <div className="w-full">
      <Link href={`/collections/${nft.token_address}/${nft.token_id}`}>
        <a>
          <div>
            <LazyLoad placeholder={<img src={'/images/omnix_logo_black_1.png'} alt="nft-image" />}>
              <img src={imageError?'/images/omnix_logo_black_1.png':image} alt="nft-image" onError={(e)=>{setImageError(true)}} data-src={image} />
            </LazyLoad>
          </div>
          <div className="text-[#6C757D] text-sm mt-3 px-3">
            {nft.name}{` #${nft.token_id}`}
          </div>
          <div className="my-3 px-3">
            <div className="columns-2">
              <div className="flex items-center">
                <Image src={USD} height={18} width={18} alt="" />
                <span className="text-[#1E1C21] text-sm ml-2"> 85.6k</span>
              </div>
              <div className="flex items-center flex-row-reverse">
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
                <span className="text-[#6C757D] text-sm mr-2">chain : </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default NFTBox