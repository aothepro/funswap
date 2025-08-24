"use client";

import { useContext } from "react";
import { CardType, TokenCard } from "./TokenCard";
import { TokenSwapContext } from "../TokenSwap/context/TokenSwapContext";
import styles from "./styles.module.css";

export const TokenSwapCompareSection = () => {
  const { from, to } = useContext(TokenSwapContext);
  return (
    <div className="flex p-5 justify-center">
      <TokenCard token={from} cardType={CardType.FROM} />
      <div className="min-w-32 grow h-2 overflow-hidden my-auto border border-gray-200">
        <div className={`${styles.pipeline} w-full h-full bg-blue-500`}></div>
      </div>
      <TokenCard token={to} cardType={CardType.TO} />
    </div>
  );
};
