import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { getNFTInfo, selectNFTInfo } from '../../../redux/reducers/collectionsReducer'
import LazyLoad from 'react-lazyload'

import PngAlert from '../../../public/images/collections/alert.png'
import PngLike from '../../../public/images/collections/like.png'
import PngLink from '../../../public/images/collections/link.png'
import PngView from '../../../public/images/collections/view.png'

import PngEtherBg from '../../../public/images/collections/ethereum_bg.png'
import PngEther from '../../../public/images/collections/ethereum.png'
import PngIcon1 from '../../../public/images/collections/dbanner1.png'
import PngIcon2 from '../../../public/images/collections/dbanner2.png'
import PngIcon3 from '../../../public/images/collections/dbanner3.png'

import image_25 from '../../../public/images/image 25.png'

interface NFTMetaData {
  name: string,
  image: string,
  attributes: Array<{trait_type: string, value: string}>,
  description: string,
  external_url: string,
}

const Item: NextPage = () => {
  const [imageError, setImageError] = useState(false)
  const [currentTab, setCurrentTab] = useState<string>('items')
  const [metaData, setMetaData] = useState<NFTMetaData>({
    name: '',
    image: '',
    attributes: [],
    description: '',
    external_url: '',
  })

  const router = useRouter()
  const dispatch = useDispatch()

  const { Collection, Item, chain } = router.query
  const nftInfo = useSelector(selectNFTInfo)

  useEffect(() => {
    const sChain = chain == undefined ? 'eth' : chain as string;
    if ( Collection && Item ) {
      dispatch(getNFTInfo(Collection as string, Item as string, sChain) as any)
    }
  }, [Collection, Item])

  useEffect(() => {
    if (Object.keys(nftInfo).length !== 0) {
      var metaData = JSON.parse(nftInfo.metadata)
      metaData.image = metaData.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
      setMetaData(metaData)
      setImageError(false)
    }
  }, [nftInfo])

  return (
    <>
      <div className="w-full mt-40 pr-[70px]">
        <div className="w-full 2xl:px-[10%] xl:px-[5%] lg:px-[2%] md:px-[2%]">
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-1">
              <LazyLoad placeholder={<img src={'/images/omnix_logo_black_1.png'} alt="nft-image" />}>
                <img src={imageError?'/images/omnix_logo_black_1.png':metaData.image} alt="nft-image" onError={(e)=>{setImageError(true)}} data-src={metaData.image} />
              </LazyLoad>
              {/* <Image src={metaData.image != '' ? metaData.image : image_25} width={480} height={480} alt="photo" /> */}
            </div>
            <div className="col-span-2">
              <div className="px-6 py-3">
                <h1 className="text-[#1E1C21] text-[32px] font-bold">{nftInfo.name}</h1>
                <div className="flex justify-start items-center">
                  <h1 className="text-[#1E1C21] text-[23px] font-normal underline">{metaData.name}</h1>
                  <div className="flex items-center ml-16"><Image src={PngLike} alt="" /></div>
                  <span className="ml-5 text-[#ADB5BD] text-[20px]">24.5k</span>
                  <div className="flex items-center ml-8"><Image src={PngView} alt="" /></div>
                  <span className="ml-2 text-[#ADB5BD] text-[20px]">12.2k</span>
                  <div className="flex items-center ml-8"><Image src={PngLink} alt="" /></div>
                  <div className="flex items-center ml-8"><Image src={PngAlert} alt="" /></div>
                </div>
              </div>
              <div className="px-6 py-3 mt-6">
                <div className="flex justify-start items-center">
                  <h1 className="text-[#1E1C21] text-[20px] font-bold">OWNER:</h1>
                  <h1 className="text-[#B444F9] text-[20px] font-normal underline ml-4">BOOBA.ETH</h1>
                </div>
                <div className="flex justify-start items-center mt-5">
                  <h1 className="text-[#1E1C21] text-[20px] font-bold">SELLER ACCEPTS:</h1>
                  <div className="flex items-center ml-6"><Image src={PngEther} alt="" /></div>
                  <div className="flex items-center ml-3"><Image src={PngIcon1} alt="" /></div>
                  <div className="flex items-center ml-3"><Image src={PngIcon2} alt="" /></div>
                  <div className="flex items-center ml-3"><Image src={PngIcon3} alt="" /></div>
                </div>
                <div className="flex justify-start items-center mt-5 2xl:ml-40 xl:ml-40 lg:ml-20 md:ml-20">
                  <h1 className="text-[#1E1C21] text-[60px] font-normal">69.5</h1>
                  <div className="flex items-center ml-7"><Image src={PngEtherBg} alt="" /></div>
                  <div className="ml-12">
                    <h1>$175,743.58</h1>
                    <div className="flex justify-start items-center mt-3"><h1 className="mr-3 font-semibold">Highest Bid: <span className="font-normal">45</span></h1><Image src={PngEther} width={15} height={16} alt="" /></div>
                    <div className="flex justify-start items-center mt-3"><h1 className="mr-3 font-semibold">Last Sale: <span className="font-normal">42</span></h1><Image src={PngEther} width={15} height={16} alt="" /></div>
                  </div>
                </div>
                <div className="flex justify-start items-center mt-5 2xl:ml-40 xl:ml-40 lg:ml-20 md:ml-20">
                  <button className="w-[220px] px-5 py-2 bg-[#1E1C21] text-[#FEFEFF] font-['Roboto Mono'] font-semibold text-[30px] rounded-[8px] border-2 border-[#1E1C21] z-10">buy</button>
                  <button className="w-[220px] px-5 py-2 bg-[#E9ECEF] text-[#6C757D] font-['Roboto Mono'] font-semibold text-[30px] rounded-[8px] border-2 border-[#ADB5BD] relative -left-2.5">bid</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="ml-10">
              <ul className="flex flex-wrap relative justify-item-stretch text-sm font-medium text-center text-gray-500">
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='items'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('items')}>items</li>
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='activity'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('activity')}>activity</li>
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='stats'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('stats')}>stats</li>
              </ul>
            </div>
            <div className="border-2 border-[#E9ECEF] bg-[#F8F9FA] px-10 py-8">
              {
                currentTab == 'items' &&
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4">
                  {
                    metaData.attributes.map((item, index) => {
                      return <div className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px]" key={index}>
                        <p className="text-[#B444F9] text-[12px] font-bold">{item.trait_type}</p>
                        <div className="flex justify-start items-center mt-2">
                          <p className="text-[#1E1C21] text-[18px] font-bold">{item.value}<span className="ml-3 font-normal">[12.35%]</span></p>
                          <p className="ml-5 mr-3 text-[#1E1C21] text-[18px]">68</p>
                          <Image src={PngEther} alt="" />
                        </div>
                      </div>
                    })
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item