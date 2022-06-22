import React from 'react'

export interface IPropsSlider {
  title?: string
  images: Array<React.ReactNode>
}

export interface IPropsImage {
  nfts: Array<NFTItem>
}

export interface IPropsFeed {
  feed: Array<FeedItem>
}

export interface IPropsNFTItem {
  nft: NFTItem
}

export interface NFTItem {
  name: string,
  token_uri: string,
  token_id: string,
  chain: string
}

export interface FeedItem {
  image: React.ReactNode
  love: number
  view: number
  chain: string
  title: string
  id: string
  owner: string
  postedby: string
  alert?: {
    content: string
    percent: number
  }
}
