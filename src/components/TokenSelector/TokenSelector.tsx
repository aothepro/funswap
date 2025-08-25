"use client";

import { getKnownTokens } from "@/utils/getKnownTokens";
import { TokenSelectorButton } from "./TokenSelectorButton";

export const TokenSelector = () => {
  const tokens = getKnownTokens();

  return (
    <div className="flex gap-8 items-center mx-auto">
      {tokens.map((token) => (
        <TokenSelectorButton
          key={`${token.chainId} - ${token.symbol}`}
          token={token}
        />
      ))}
    </div>
  );
};
