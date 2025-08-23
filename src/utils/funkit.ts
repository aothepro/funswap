import {
    getAssetErc20ByChainAndSymbol, // erc20 is a term for crypto token
    getAssetPriceInfo,
} from '@funkit/api-base';

const { FUN_API_KEY: apiKey = "" } = process.env;


export const getTokenDetails = async ({ chainId, symbol }: { chainId: string, symbol: string }) => {

    return await getAssetErc20ByChainAndSymbol({
        chainId,
        symbol, apiKey
    }).then(async ({ symbol, address, chain }) => {

        const priceInfo = await getAssetPriceInfo({
            chainId: chain,
            assetTokenAddress: address,
            apiKey
        })
        return { symbol, chainId, priceInfo };
    })
}
