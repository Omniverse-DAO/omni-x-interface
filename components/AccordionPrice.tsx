import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface AccordionProps {
  title: React.ReactNode
}

export const AccordionPrice: React.FC<AccordionProps> = ({ title }) => {
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const [rotate, setRotate] = useState('transform duration-700 ease')

  const contentSpace = useRef(null)

  function toggleAccordion() {
    setActive((prevState) => !prevState)
    // @ts-ignore
    setHeight(active ? '0px' : `${contentSpace.current.scrollHeight}px`)
    setRotate(active ? 'transform duration-200 ease' : 'transform duration-200 ease rotate-180')
  }

  return (
    <div className="flex flex-col px-4 py-2 w-full">
      <button
        className="box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <p className="inline-block text-gray-500 font-semibold text-lg">{title}</p>
        <FontAwesomeIcon
            icon={active?faChevronUp:faChevronDown}
            className="text-gray-500"
        />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-hidden transition-max-height duration-200 ease-in-out"
      >
        <div className="py-4 flex flex-row w-full justify-between items-center">
          <div className="mb-3 xl:w-96 mx-3">
            <input
              type="text"
              className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              id="priceLow"
              placeholder="Low"
            />
          </div>
          <div className="mb-3 xl:w-96 mx-3">
            <input
              type="text"
              className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              id="priceHigh"
              placeholder="High"
            />
          </div>
        </div>
      </div>
    </div>
  )
}