import { createContext, Dispatch, SetStateAction } from "react";

export type TToken = {
  chainId: string;
  symbol: string;
};

export type TConversionDetails = {
  valueInUSD: number;
  symbol: string;
};


type TTokenSwapContext = {
  from: TToken | null;
  setFrom: Dispatch<SetStateAction<TToken | null>>;
  to: TToken | null;
  setTo: Dispatch<SetStateAction<TToken | null>>;
  conversionDetails: TConversionDetails | null;
  setConversionDetails: Dispatch<SetStateAction<TConversionDetails | null>>;
};

const INITIAL_STATE = {
  from: null,
  to: null,
  setFrom: () => { },
  setTo: () => { },
  conversionDetails: null,
  setConversionDetails: () => { },
};

export const TokenSwapContext = createContext<TTokenSwapContext>(INITIAL_STATE);

