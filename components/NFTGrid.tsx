import React from 'react'
import Image from 'next/image'
import { IPropsImage, NFTItem } from '../interface/interface'
import Ether from '../public/images/ether.png'
const NFTGrid = ({ nfts }: IPropsImage) => {
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-5 gap-10">
          {nfts.map((item: NFTItem, index: number) => {
            return (
              <div className="" key={index}>
                {item.image}
                <div className="flex flex-row pt-2 justify-start">
                  <div className="ml-1 text-[#6C757D] text-[16px] font-[500]">
                    {item.title}
                  </div>
                  <div className="ml-1 text-[#6C757D] text-[16px] font-[500]">
                    {item.id}
                  </div>
                </div>
                <div className="flex flex-row pt-2 justify-between align-middle">
                  <div className="ml-1 p-0.5 px-5 bg-[#B00000] rounded-full text-[#F8F9FA] text-[16px] font-[500]">
                    {'sell'}
                  </div>
                  <div className="ml-1 text-[#6C757D] text-[16px] font-[500] flex items-center">
                    <span>chain:</span>
                    <div className="flex items-center">
                      <Image src={Ether} alt="ether" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default NFTGrid
