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
  nft: NFTItem,
  col_url?: string,
  chain?: string
}

export interface NFTItem {
  name: string,
  attributes: Object,
  image: string,
  custom_id: number,
  token: string,
  score: number,
  rank: number,
  token_id: number,
  name1: string,
  price: number,
  metadata: string,
  chain: string,
  token_address: string,
  uri: string,
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
