import { TToken } from "@/components/TokenSwap/context/TokenSwapContext";

export const isTokenSame = (a: TToken | null, b: TToken | null): boolean => {
    if (a == null || b == null) return false;
    return a.chainId == b.chainId && a.symbol == b.symbol
};
