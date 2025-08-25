"use client";

import { ReactNode, useState } from "react";
import {
  TConversionDetails,
  TokenSwapContext,
  TToken,
} from "./TokenSwapContext";
import { useSearchParams } from "next/navigation";

export const TokenSwapContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const searchParams = useSearchParams();

  const initialTokens: { form: TToken | null; to: TToken | null } = {
    form: null,
    to: null,
  };

  if (searchParams.has("fromChainId") && searchParams.has("fromSymbol")) {
    const chainId = searchParams.get("fromChainId") || "";
    const symbol = searchParams.get("fromSymbol") || "";
    initialTokens.form = { chainId, symbol };
  }
  if (searchParams.has("toChainId") && searchParams.has("toSymbol")) {
    const chainId = searchParams.get("toChainId") || "";
    const symbol = searchParams.get("toSymbol") || "";
    initialTokens.to = { chainId, symbol };
  }

  const [from, setFrom] = useState<TToken | null>(initialTokens.form);
  const [to, setTo] = useState<TToken | null>(initialTokens.to);
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
