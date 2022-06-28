import React from 'react'
import NFTBox from './NFTBox'
import { IPropsImage } from '../interface/interface'

const NFTGrid = ({ nfts }: IPropsImage) => {
  return (
    <>
      <div className="w-full mb-5 mt-10">
        <div className="grid grid-cols-5 gap-10">
          {nfts.map((item, index) => {
            return (
              <NFTBox nft={item} key={index} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default NFTGrid
