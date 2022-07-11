import React, { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { NextPage } from 'next'
import { Listbox, Transition, Switch } from '@headlessui/react'

import Discord from '../../../public/images/discord.png'
import Twitter from '../../../public/images/twitter.png'
import Web from '../../../public/images/web.png'
import Ethereum from '../../../public/sidebar/ethereum.png'

import { getCollectionNFTs, selectCollectionNFTs, getCollectionInfo, selectCollectionInfo, clearCollectionNFTs } from '../../../redux/reducers/collectionsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import NFTBox from '../../../components/collections/NFTBox'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@material-ui/core/CircularProgress'

const people = [
  { id: 1, name: 'price: low to high', unavailable: false },
  { id: 2, name: 'price: high to low', unavailable: false },
]

const Collection: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('items')
  const [expandedMenu, setExpandedMenu] = useState(0)
  const [selected, setSelected] = useState(people[0])
  const [enabled, setEnabled] = useState(false)

  const [hasMoreNFTs, setHasMoreNFTs] = useState(true)

  const router = useRouter()
  const sCollectionAddr = router.query.Collection as string
  const sChain = router.query.chain == undefined ? 'eth' : router.query.chain as string

  const dispatch = useDispatch()
  const nfts = useSelector(selectCollectionNFTs)
  const info = useSelector(selectCollectionInfo)
  useEffect(() => {
    if ( sCollectionAddr ) {
      dispatch(clearCollectionNFTs() as any)
      dispatch(getCollectionNFTs(sCollectionAddr, sChain, null) as any)
      dispatch(getCollectionInfo(sCollectionAddr, sChain) as any)
    }
  }, [sCollectionAddr])

  useEffect(() => {
    if(nfts.cursor == '') {
      setHasMoreNFTs(false)
    }
  }, [nfts])

  // useEffect(() => {
  // }, [info])

  const fetchMoreData = () => {
    if(nfts.cursor == '') {
      setHasMoreNFTs(false)
      return
    }
    setTimeout(() => {
      if ( sCollectionAddr ) {
        dispatch(getCollectionNFTs(sCollectionAddr, sChain, nfts.cursor) as any)
      }
    }, 500)
  }

  return (
    <>
      <div className="w-full mt-40 pr-[70px]">
        <div className="grid grid-cols-13">
          <div className="col-span-1"></div>
          <div className="2xl:col-span-1 xl:col-span-2 md:col-span-2">
            <Image src={process.env.API_URL + 'uploads\\default_avatar.png'} width={160} height={160} alt="avatar" />
          </div>
          <div className="2xl:col-span-9 xl:col-span-8 md:col-span-8 px-8 pt-3">
            <div>
              <p className="text-[#1E1C21] font-['Roboto Mono'] text-3xl uppercase font-bold">BORED APE YACHT CLUB</p>
            </div>
            <div className="flex justify-start mt-5">
              <div>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-normal underline">items</p>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-bold mt-3">{info.item ? info.item : 0}</p>
              </div>
              <div className="xl:ml-20 lg:ml-10 md:ml-10">
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-normal underline">holders</p>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-bold mt-3">{info.owner ? info.owner : 0}</p>
              </div>
              <div className="xl:ml-20 lg:ml-10 md:ml-10">
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-normal underline">floor</p>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-bold mt-3"><span className='mr-3'>0</span><Image src={Ethereum} height={25} width={23} alt="" /></p>
              </div>
              <div className="xl:ml-20 lg:ml-10 md:ml-10">
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-normal underline">sales tax</p>
                <p className="text-[#1E1C21] font-['Roboto Mono'] text-xl font-bold mt-3">0%</p>
              </div>
            </div>
            <div className='mt-8'>
              <ul className="flex flex-wrap relative justify-item-stretch text-sm font-medium text-center text-gray-500">
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='items'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('items')}>items</li>
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='activity'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('activity')}>activity</li>
                <li className={`select-none inline-block border-x-2 border-t-2 border-zince-800 text-xl px-10 py-2 rounded-t-lg ${currentTab==='stats'?'bg-slate-200 text-[#1E1C21]':'bg-slate-100'}`} onClick={()=>setCurrentTab('stats')}>stats</li>
              </ul>
            </div>
          </div>
          <div className="col-span-2">
            <div className="mt-4"><button className="px-5 py-2 text-[#ADB5BD] font-['Roboto Mono'] text-lg border-2 border-[#ADB5BD] rounded-[22px]">+ watchlist</button></div>
            <div className="mt-7">
              <Link href={'/'}>
                <a className="p-2">
                  <Image src={Discord} width={25} height={21} alt='discord' />
                </a>
              </Link>
              <Link href={'/'}>
                <a className="p-2">
                  <Image src={Twitter} alt='twitter' />
                </a>
              </Link>
              <Link href={'/'}>
                <a className="p-2">
                  <Image src={Web} alt='website' />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t-2 border-[#E9ECEF] pr-[70px]">
        <div className="grid grid-cols-13">
          <div className="col-span-2 2xl:col-span-2 xl:col-span-3 md:col-span-3">
            <ul className='flex flex-col space-y-4'>
              <li className="w-full">
                <div
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Buy Now
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-[#E9ECEF]' : 'bg-[#E9ECEF]'}
                    pull-right relative inline-flex h-[22px] w-[57px] shrink-0 cursor-pointer rounded-full border-2 border-[#6C757D] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${enabled ? 'translate-x-6' : 'translate-x-px'}
                        pointer-events-none inline-block h-[16px] w-[28px] transform rounded-full bg-[#6C757D] shadow-lg ring-0 transition duration-200 ease-in-out mt-px`}
                    />
                  </Switch>
                </div>
              </li>
              <li className="w-full">
                <button
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Price
                  <span className="pull-right">
                    <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                  </span>
                </button>
              </li>
              <li className="w-full">
                <button
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Blockchain
                  <span className="pull-right">
                    <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                  </span>
                </button>
              </li>
              <li className="w-full">
                <button
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Rarity
                  <span className="pull-right">
                    <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                  </span>
                </button>
              </li>
              <li className="w-full">
                <button
                  className={`w-full px-8 py-4 text-left text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ${expandedMenu==1?'active':''}`}
                >
                  Attributes
                  <span className="pull-right">
                    <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="col-span-11 px-12 py-6 border-l-2 border-[#E9ECEF] xl: col-span-10">
            <div className="xl:grid xl:grid-cols-2 lg:flex lg:justify-between md:flex md:justify-between">
              <div className="flex flex-row gap-4">
                <div>
                  <button className="rounded-lg bg-[#F8F9FA] border-[#6C757D] border-2 text-[#6C757D] text-lg px-6 py-2 sm:text-sm">
                    80-100 ETH
                    <span className="ml-6"><i className="fa fa-close"></i></span>
                  </button>
                </div>
              </div>
              <div className="flex flex-row-reverse gap-4">
                <div className="min-w-[180px] z-10">
                  <Listbox value={selected} onChange={setSelected}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#E9ECEF] py-2 pl-3 pr-10 text-lg text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <i className="fa fa-chevron-down"></i>
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#E9ECEF] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {people.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={person}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <i className="fa fa-chevron-down h-5 w-5"></i>
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <div>
                  <button className="rounded-lg bg-[#38B000] text-[#F8F9FA] text-lg px-6 py-2 sm:text-sm">make a collection bid</button>
                </div>
              </div>
            </div>
            <div className="mt-10">
              {
                Array.isArray(nfts.list) &&
                <InfiniteScroll
                  dataLength={nfts.list.length}
                  next={fetchMoreData}
                  hasMore={hasMoreNFTs}
                  loader={
                    <div className='flex justify-center items-center'>
                      <div className="flex justify-center items-center w-[90%] h-[100px]">
                        <CircularProgress />
                      </div>
                    </div>
                  }
                  endMessage={
                    <div></div>
                  }
                >
                  <div className="grid 2xl:grid-cols-5 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    { nfts.list.map((item, index) => {
                      return (
                        <NFTBox nft={item} key={index} />
                      )
                    })}
                  </div>
                </InfiniteScroll>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection