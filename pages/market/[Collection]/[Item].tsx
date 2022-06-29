import React, { useState, Fragment } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

import PngAlert from '../../../public/images/market/alert.png'
import PngLike from '../../../public/images/market/like.png'
import PngLink from '../../../public/images/market/link.png'
import PngView from '../../../public/images/market/view.png'

import PngEtherBg from '../../../public/images/market/ethereum_bg.png'
import PngEther from '../../../public/images/market/ethereum.png'
import PngIcon1 from '../../../public/images/market/dbanner1.png'
import PngIcon2 from '../../../public/images/market/dbanner2.png'
import PngIcon3 from '../../../public/images/market/dbanner3.png'

import image_25 from '../../../public/images/image 25.png'

const Item: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('items')

  return (
    <>
      <div className="w-full mt-40 pr-[70px]">
        <div className="w-full 2xl:px-[10%] xl:px-[5%] lg:px-[2%] md:px-[2%]">
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-1">
              <Image src={image_25} width={480} height={480} alt="photo" />
            </div>
            <div className="col-span-2">
              <div className="px-6 py-3">
                <h1 className="text-[#1E1C21] text-[32px] font-bold">BORED APE YACHT CLUB</h1>
                <div className="flex justify-start items-center">
                  <h1 className="text-[#1E1C21] text-[23px] font-normal underline">BoredApeYachClub #6583</h1>
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
              <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4">
                <div className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px] ">
                  <p className="text-[#B444F9] text-[12px] font-bold">BACKGROUND</p>
                  <div className="flex justify-start items-center mt-2">
                    <p className="text-[#1E1C21] text-[18px] font-bold">GREEN<span className="ml-3 font-normal">[12.35%]</span></p>
                    <p className="ml-5 mr-3 text-[#1E1C21] text-[18px]">68</p>
                    <Image src={PngEther} alt="" />
                  </div>
                </div>
                <div className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px] ">
                  <p className="text-[#B444F9] text-[12px] font-bold">BACKGROUND</p>
                  <div className="flex justify-start items-center mt-2">
                    <p className="text-[#1E1C21] text-[18px] font-bold">GREEN<span className="ml-3 font-normal">[12.35%]</span></p>
                    <p className="ml-5 mr-3 text-[#1E1C21] text-[18px]">68</p>
                    <Image src={PngEther} alt="" />
                  </div>
                </div>
                <div className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px] ">
                  <p className="text-[#B444F9] text-[12px] font-bold">BACKGROUND</p>
                  <div className="flex justify-start items-center mt-2">
                    <p className="text-[#1E1C21] text-[18px] font-bold">GREEN<span className="ml-3 font-normal">[12.35%]</span></p>
                    <p className="ml-5 mr-3 text-[#1E1C21] text-[18px]">68</p>
                    <Image src={PngEther} alt="" />
                  </div>
                </div>
                <div className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px] ">
                  <p className="text-[#B444F9] text-[12px] font-bold">BACKGROUND</p>
                  <div className="flex justify-start items-center mt-2">
                    <p className="text-[#1E1C21] text-[18px] font-bold">GREEN<span className="ml-3 font-normal">[12.35%]</span></p>
                    <p className="ml-5 mr-3 text-[#1E1C21] text-[18px]">68</p>
                    <Image src={PngEther} alt="" />
                  </div>
                </div>
                <div className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px] ">
                  <p className="text-[#B444F9] text-[12px] font-bold">BACKGROUND</p>
                  <div className="flex justify-start items-center mt-2">
                    <p className="text-[#1E1C21] text-[18px] font-bold">GREEN<span className="ml-3 font-normal">[12.35%]</span></p>
                    <p className="ml-5 mr-3 text-[#1E1C21] text-[18px]">68</p>
                    <Image src={PngEther} alt="" />
                  </div>
                </div>
                <div className="px-5 py-2 bg-[#b444f926] border-2 border-[#B444F9] rounded-[8px] ">
                  <p className="text-[#B444F9] text-[12px] font-bold">BACKGROUND</p>
                  <div className="flex justify-start items-center mt-2">
                    <p className="text-[#1E1C21] text-[18px] font-bold">GREEN<span className="ml-3 font-normal">[12.35%]</span></p>
                    <p className="ml-5 mr-3 text-[#1E1C21] text-[18px]">68</p>
                    <Image src={PngEther} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item