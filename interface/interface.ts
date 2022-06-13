import React from 'react'

export interface IPropsSlider {
  title?:string,
  images:Array<React.ReactNode>;
}

export interface IPropsImage {
  nfts: Array<NFTItem>
}

export interface NFTItem {
  image: React.ReactNode
  title: string
  id: string
  chain: string
}