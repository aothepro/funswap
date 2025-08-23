import { TToken } from "@/components/TokenSwap/context/TokenSwapContext";

export const getKnownTokens = (): TToken[] => {
    return [
        { symbol: "USDC", chainId: "1", },
        { symbol: "USDT", chainId: "137", },
        { symbol: "ETH", chainId: "8453", },
        { symbol: "WBTC", chainId: "1", },
    ]
};