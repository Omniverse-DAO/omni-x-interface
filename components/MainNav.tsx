import React from 'react'
import Image from 'next/image'
import logo from '../static/logo.png';

const MainNav = () => {
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 z-10 fixed w-full">
          <div className="flex flex-wrap items-center">
            <a href="/" className="flex items-center">
                <Image 
                    src={logo}
                    className="mr-3"
                    alt="Omni-X"
                />
            </a>
            <div className="flex md:order-1 px-10 w-3/12">
                <div className="hidden relative md:block w-full">
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-black dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <div className="search-div">
                            <input type="search" id="default-search" className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-3xl placeholder-black" placeholder="Acquire your Desires" required />
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-2" id="mobile-menu-3">
              <div className="relative mt-3 md:hidden">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
              </div>
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                  <li>
                  <a href="#" className="block py-2 pr-4 pl-3 text-lg roboto text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">EXPLORER</a>
                  </li>
                  <li>
                  <a href="#" className="block py-2 pr-4 pl-3 text-lg roboto text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">CREATE</a>
                  </li>
                  <li>
                  <a href="#" className="block py-2 pr-4 pl-3 text-lg roboto text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">ANALYZE</a>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}

export default MainNav