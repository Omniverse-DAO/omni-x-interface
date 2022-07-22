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

import PngCheck from '../../../public/images/check.png' 
import PngSub from '../../../public/images/subButton.png'

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

  const router = useRouter()
  const dispatch = useDispatch()

  const col_url = router.query.Collection as string
  const token_id = router.query.Item as string

  const nftInfo = useSelector(selectNFTInfo)

  useEffect(() => {
    if ( col_url && token_id ) {
      dispatch(getNFTInfo(col_url, token_id) as any)
    }
  }, [col_url, token_id])

  return (
    <>
      {nftInfo && nftInfo.nft && 
        <div className="w-full mt-40 pr-[70px] pb-[120px]">
          <div className="w-full 2xl:px-[10%] xl:px-[5%] lg:px-[2%] md:px-[2%] ">
            <div className="grid grid-cols-3 gap-12 ">
              <div className="col-span-1">
                <LazyLoad placeholder={<img src={'/images/omnix_logo_black_1.png'} alt="nft-image" />}>
                  <img src={imageError?'/images/omnix_logo_black_1.png':nftInfo.nft.image} alt="nft-image" onError={(e)=>{setImageError(true)}} data-src={nftInfo.nft.image} />
                </LazyLoad>
              </div>
              <div className="col-span-2">
                <div className="px-6 py-3 bg-[#F8F9FA]">
                  <div className='flex'>
                    <h1 className="text-[#1E1C21] text-[32px] font-bold mr-32">{nftInfo.collection.name}</h1>
                    <Image src={PngCheck} alt="checkpng"/>
                  </div>
                  <div className="flex justify-start items-center">
                    <h1 className="text-[#1E1C21] text-[23px] font-normal underline">{nftInfo.nft.name}</h1>
                    <Image src={PngSub} alt=""/>
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x  px-6 py-3 mt-6">
                  <div >
                    <div className="flex justify-start items-center">
                      <h1 className="text-[#1E1C21] text-[20px] font-bold">owner:</h1>
                      <h1 className="text-[#B444F9] text-[20px] font-normal underline ml-4">BOOBA.ETH</h1>
                    </div>
                      {/* <h1 className="text-[#1E1C21] text-[60px] font-normal">{nftInfo.price}</h1> */}
                    <div className="flex">
                      <h1 className="text-[#1E1C21] text-[60px] font-normal mr-28">69.5</h1>
                      <Image src={PngEther} alt="eth"/>
                    </div>
                    <div className="">
                      <h1>$175,743.58</h1>
                      <div className="flex justify-start items-center mt-3"><h1 className="mr-3 font-semibold">Highest Bid: <span className="font-normal">45</span></h1><Image src={PngEther} width={15} height={16} alt="chain  logo" /></div>
                      <div className="flex justify-start items-center mt-3"><h1 className="mr-3 font-semibold">Last Sale: <span className="font-normal">42</span></h1><Image src={PngEther} width={15} height={16} alt="chain logo" /></div>
                      <button className="w-[95px] px-5 py-2 bg-[#ADB5BD] text-[#FFFFFF] font-['Circular   Std'] font-semibold text-[18px] rounded-[4px] border-2 border-[#ADB5BD] ml-[100px]">bid</button>
                    </div>
                  </div>
                  <div className='pl-[58px] flex '>
                      <div className='mr-[50px]'>
                        <h2>account</h2>
                        <p className='mt-[22px]'>0xdh3skfhn3...</p>
                        <p className='mt-[22px]'>0xdh3skfhn3...</p>
                        <p className='mt-[22px]'>0xdh3skfhn3...</p>
                        <p className='mt-[22px]'>0xdh3skfhn3...</p>
                      </div>
                      <div  className='mr-[50px]'>
                        <h2>chain</h2>
                        <Image src={PngEther}  className='mt-[22px]'/>
                        <Image src={PngEther}  className='mt-[22px]'/>
                        <Image src={PngEther}  className='mt-[22px]'/>
                        <Image src={PngEther}  className='mt-[22px]'/>
                      </div>                      
                      <div>
                        <h2>bid</h2>
                        <div className='flex mt-[22px]'>
                          <Image src={PngEther}/>
                          <span>45,700.00</span>
                          <button className='bg-[#ADB5BD] round-[4px] px-10 py-1 ml-[32px]'>accept</button>
                        </div>
                        <div className='flex mt-[22px]'>
                          <Image src={PngEther}/>
                          <span>45,700.00</span>
                          <button className='bg-[#ADB5BD] round-[4px] px-10 py-1 ml-[32px]'>accept</button>
                        </div>
                        <div className='flex mt-[22px]'>
                          <Image src={PngEther}/>
                          <span>45,700.00</span>
                          <button className='bg-[#ADB5BD] round-[4px] px-10 py-1 ml-[32px]'>accept</button>
                        </div>
                        <div className='flex mt-[22px]'>
                          <Image src={PngEther}/>
                          <span>45,700.00</span>
                          <button className='bg-[#ADB5BD] round-[4px] px-10 py-1 ml-[32px]'>accept</button>
                        </div>
                        
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="ml-10">
                <ul className="flex flex-wrap relative justify-item-stretch text-sm font-medium text-center text-gray-500">
                  <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='items'?'bg-[#E9ECEF] text-[#1E1C21]':'bg-[#F8F9FA] text-[#6C757D]'}`} onClick={()=>setCurrentTab('items')}>properties</li>
                  <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='activity'?'bg-[#E9ECEF] text-[#1E1C21]':'bg-[#F8F9FA] text-[#6C757D]'}`} onClick={()=>setCurrentTab('activity')}>activity</li>
                  <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='stats'?'bg-[#E9ECEF] text-[#1E1C21]':'bg-[#F8F9FA] text-[#6C757D]'}`} onClick={()=>setCurrentTab('stats')}>info</li>
                  <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='stats'?'bg-[#E9ECEF] text-[#1E1C21]':'bg-[#F8F9FA] text-[#6C757D]'}`} onClick={()=>setCurrentTab('stats')}>stats</li>
                </ul>
              </div>
              <div className="border-2 border-[#E9ECEF] bg-[#F8F9FA] px-10 py-8">
                {
                  currentTab == 'items' &&
                  <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4">
                    {
                      Object.entries(nftInfo.nft.attributes).map((item, idx) => {
                        const attrs = nftInfo.collection.attrs
                        const attr = attrs[item[0]].values
                        const trait = attr[(item[1] as string).toLowerCase()]
                        return <div className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px]" key={idx}>
                          <p className="text-[#B444F9] text-[12px] font-bold">{item[0]}</p>
                          <div className="flex justify-start items-center mt-2">
                            <p className="text-[#1E1C21] text-[18px] font-bold">{item[1]}<span className="ml-3 font-normal">[{trait[1]}%]</span></p>
                            <p className="ml-5 mr-3 text-[#1E1C21] text-[18px] ml-auto">{nftInfo.price}</p>
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
      }
    </>
  )
}

export default Item