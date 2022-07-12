import React, {useRef, useLayoutEffect, useState} from 'react'
import useWallet from '../hooks/useWallet'
import { useSelector } from 'react-redux'
import {selectUser, selectUserNFTs} from '../redux/reducers/userReducer'
import Image from 'next/image'
import {useDndMonitor, useDroppable} from '@dnd-kit/core'
import LazyLoad from 'react-lazyload'
import {NFTItem} from '../interface/interface'
import {
  getLayerZeroEndpointInstance,
  getERC721Instance,
  getERC1155Instance,
  getOmnixBridge1155Instance,
  getOmnixBridgeInstance
} from '../utils/contracts'
import {BigNumber, ethers} from 'ethers'
import {getLayerzeroChainId} from '../utils/constants'
import {Dialog} from '@material-ui/core'
import ConfirmTransfer from './bridge/ConfirmTransfer'

interface RefObject {
  offsetHeight: number
}

const SideBar: React.FC = () => {
  const {
    provider,
    signer,
    connect: connectWallet,
    switchNetwork
  } = useWallet()

  const ref = useRef(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [onMenu, setOnMenu] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState(0)
  const [fixed, setFixed] = useState(false)
  const [confirmTransfer, setConfirmTransfer] = useState(false)

  const menu_profile = useRef<HTMLUListElement>(null)
  const menu_ethereum = useRef<HTMLUListElement>(null)
  const menu_wallets = useRef<HTMLDivElement>(null)
  const menu_watchlist = useRef<HTMLDivElement>(null)
  const menu_bridge = useRef<HTMLDivElement>(null)
  const menu_cart = useRef<HTMLDivElement>(null)
  const [offsetMenu, setOffsetMenu] = useState(0)
  const [avatarError, setAvatarError] = useState(false)

  const nfts = useSelector(selectUserNFTs)
  const user = useSelector(selectUser)

  const [selectedNFTItem, setSelectedNFTItem] = useState<NFTItem>()
  const [image, setImage] = useState('/images/omnix_logo_black_1.png')
  const [imageError, setImageError] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [dragEnd, setDragEnd] = useState(false)
  const [targetChain, setTargetChain] = useState(0)
  const [estimatedFee, setEstimatedFee] = useState(BigNumber.from('0'))
  const {setNodeRef} = useDroppable({
    id: 'droppable',
    data: {
      accepts: ['NFT'],
    }
  })

  // Drag and drop event monitor
  useDndMonitor({
    onDragStart(event) {
      setDragOver(true)
      setDragEnd(false)

      setShowSidebar(true)
      setOnMenu(true)
      setFixed(true)
      setExpandedMenu(5)
    },
    onDragOver(event) {
      setDragEnd(false)
    },
    onDragEnd(event) {
      const { active: { id } } = event
      if (id.toString().length > 0 && event.over !== null) {
        const index = id.toString().split('-')[1]
        setSelectedNFTItem(nfts[index])
        const metadata = nfts[index].metadata
        setImageError(false)
        // setChain(chain_list[nfts[index].chain])
        if (metadata) {
          try {
            // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
            const image_uri = JSON.parse(metadata).image
            setImage(image_uri.replace('ipfs://', 'https://ipfs.io/ipfs/'))
          } catch (err) {
            console.log(err)
            setImage('/images/omnix_logo_black_1.png')
          }
        }
      }
      setDragEnd(true)
      setDragOver(false)
    },
    onDragCancel(event) {
      setDragEnd(false)
      setDragOver(false)
    },
  })

  useLayoutEffect(() => {
    if ( menu_profile.current && expandedMenu == 1 ) {
      const current: RefObject = menu_profile.current
      setOffsetMenu(current.offsetHeight)
    }
    if ( menu_ethereum.current && expandedMenu == 2 ) {
      const current: RefObject = menu_ethereum.current
      setOffsetMenu(current.offsetHeight)
    }
    if ( menu_wallets.current && expandedMenu == 3 ) {
      const current: RefObject = menu_wallets.current
      setOffsetMenu(current.offsetHeight)
    }
    if ( menu_watchlist.current && expandedMenu == 4 ) {
      const current: RefObject = menu_watchlist.current
      setOffsetMenu(current.offsetHeight)
    }
    if ( menu_bridge.current && expandedMenu == 5 ) {
      const current: RefObject = menu_bridge.current
      setOffsetMenu(current.offsetHeight)
    }
    if ( menu_cart.current && expandedMenu == 6 ) {
      const current: RefObject = menu_cart.current
      setOffsetMenu(current.offsetHeight)
    }
  }, [expandedMenu])

  const hideSidebar = () => {
    if ( !onMenu ) {
      setExpandedMenu(0)
      setOffsetMenu(0)
      setShowSidebar(false)
      setOnMenu(false)
    }
  }

  const onLeaveMenu = () => {
    if (!fixed) {
      setExpandedMenu(0)
      setOffsetMenu(0)
      setShowSidebar(false)
      setOnMenu(false)
    }
  }

  const toggleMenu = (menu: number) => {
    setExpandedMenu(menu == expandedMenu ? 0 : menu)
    setFixed(false)
  }

  const fixMenu = (menu: number) => {
    setExpandedMenu(menu == expandedMenu ? 0 : menu)
    setFixed(!fixed)
  }

  const onClickNetwork = async (networkIndex: number) => {
    await connectWallet()
    await switchNetwork(networkIndex)
  }

  const handleTargetChainChange = (networkIndex: number) => {
    setTargetChain(networkIndex)
  }

  const handleTransfer = async () => {
    if (!selectedNFTItem) return
    if (!targetChain) return
    if (!user) return
    if (!signer) return

    if (provider?._network?.chainId) {
      if (provider?._network?.chainId === targetChain) return
      const lzEndpointInstance = getLayerZeroEndpointInstance(provider?._network?.chainId, provider)
      const lzTargetChainId = getLayerzeroChainId(targetChain)
      const _signerAddress = await signer.getAddress()

      if (selectedNFTItem.contract_type === 'ERC721') {
        const contractInstance = getOmnixBridgeInstance(provider?._network?.chainId, signer)
        const erc721Instance = getERC721Instance(selectedNFTItem.token_address, signer)
        const noSignerOmniXInstance = getOmnixBridgeInstance(targetChain, null)
        const dstAddress = await noSignerOmniXInstance.persistentAddresses(selectedNFTItem.token_address)
        let adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 3500000])
        if (dstAddress !== ethers.constants.AddressZero) {
          adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 2000000])
        }
        // Estimate fee from layerzero endpoint
        const _name = await erc721Instance.name()
        const _symbol = await erc721Instance.symbol()
        const _tokenURI = await erc721Instance.tokenURI(selectedNFTItem.token_id)
        const _payload = ethers.utils.defaultAbiCoder.encode(
          ['address', 'address', 'string', 'string', 'string', 'uint256'],
          [selectedNFTItem.token_address, _signerAddress, _name, _symbol, _tokenURI, selectedNFTItem.token_id]
        )
        const estimatedFee = await lzEndpointInstance.estimateFees(lzTargetChainId, contractInstance.address, _payload, false, adapterParams)
        setEstimatedFee(estimatedFee.nativeFee)
      } else if (selectedNFTItem.contract_type === 'ERC1155') {
        const contractInstance = getOmnixBridge1155Instance(provider?._network?.chainId, signer)
        const noSignerOmniX1155Instance = getOmnixBridge1155Instance(targetChain, null)
        const erc1155Instance = getERC1155Instance(selectedNFTItem.token_address, signer)
        const dstAddress = await noSignerOmniX1155Instance.persistentAddresses(selectedNFTItem.token_address)
        let adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 3500000])
        if (dstAddress !== ethers.constants.AddressZero) {
          adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 2000000])
        }
        // Estimate fee from layerzero endpoint
        const _tokenURI = await erc1155Instance.uri(selectedNFTItem.token_id)
        const _payload = ethers.utils.defaultAbiCoder.encode(
          ['address', 'address', 'string', 'uint256', 'uint256'],
          [selectedNFTItem.token_address, _signerAddress, _tokenURI, selectedNFTItem.token_id, selectedNFTItem.amount]
        )
        const estimatedFee = await lzEndpointInstance.estimateFees(lzTargetChainId, contractInstance.address, _payload, false, adapterParams)
        setEstimatedFee(estimatedFee.nativeFee)
      }
    }

    setConfirmTransfer(true)
  }

  const onTransfer = async () => {
    if (!selectedNFTItem) return
    if (!signer) return

    if (provider?._network?.chainId) {
      if (provider?._network?.chainId === targetChain) return
      const lzEndpointInstance = getLayerZeroEndpointInstance(provider?._network?.chainId, provider)
      const lzTargetChainId = getLayerzeroChainId(targetChain)
      const _signerAddress = await signer.getAddress()

      if (selectedNFTItem.contract_type === 'ERC721') {
        const contractInstance = getOmnixBridgeInstance(provider?._network?.chainId, signer)
        const erc721Instance = getERC721Instance(selectedNFTItem.token_address, signer)
        const noSignerOmniXInstance = getOmnixBridgeInstance(targetChain, null)
        const dstAddress = await noSignerOmniXInstance.persistentAddresses(selectedNFTItem.token_address)
        let adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 3500000])
        if (dstAddress !== ethers.constants.AddressZero) {
          adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 2000000])
        }
        const operator = await erc721Instance.getApproved(BigNumber.from(selectedNFTItem.token_id))
        if (operator !== contractInstance.address) {
          await (await erc721Instance.approve(contractInstance.address, BigNumber.from(selectedNFTItem.token_id))).wait()
        }
        // Estimate fee from layerzero endpoint
        const _name = await erc721Instance.name()
        const _symbol = await erc721Instance.symbol()
        const _tokenURI = await erc721Instance.tokenURI(selectedNFTItem.token_id)
        const _payload = ethers.utils.defaultAbiCoder.encode(
          ['address', 'address', 'string', 'string', 'string', 'uint256'],
          [selectedNFTItem.token_address, _signerAddress, _name, _symbol, _tokenURI, selectedNFTItem.token_id]
        )
        const estimatedFee = await lzEndpointInstance.estimateFees(lzTargetChainId, contractInstance.address, _payload, false, adapterParams)

        const tx = await contractInstance.wrap(lzTargetChainId, selectedNFTItem.token_address, BigNumber.from(selectedNFTItem.token_id), adapterParams, {
          value: estimatedFee.nativeFee
        })
        await tx.wait()
      } else if (selectedNFTItem.contract_type === 'ERC1155') {
        const contractInstance = getOmnixBridge1155Instance(provider?._network?.chainId, signer)
        const noSignerOmniX1155Instance = getOmnixBridge1155Instance(targetChain, null)
        const erc1155Instance = getERC1155Instance(selectedNFTItem.token_address, signer)
        const dstAddress = await noSignerOmniX1155Instance.persistentAddresses(selectedNFTItem.token_address)
        let adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 3500000])
        if (dstAddress !== ethers.constants.AddressZero) {
          adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 2000000])
        }
        const operator = await erc1155Instance.isApprovedForAll(_signerAddress, contractInstance.address)
        if (!operator) {
          await (await erc1155Instance.setApprovalForAll(contractInstance.address, true)).wait()
        }
        // Estimate fee from layerzero endpoint
        const _tokenURI = await erc1155Instance.uri(selectedNFTItem.token_id)
        const _payload = ethers.utils.defaultAbiCoder.encode(
          ['address', 'address', 'string', 'uint256', 'uint256'],
          [selectedNFTItem.token_address, _signerAddress, _tokenURI, selectedNFTItem.token_id, selectedNFTItem.amount]
        )
        const estimatedFee = await lzEndpointInstance.estimateFees(lzTargetChainId, contractInstance.address, _payload, false, adapterParams)

        const tx = await contractInstance.wrap(lzTargetChainId, selectedNFTItem.token_address, BigNumber.from(selectedNFTItem.token_id), BigNumber.from(selectedNFTItem.amount), adapterParams, {
          value: estimatedFee.nativeFee
        })
        await tx.wait()
      }
    }
  }

  const updateModal = (status: boolean) => {
    setConfirmTransfer(status)
  }

  return (
    <>
      { !onMenu &&
        <div
          className='right-0 right-0 w-[70px] py-10 bg-[#F8F9FA] fixed h-full z-50'
          onMouseEnter={() => setShowSidebar(true)}
          onMouseLeave={() => hideSidebar()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <div className="m-auto">
                  <Image
                    src={avatarError?'/images/default_avatar.png':(process.env.API_URL + user.avatar)}
                    alt="avatar"
                    onError={(e)=>{user.avatar&&setAvatarError(true)}}
                    width={45}
                    height={45}
                  />
                </div>
              </div>
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/ethereum.png" className="m-auto" />
              </div>
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/wallets.svg" className="m-auto" />
              </div>
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/watchlist.svg" className="m-auto" />
              </div>
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/bridge.svg" className="m-auto" />
              </div>
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/cart.svg" className="m-auto" />
              </div>
            </div>
          </div>
        </div>
      }
      <div
        ref={ref}
        className={`right-0 right-0 w-[450px] bg-white px-[24px] py-10 fixed h-full z-40 ease-in-out duration-300 ${
          showSidebar || onMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
        onMouseEnter={() => setOnMenu(true)}
        onMouseLeave={() => onLeaveMenu()}
      >
        <ul className='flex flex-col space-y-4 mr-[70px]'>
          <li className="w-full">
            <button
              className={`w-full text-left rounded-full px-[24px] py-[24px] text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl sidebar ${expandedMenu==1?'active':''}`}
              onClick={() => toggleMenu(1)}
            >
              My Profile
              <span className="pull-right">
                <i className={`${expandedMenu == 1 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
              </span>
            </button>
            { expandedMenu == 1 &&
              <ul className='flex flex-col w-full space-y-4 p-6 pl-[100px] pt-8 pb-0 text-g-600' ref={menu_profile}>
                <li className="w-full">
                  <button>My Dashboard</button>
                </li>
                <li className="w-full">
                  <button>Account Settings</button>
                </li>
                <li className="w-full">
                  <button>Logout</button>
                </li>
              </ul>
            }
          </li>
          <li className="w-full">
            <button
              className={`w-full text-left rounded-full px-[24px] py-[24px] text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl sidebar ${expandedMenu==2?'active':''}`}
              onClick={() => toggleMenu(2)}
            >
              Network
              <span className="pull-right">
                <i className={`${expandedMenu == 2 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
              </span>
            </button>
            { expandedMenu == 2 &&
              <ul className='flex flex-col w-full space-y-4 p-6 pl-[80px] pt-8 pb-0 text-g-600' ref={menu_ethereum}>
                <li className="w-full">
                  <button className="flex flex-row" onClick={() => onClickNetwork(0)}>
                    <div className="w-[36px] h-[36px] m-auto">
                      <img src="/svgs/ethereum.svg" width={24} height={28} />
                    </div>
                    <span className="ml-4">Ethereum</span>
                  </button>
                </li>
                <li className="w-full">
                  <button className="flex flex-row" onClick={() => onClickNetwork(1)}>
                    <div className="w-[36px] h-[36px] m-auto">
                      <img src="/svgs/arbitrum.svg" width={35} height={30} />
                    </div>
                    <span className="ml-4">Arbitrum</span>
                  </button>
                </li>
                <li className="w-full">
                  <button className="flex flex-row" onClick={() => onClickNetwork(2)}>
                    <div className="w-[36px] h-[36px] m-auto">
                      <img src="/svgs/avax.svg" width={23} height={35} />
                    </div>
                    <span className="ml-4">Avalanche</span>
                  </button>
                </li>
                <li className="w-full">
                  <button className="flex flex-row" onClick={() => onClickNetwork(3)}>
                    <div className="w-[36px] h-[36px] m-auto">
                      <img src="/svgs/binance.svg" width={29} height={30} />
                    </div>
                    <span className="ml-4">BNB Chain</span>
                  </button>
                </li>
                <li className="w-full">
                  <button className="flex flex-row" onClick={() => onClickNetwork(4)}>
                    <div className="w-[36px] h-[36px] m-auto">
                      <img src="/svgs/fantom.svg" width={25} height={25} />
                    </div>
                    <span className="ml-4">Fantom</span>
                  </button>
                </li>
                <li className="w-full">
                  <button className="flex flex-row" onClick={() => onClickNetwork(5)}>
                    <div className="w-[36px] h-[36px] m-auto">
                      <img src="/svgs/optimism.svg" width={25} height={25} />
                    </div>
                    <span className="ml-4">Optimism</span>
                  </button>
                </li>
                <li className="w-full">
                  <button className="flex flex-row" onClick={() => onClickNetwork(6)}>
                    <div className="w-[36px] h-[36px] m-auto">
                      <img src="/svgs/polygon.svg" width={34} height={30} />
                    </div>
                    <span className="ml-4">Polygon</span>
                  </button>
                </li>
              </ul>
            }
          </li>
          <li className="w-full">
            <button
              className={`w-full text-left rounded-full px-[24px] py-[24px] text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl sidebar ${expandedMenu==3?'active':''}`}
              onClick={() => toggleMenu(3)}
            >
              Wallet
              <span className="pull-right">
                <i className={`${expandedMenu == 3 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
              </span>
            </button>
            { expandedMenu == 3 &&
              <div className='flex flex-col w-full space-y-4 p-6 pt-8 pb-0' ref={menu_wallets}>
                <span className="font-semibold w-auto text-[16px]">Staking:</span>
                <div className="w-full flex flex-row font-semibold text-[14px]">
                  <div className="bg-g-200 w-[88px] px-[11px] py-[9px]">
                    APR
                    <span className="pull-right">50%</span>
                  </div>
                  <div className="w-[60px] px-[11px] py-[9px]">
                    4652
                  </div>
                  <div className="px-[11px] py-[9px] text-g-600">
                    $OMNI staked
                  </div>
                </div>
                <div className="w-full flex flex-row font-semibold text-[14px]">
                  <div className="bg-g-200 w-[88px] px-[11px] py-[9px]">
                    Rewards
                  </div>
                  <div className="w-[60px] px-[11px] py-[9px]">
                    52.42
                  </div>
                  <div className="px-[11px] py-[9px] text-g-600">
                    $OMNI
                  </div>
                </div>
                <div className="w-full flex flex-row font-semibold text-[14px]">
                  <div className="w-[88px] px-[11px] py-[9px]">

                  </div>
                  <div className="w-[60px] px-[11px] py-[9px]">
                    43.17
                  </div>
                  <div className="px-[11px] py-[9px] text-g-600">
                    $USDC
                  </div>
                </div>
                <span className="font-semibold w-auto text-[16px]">OMNI-USDC LP:</span>
                <div className="w-full flex flex-row font-semibold text-[14px]">
                  <div className="bg-g-200 w-[88px] px-[11px] py-[9px]">
                    APR
                    <span className="pull-right">75%</span>
                  </div>
                  <div className="w-[60px] px-[11px] py-[9px]">
                    17.652
                  </div>
                  <div className="px-[11px] py-[9px] text-g-600">
                    LP staked
                  </div>
                </div>
                <div className="w-full flex flex-row font-semibold text-[14px]">
                  <div className="bg-g-200 w-[88px] px-[11px] py-[9px]">
                    Rewards
                  </div>
                  <div className="w-[60px] px-[11px] py-[9px]">
                    52.42
                  </div>
                  <div className="px-[11px] py-[9px] text-g-600">
                    $OMNI
                  </div>
                </div>
                <div className="w-full flex flex-row font-semibold text-[14px]">
                  <div className="w-[88px] px-[11px] py-[9px]">

                  </div>
                  <div className="w-[60px] px-[11px] py-[9px]">
                    43.17
                  </div>
                  <div className="px-[11px] py-[9px] text-g-600">
                    $USDC
                  </div>
                </div>
                <div className="flex flex-row">
                  <span className="text-[14px]">*add/remove positions on profile dashboard</span>
                  <button className="w-[30px] h-[30px] bg-wallet-output"></button>
                </div>
              </div>
            }
          </li>
          <li className="w-full">
            <button
              className={`w-full text-left rounded-full px-[24px] py-[24px] text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl sidebar ${expandedMenu==4?'active':''}`}
              onClick={() => toggleMenu(4)}
            >
              Watchlist
              <span className="pull-right">
                <i className={`${expandedMenu == 4 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
              </span>
            </button>
            { expandedMenu == 4 &&
              <div className='flex flex-col w-full space-y-4 p-6 pt-8 pb-0' ref={menu_watchlist}>
                <div className="p-[51px] flex flex-col items-center border border-dashed border-g-300">
                  <span className="text-[14px] text-g-300">Drag & Drop</span>
                  <span className="text-[14px] text-g-300">an NFT or NFT Collection</span>
                  <span className="text-[14px] text-g-300">to add your watch list</span>
                </div>
              </div>
            }
          </li>
          <li className="w-full">
            <button
              className={`w-full text-left rounded-full p-6 text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl sidebar ${expandedMenu==5?'active':''}`}
              onClick={() => fixMenu(5)}
            >
              Send/Bridge
              <span className="pull-right">
                <i className={`${expandedMenu == 5 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
              </span>
            </button>
            { expandedMenu == 5 &&
              <div className='flex flex-col w-full space-y-4 p-6 pt-8 pb-0' ref={menu_bridge}>
                <div ref={setNodeRef} className="px-[113px] py-[43px] flex flex-col items-center border border-dashed border-g-300 bg-g-200" style={dragOver ? {opacity: 0.4} : {opacity: 1}}>
                  {
                    dragOver
                      ?
                      <div className="">Drop</div>
                      :
                      (
                        !dragEnd &&
                        <img src="/sidebar/attach.png" />
                      )
                  }
                  {
                    selectedNFTItem &&
                      <LazyLoad placeholder={<img src={'/images/omnix_logo_black_1.png'} alt="nft-image" />}>
                        <img src={imageError?'/images/omnix_logo_black_1.png':image} alt="nft-image" onError={(e)=>{setImageError(true)}} data-src={image} />
                      </LazyLoad>
                  }
                </div>
                <span className="font-g-300">Select destination chain:</span>
                <div className="flex flex-row w-full space-x-[15px]">
                  <button onClick={() => handleTargetChainChange(4)} className={targetChain === 4 ? 'border border-g-300' : ''}>
                    <img src="/svgs/ethereum.svg" width={24} height={28} />
                  </button>
                  <button onClick={() => handleTargetChainChange(97)} className={targetChain === 97 ? 'border border-g-300' : ''}>
                    <img src="/svgs/binance.svg" width={29} height={30} />
                  </button>
                  <button onClick={() => handleTargetChainChange(43113)} className={targetChain === 43113 ? 'border border-g-300' : ''}>
                    <img src="/svgs/avax.svg" width={23} height={35} />
                  </button>
                  <button onClick={() => handleTargetChainChange(80001)} className={targetChain === 80001 ? 'border border-g-300' : ''}>
                    <img src="/svgs/polygon.svg" width={34} height={30} />
                  </button>
                  <button onClick={() => handleTargetChainChange(421611)} className={targetChain === 421611 ? 'border border-g-300' : ''}>
                    <img src="/svgs/arbitrum.svg" width={35} height={30} />
                  </button>
                  <button onClick={() => handleTargetChainChange(69)} className={targetChain === 69 ? 'border border-g-300' : ''}>
                    <img src="/svgs/optimism.svg" width={25} height={25} />
                  </button>
                  <button onClick={() => handleTargetChainChange(4002)} className={targetChain === 4002 ? 'border border-g-300' : ''}>
                    <img src="/svgs/fantom.svg" width={25} height={25} />
                  </button>
                </div>
                <button className="bg-g-400 text-white w-[172px] py-[10px] rounded-full m-auto" onClick={handleTransfer}>
                  Transfer
                </button>
              </div>
            }
          </li>
          <li className="w-full">
            <button
              className={`w-full text-left rounded-full px-[24px] py-[24px] text-g-600 hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl sidebar ${expandedMenu==6?'active':''}`}
              onClick={() => toggleMenu(6)}
            >
              Cart
              <span className="pull-right">
                <i className={`${expandedMenu == 6 ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
              </span>
            </button>
            { expandedMenu == 6 &&
              <div className='flex flex-col w-full space-y-4 p-6 pt-8 pb-0' ref={menu_cart}>
                <div className="px-[113px] py-[43px] flex flex-col items-center border border-dashed border-g-300 bg-g-200">
                  <img src="/sidebar/attach.png" />
                </div>
                <button className="bg-gr-100 text-white w-[172px] py-[10px] rounded-full m-auto">
                  Buy
                </button>
              </div>
            }
          </li>
        </ul>
        <div
          className='top-0 right-0 w-[70px] py-10 bg-white fixed h-full z-50'
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <div className="m-auto">
                  <Image
                    src={avatarError?'/images/default_avatar.png':(process.env.API_URL + user.avatar)}
                    alt="avatar"
                    onError={(e)=>{user.avatar&&setAvatarError(true)}}
                    width={45}
                    height={45}
                  />
                </div>
              </div>
              { expandedMenu == 1 &&
                <ul className='flex flex-col w-full space-y-4 p-6 pt-8' style={{height: offsetMenu + 'px'}}>
                </ul>
              }
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/ethereum.png" className="m-auto" />
              </div>
              { expandedMenu == 2 &&
                <ul className='flex flex-col w-full space-y-4 p-6 pt-8' style={{height: offsetMenu + 'px'}}>
                </ul>
              }
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/wallets.svg" className="m-auto" />
              </div>
              { expandedMenu == 3 &&
                <ul className='flex flex-col w-full space-y-4 p-6 pt-8' style={{height: offsetMenu + 'px'}}>
                </ul>
              }
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/watchlist.svg" className="m-auto" />
              </div>
              { expandedMenu == 4 &&
                <ul className='flex flex-col w-full space-y-4 p-6 pt-8' style={{height: offsetMenu + 'px'}}>
                </ul>
              }
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/bridge.svg" className="m-auto" />
              </div>
              { expandedMenu == 5 &&
                <ul className='flex flex-col w-full space-y-4 p-6 pt-8' style={{height: offsetMenu + 'px'}}>
                </ul>
              }
            </div>
            <div className="w-full py-[8px]">
              <div className="sidebar-icon">
                <img src="/sidebar/cart.svg" className="m-auto" />
              </div>
              { expandedMenu == 6 &&
                <ul className='flex flex-col w-full space-y-4 p-6 pt-8' style={{height: offsetMenu + 'px'}}>
                </ul>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto">
        <Dialog open={confirmTransfer} onClose={() => setConfirmTransfer(false)}>
          <ConfirmTransfer
            updateModal={updateModal}
            onTransfer={onTransfer}
            selectedNFTItem={selectedNFTItem}
            estimatedFee={estimatedFee}
            senderChain={provider?._network?.chainId || 4}
            targetChain={targetChain}
            image={image}
          />
        </Dialog>
      </div>
    </>
  )
}

export default SideBar
