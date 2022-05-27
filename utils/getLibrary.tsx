import {Web3Provider} from '@ethersproject/providers';

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
};