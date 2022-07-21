import { ChainInfo, SupportedChainId } from "../types";

export const CHAIN_INFO: { [chainId in SupportedChainId]: ChainInfo } = {
  [SupportedChainId.RINKEBY]: {
    label: "Rinkeby",
    appUrl: "https://rinkeby.looksrare.org",
    explorer: "https://rinkeby.etherscan.io",
    rpcUrl: `https://eth-rinkeby.alchemyapi.io/v2`,
    apiUrl: "https://graphql-rinkeby.looksrare.org/graphql",
    osApiUrl: "https://testnets-api.opensea.io",
    cdnUrl: "https://static-rinkeby.looksnice.org",
    rewardsSubgraphUrl: "https://api.thegraph.com/subgraphs/name/0xjurassicpunk/looks-distribution",
    cloudinaryUrl: "https://looksrare.mo.cloudinary.net/rinkeby",
  },
};

export const isSupportedChain = (chainId: number): chainId is SupportedChainId => {
  return Object.values(SupportedChainId).includes(chainId);
};