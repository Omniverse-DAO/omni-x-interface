import { StaticImageData } from 'next/image'
import React from 'react'

export type IPropsServices = {
  background: string
  title: string
  image: StaticImageData
}

export interface IPropsSlider{
  title?:string,
  images:Array<React.ReactNode>;
}
