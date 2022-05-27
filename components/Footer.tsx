import React from 'react'

const Footer = () => {
    return (
        <div className='py-3 footer abel mb-20 mt-20'>
            
            <div className="w-full flex-col items-center">
                <div
                className="m-auto lg:flex w-full flex-collg:flex-row"
                >
                    <div className='flex flex-col w-full lg:w-4/6'>
                        <p className="m-0  text-justify text-xl lg:text-2xl lg:text-left font-semibold lg:pb-4">
                            NFT Marketplace.
                        </p>
                        <p className="m-0  text-justify text-xl lg:text-2xl lg:text-left font-semibold lg:pb-4">
                            Deep Analytics.
                        </p>
                        <p className="m-0  text-justify text-xl lg:text-2xl lg:text-left font-semibold lg:pb-4">
                            Curated NFT Launches.
                        </p>
                        <p className="m-0  text-justify text-xl lg:text-2xl lg:text-left font-semibold lg:pb-4">
                            Social Interactivity.
                        </p>
                        <p className="m-0  text-justify text-xl lg:text-2xl lg:text-left font-semibold lg:pb-4">
                            Gaming NFT Hub.
                        </p>
                        <p className="m-0 text-justify text-xl lg:text-2xl lg:text-left text-grey-700 font-semibold lg:pb-4">
                            and so much more
                        </p>
                    </div>
                    <div className="flex mt-auto flex-col items-center w-full lg:w-3/6 lg:items-end pt-10 md:pt-0">
                        <p className="text-justify text-xl lg:text-2xl lg:text-left text-grey-500 font-semibold lg:pb-4 ml-auto mr-auto">
                            join us
                        </p>
                        <div className="flex m-auto flex-row items-center w-full">
                            <button className="focus:outline-none text-white font-semibold raleway bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 sm:m-8 lg:ml-16 mr-auto">
                                <img src='../static/svgs/icons_discord.svg' />
                                discord
                            </button>
                            <button className="focus:outline-none text-white font-semibold raleway bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900 sm:m-8 lg:ml-16 mr-auto">
                                <img src='../static/svgs/icons_twitter.svg' />
                                twitter
                            </button>
                            <button className="focus:outline-none text-white font-semibold raleway bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 sm:m-8 lg:ml-16 mr-auto">
                                <img src='../static/svgs/icons_web.svg' />
                                web
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer