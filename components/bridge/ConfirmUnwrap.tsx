import React from 'react'

interface IConfirmUnwrapProps {
  updateModal: (status: boolean) => void
}

const ConfirmUnwrap: React.FC<IConfirmUnwrapProps> = ({
  updateModal,
}) => {

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
                Asset Unwrap
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
              {/*<p className="my-4 text-center text-slate-500 text-lg leading-relaxed">
                You are transferring this NFT:
              </p>*/}
              <div className="flex justify-center mt-4">
                <img src="/images/vector.png" alt="Vector" />
              </div>
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Your transferred NFT is a non-native omnichain token and you have transferred it to its “home” blockchain.
                <br />
                Please confirm the wallet transaction to unwrap your NFT (back to its original form) and complete the transfer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ConfirmUnwrap
