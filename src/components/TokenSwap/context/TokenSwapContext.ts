import { createContext, Dispatch, SetStateAction } from "react";

export type TToken = {
  chainId: string;
  symbol: string;
};

type TTokenSwapContext = {
  from: TToken | null;
  setFrom: Dispatch<SetStateAction<TToken | null>>
  to: TToken | null;
  setTo: Dispatch<SetStateAction<TToken | null>>
};

const INITIAL_STATE = {
  from: null,
  to: null,
  setFrom: () => { },
  setTo: () => { }
};

export const TokenSwapContext = createContext<TTokenSwapContext>(INITIAL_STATE);

