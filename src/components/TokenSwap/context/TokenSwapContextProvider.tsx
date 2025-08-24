"use client";

import { ReactNode, useState } from "react";
import {
  TConversionDetails,
  TokenSwapContext,
  TToken,
} from "./TokenSwapContext";

export const TokenSwapContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [from, setFrom] = useState<TToken | null>(null);
  const [to, setTo] = useState<TToken | null>(null);
  const [conversionDetails, setConversionDetails] =
    useState<TConversionDetails | null>(null);

  return (
    <TokenSwapContext.Provider
      value={{
        from,
        setFrom,
        to,
        setTo,
        conversionDetails,
        setConversionDetails,
      }}
    >
      {children}
    </TokenSwapContext.Provider>
  );
};
