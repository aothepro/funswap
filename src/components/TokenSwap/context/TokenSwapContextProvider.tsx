"use client";

import { ReactNode, useState } from "react";
import { TokenSwapContext, TToken } from "./TokenSwapContext";

export const TokenSwapContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [from, setFrom] = useState<TToken | null>(null);
  const [to, setTo] = useState<TToken | null>(null);
  return (
    <TokenSwapContext.Provider
      value={{
        from,
        setFrom,
        to,
        setTo,
      }}
    >
      {children}
    </TokenSwapContext.Provider>
  );
};
