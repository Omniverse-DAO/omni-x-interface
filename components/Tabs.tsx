import React from 'react'
import Image from 'next/image'
import NFTGrid from './NFTGrid'
import WatchList from './WatchList'
import Feed from './Feed'
import Stats from './Stats'
import pfp from '../public/images/image 29.png'
import { NFTItem } from '../interface/interface'

const nfts: Array<NFTItem> = [
  {
    title: 'BoredApeYachtClub',
    id: '#6583',
    image: <Image src={pfp} alt="image - 25" layout="responsive" />,
    chain: 'ether',
  },
  {
    title: 'BoredApeYachtClub',
    id: '#6583',
    image: <Image src={pfp} alt="image - 25" layout="responsive" />,
    chain: 'ether',
  },
  {
    title: 'BoredApeYachtClub',
    id: '#6583',
    image: <Image src={pfp} alt="image - 25" layout="responsive" />,
    chain: 'ether',
  },
  {
    title: 'BoredApeYachtClub',
    id: '#6583',
    image: <Image src={pfp} alt="image - 25" layout="responsive" />,
    chain: 'ether',
  },
  {
    title: 'BoredApeYachtClub',
    id: '#6583',
    image: <Image src={pfp} alt="image - 25" layout="responsive" />,
    chain: 'ether',
  },
  {
    title: 'BoredApeYachtClub',
    id: '#6583',
    image: <Image src={pfp} alt="image - 25" layout="responsive" />,
    chain: 'ether',
  },
  {
    title: 'BoredApeYachtClub',
    id: '#6583',
    image: <Image src={pfp} alt="image - 25" layout="responsive" />,
    chain: 'ether',
  },
  {
    title: 'BoredApeYachtClub',
    id: '#6583',
    image: <Image src={pfp} alt="image - 25" layout="responsive" />,
    chain: 'ether',
  },
]
const Tabs = () => {
  const [currentTab, setCurrentTable] = React.useState<string>('NFTs')
  return (
    <>
      <div className="w-full mt-20 px-32">
        <div className="px-12">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 pb-2 px-8">
            <li className={`select-none inline-block border-2 border-zince-800 text-xl p-4 text-zinc-800 ${currentTab==='NFTs'?'bg-slate-200':'bg-slate-100'} rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 w-40`} onClick={()=>setCurrentTable('NFTs')}>
              NFTs
            </li>
            <li className={`select-none inline-block border-2 border-zince-800 text-xl p-4 text-zinc-800 ${currentTab==='watchlist'?'bg-slate-200':'bg-slate-100'} rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 w-40`} onClick={()=>setCurrentTable('watchlist')}>watchlist</li>
            <li className={`select-none inline-block border-2 border-zince-800 text-xl p-4 text-zinc-800 ${currentTab==='feed'?'bg-slate-200':'bg-slate-100'} rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 w-40`} onClick={()=>setCurrentTable('feed')}>feed</li>
            <li className={`select-none inline-block border-2 border-zince-800 text-xl p-4 text-zinc-800 ${currentTab==='stats'?'bg-slate-200':'bg-slate-100'} rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 w-40`} onClick={()=>setCurrentTable('stats')}>stats</li>
          </ul>
          {currentTab === 'NFTs' && <NFTGrid nfts={nfts} />}
          {currentTab === 'watchlist' && <WatchList />}
          {currentTab === 'feed' && <Feed  />}
          {currentTab === 'stats' && <Stats  />}
        </div>
      </div>
    </>
  )
}

export default Tabs
