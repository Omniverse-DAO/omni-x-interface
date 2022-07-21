export interface ChainInfo {
    label: string;
    appUrl: string;
    rpcUrl: string;
    explorer: string;
    apiUrl: string;
    osApiUrl: string;
    cdnUrl: string;
    rewardsSubgraphUrl: string;
    cloudinaryUrl: string;
}
  
export interface Addresses {
    EXECUTION_MANAGER: string,
    EXCHANGE: string,
    ROYALTY_FEE_MANAGER: string,
    ROYALTY_FEE_REGISTRY: string,
    STRATEGY_STANDARD_SALE: string,
    TRANSFER_MANAGER_ERC721: string,
    TRANSFER_MANAGER_ERC1155: string,
    TRANSFER_MANAGER_GHOSTS: string,
    TRANSFER_MANAGER_ONFT721: string,
    TRANSFER_MANAGER_ONFT1155: string,
    TRANSFER_SELECTOR_NFT: string,
    OFT: string,
    WETH: string,
    CURRENCY_MANAGER: string,
    REMOTE_ADDRESS_MANAGER: string,
}