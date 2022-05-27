import {ethers} from 'ethers'
import {BigNumber} from '@ethersproject/bignumber'
import {Web3Provider} from '@ethersproject/providers'


// Interfaces
export interface Web3Interface {
    chainId: any
    activate: any
    account: Web3Provider | undefined
    active: any
    connector: any
    error: any
    library: any
  }