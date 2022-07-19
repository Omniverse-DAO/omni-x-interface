import React, {useState} from 'react'
import {NFTItem} from '../../interface/interface'
import useWallet from '../../hooks/useWallet'
import LazyLoad from 'react-lazyload'
import {chainInfos} from '../../utils/constants'
import {BigNumber, ethers} from 'ethers'

interface IConfirmTransferProps {
  updateModal: (status: boolean) => void,
  onTransfer: () => void,
  selectedNFTItem?: NFTItem,
  senderChain: number,
  targetChain: number,
  estimatedFee: BigNumber,
  image: string
}

const ConfirmTransfer: React.FC<IConfirmTransferProps> = ({
  updateModal,
  onTransfer,
  selectedNFTItem,
  senderChain,
  targetChain,
  estimatedFee,
  image
}) => {
  const {
    provider,
    signer
  } = useWallet()

  const [imageError, setImageError] = useState(false)

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h4 className="text-2xl font-semibold">
                Transfer Confirmation
              </h4>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => updateModal(false)}
              >
                <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative px-8 flex-auto">
              <p className="my-4 text-center text-slate-500 text-lg leading-relaxed">
                You are transferring this NFT:
              </p>
              <div className="flex flex-col items-center justify-center">
                <div style={{width: 250, height: 250, borderRadius: 20}}>
                  {
                    selectedNFTItem &&
                      <>
                        <LazyLoad placeholder={<img src={'/images/omnix_logo_black_1.png'} alt="nft-image"/>}>
                          <img src={imageError ? '/images/omnix_logo_black_1.png' : image} alt="nft-image" onError={(e) => {
                            setImageError(true)
                          }} data-src={image}/>
                        </LazyLoad>
                      </>
                  }
                </div>
                {
                  selectedNFTItem &&
                    <>
                      {
                        selectedNFTItem.name !== '' &&
                          <p className="mt-3 mb-1 text-md text-center text-slate-500 leading-relaxed">
                            {selectedNFTItem.name}
                          </p>
                      }
                      <p className="mt-1 mb-3 text-md text-center text-slate-500 leading-relaxed">
                        {`#${selectedNFTItem.token_id}`}
                      </p>
                    </>
                }
              </div>
              <div className="flex items-center justify-around mt-1">
                <div className="flex flex-col">
                  <p>From:</p>
                  <div className="flex flex-col items-center p-2 bg-g-200 rounded-md border border-slate-100">
                    <p>
                      <img src={chainInfos[senderChain].logo} width={30} height={30} style={{width: 30, height: 30}} alt={'Sender chain'} />
                    </p>
                    <p>{chainInfos[senderChain].officialName}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>To:</p>
                  <div className="flex flex-col items-center p-2 bg-g-200 rounded-md border border-slate-100">
                    <p>
                      <img src={chainInfos[targetChain].logo} width={30} height={30} style={{width: 30, height: 30}} alt={'Target chain'} />
                    </p>
                    <p>{chainInfos[targetChain].officialName}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around my-5">
                <p>Gas Cost:</p>
                <p>{ethers.utils.formatEther(estimatedFee)}&nbsp;{chainInfos[senderChain].currency}</p>
              </div>
              {/*<p className="my-4 text-slate-500 text-lg leading-relaxed">
                Note: if the asset is a non-native omnichain token and transferred to its home chain,
                you will be prompted with a follow on transaction confirmation to unwrap the asset
              </p>*/}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-left bg-p-400 rounded-md px-6 py-3 text-white hover:bg-p-700 hover:bg-opacity-20 font-semibold hover:shadow-xl ease-linear active transition-all duration-150"
                type="button"
                onClick={() => onTransfer()}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ConfirmTransfer
