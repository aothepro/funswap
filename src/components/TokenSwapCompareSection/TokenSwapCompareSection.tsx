"use client";

import { useContext } from "react";
import { TokenCard } from "./TokenCard";
import { TokenSwapContext } from "../TokenSwap/context/TokenSwapContext";

export const TokenSwapCompareSection = () => {
  const { from, to } = useContext(TokenSwapContext);
  return (
    <div className="flex justify-between gap-5">
      <TokenCard token={from} />
      <TokenCard token={to} />
    </div>
  );
};
