"use client";

import { useContext } from "react";
import { CardType, TokenCard } from "./TokenCard";
import { TokenSwapContext } from "../TokenSwap/context/TokenSwapContext";
import styles from "./styles.module.css";
import { TokenSwapShareButton } from "./TokenSwapShareButton";

export const TokenSwapCompareSection = () => {
  const { from, to } = useContext(TokenSwapContext);
  return (
    <div className="flex flex-col lg:flex-row p-5 justify-center items-center">
      <TokenCard token={from} cardType={CardType.FROM} />
      <div className="-z-10 rotate-90 lg:rotate-0 flex items-center w-32 h-32 lg:h-64 overflow-hidden my-auto">
        <div
          className={`${styles.pipeline} max-w-32 w-full h-1 bg-blue-500`}
        ></div>
      </div>
      <TokenCard token={to} cardType={CardType.TO} />
      <TokenSwapShareButton />
    </div>
  );
};
