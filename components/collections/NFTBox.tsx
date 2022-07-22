import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { chain_list } from '../../utils/utils'
import { IPropsNFTItem } from '../../interface/interface'
import LazyLoad from 'react-lazyload'
import USD from '../../public/images/USD.png'


const NFTBox = ({nft, col_url, chain}: IPropsNFTItem) => {
  const [imageError, setImageError] = useState(false)
  

  return (
    <div className="w-full">
      <Link href={`/collections/${col_url}/${nft.token_id}`}>
        <a>
          <div>
            <LazyLoad placeholder={<img src={'/images/omnix_logo_black_1.png'} alt="nft-image" />}>
              <img src={imageError||nft.image==null?'/images/omnix_logo_black_1.png':nft.image} alt="nft-image" onError={(e)=>{setImageError(true)}} data-src={nft.image} />
            </LazyLoad>
          </div>
          <div className="text-[#6C757D] text-sm mt-3 px-3">
            {nft.name}{` #${nft.token_id}`}
          </div>
          <div className="my-3 px-3">
            <div className="columns-2">
              <div className="flex items-center">
                <img src="/svgs/ethereum.svg" className="w-[18px] h-[18px]" />
                <span className="text-[#1E1C21] text-sm ml-2"> {nft.price}</span>
              </div>
              <div className="flex items-center flex-row-reverse">
                {(chain === 'eth' || chain === 'rinkeby') &&
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
                {/* <span className="text-[#6C757D] text-sm mr-2">Chain : </span> */}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default NFTBox
