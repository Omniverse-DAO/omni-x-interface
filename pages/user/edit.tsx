import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import axios from 'axios'
import Close from '../../public/images/close.png'
import Default from '../../public/images/banner-1.png'
import Twitter from '../../public/images/twitter.png'
import Web from '../../public/images/web.png'
import Photo from '../../public/images/photo.png'
import useWallet from '../../hooks/useWallet'
const UserEdit: NextPage = () => {
  const [selectedImage, setSelectedImage] = React.useState()
  const hiddenFileInput = React.useRef(null)
  const [selectedBanner1, setSelectedBanner1] = React.useState()
  const hiddenFileBanner1 = React.useRef(null)
  const [selectedBanner2, setSelectedBanner2] = React.useState()
  const hiddenFileBanner2 = React.useRef(null)
  const [selectedBanner3, setSelectedBanner3] = React.useState()
  const hiddenFileBanner3 = React.useRef(null)
  const [userName, setUserName] = React.useState<string>('')
  const [bio, setBio] = React.useState<string>('')
  const [twitter, setTwitter] = React.useState<string>('')
  const [website, setWebsite] = React.useState<string>('')
  const context = useWallet()
  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }
  const banner1Change = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedBanner1(e.target.files[0])
    }
  }
  const banner2Change = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedBanner2(e.target.files[0])
    }
  }
  const banner3Change = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedBanner3(e.target.files[0])
    }
  }
  const avatarClick = () => {
    /*Collecting node-element and performing click*/
    hiddenFileInput?.current.click()
  }
  const banner1Click = () => {
    /*Collecting node-element and performing click*/
    hiddenFileBanner1.current.click()
  }
  const banner2Click = () => {
    /*Collecting node-element and performing click*/
    hiddenFileBanner2.current.click()
  }
  const banner3Click = () => {
    /*Collecting node-element and performing click*/
    hiddenFileBanner3.current.click()
  }
  const api = 'http://localhost:5000/api/v1/users/'
  const saveProfile = async () => {
    const profile = {
      address: context.address,
      username: userName,
      bio: bio,
      twitter: twitter,
      website: website,
      photo: selectedImage,
    }
    
    const response = await axios.post(`${api}profile`, profile)
    console.log(response)
    return response
  }

  return (
    <>
      <div className="mt-44 px-32 w-full">
        <input
          ref={hiddenFileBanner1}
          accept="image/*"
          type="file"
          onChange={banner1Change}
          className="hidden"
        />
        <input
          ref={hiddenFileBanner2}
          accept="image/*"
          type="file"
          onChange={banner2Change}
          className="hidden"
        />
        <input
          ref={hiddenFileBanner3}
          accept="image/*"
          type="file"
          onChange={banner3Change}
          className="hidden"
        />
        <div className="border-gray-300 bg-[#E9ECEF] border-2 p-5 px-10">
          <div className="grid grid-cols-3 gap-4 w-full">
            <div>
              <div className="border-[#B444F9] mb-5 relative">
                <div className="absolute -right-2 -top-2 z-10 ">
                  <Image src={Close} alt="close" width={15} height={15} />
                </div>
                <div
                  className="absolute z-10 top-[50%] mt-[-20px] left-[50%] ml-[-20px] bg-[#E9ECEF99] rounded-full w-[40px] h-[40px] p-2 cursor-pointer"
                  onClick={banner1Click}
                >
                  <Image src={Photo} alt="photo" />
                </div>
                <div className="border-image">
                  <Image
                    src={
                      selectedBanner1
                        ? URL.createObjectURL(selectedBanner1)
                        : Default
                    }
                    alt="first image"
                    layout="responsive"
                    width={200}
                    height={100}
                  />
                </div>
              </div>
              <div className="rounded-full mx-auto bg-[#B444F9] text-white center w-[47px] h-[47px] text-2xl text-center p-2">
                1
              </div>
            </div>
            <div>
              <div className="border-[#B444F9] mb-5 relative">
                <div className="absolute -right-2 -top-2 z-10 ">
                  <Image src={Close} alt="close" width={15} height={15} />
                </div>
                <div
                  className="absolute z-10 top-[50%] mt-[-20px] left-[50%] ml-[-20px] bg-[#E9ECEF99] rounded-full w-[40px] h-[40px] p-2 cursor-pointer"
                  onClick={banner2Click}
                >
                  <Image src={Photo} alt="photo" />
                </div>
                <div className="border-image">
                  <Image
                    src={
                      selectedBanner2
                        ? URL.createObjectURL(selectedBanner2)
                        : Default
                    }
                    alt="first image"
                    layout="responsive"
                    width={200}
                    height={100}
                  />
                </div>
              </div>
              <div className="rounded-full mx-auto bg-[#B444F9] text-white center w-[47px] h-[47px] text-2xl text-center p-2">
                2
              </div>
            </div>
            <div>
              <div className="border-[#B444F9] mb-5 relative">
                <div className="absolute -right-2 -top-2 z-10 ">
                  <Image src={Close} alt="close" width={15} height={15} />
                </div>
                <div
                  className="absolute z-10 top-[50%] mt-[-20px] left-[50%] ml-[-20px] bg-[#E9ECEF99] rounded-full w-[40px] h-[40px] p-2 cursor-pointer"
                  onClick={banner3Click}
                >
                  <Image src={Photo} alt="photo" />
                </div>
                <div className="border-image">
                  <Image
                    src={
                      selectedBanner3
                        ? URL.createObjectURL(selectedBanner3)
                        : Default
                    }
                    alt="first image"
                    layout="responsive"
                    width={200}
                    height={100}
                  />
                </div>
              </div>
              <div className="rounded-full mx-auto bg-[#B444F9] text-white center w-[47px] h-[47px] text-2xl text-center p-2">
                3
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-5 w-full">
          <div>
            <div className="relative">
              <div
                className="absolute z-10 top-[50%] mt-[-20px] left-[50%] ml-[-20px] bg-[#E9ECEF99] rounded-full w-[40px] h-[40px] p-2 cursor-pointer"
                onClick={avatarClick}
              >
                <Image src={Photo} alt="photo" />
              </div>
              <Image
                src={
                  selectedImage ? URL.createObjectURL(selectedImage) : Default
                }
                alt="avatar"
                width={250}
                height={250}
                className="rounded-xl"
              />
            </div>
          </div>
          <input
            ref={hiddenFileInput}
            accept="image/*"
            type="file"
            onChange={imageChange}
            className="hidden"
          />
          <div className="ml-7 w-full">
            <div className="w-full mb-3">
              <div className="text-[#6C757D]">username:</div>
              <input
                type="text"
                className="user-input"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="text-[#6C757D]">
              <div>bio:</div>
              <textarea
                className="user-textarea w-full"
                placeholder="(200 characters max)"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="w-full mb-3 mt-3 flex items-center">
              <div className="text-[#6C757D] mr-2">
                <Image src={Twitter} alt="tiwitter" />
              </div>
              <input
                type="text"
                className="user-input"
                placeholder="https://"
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div className="w-full mb-5 flex items-center">
              <div className="text-[#6C757D] mr-2">
                <Image src={Web} alt="web" />
              </div>
              <input
                type="text"
                className="user-input"
                placeholder="https://"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 justify-end mb-5">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={()=>saveProfile()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserEdit
