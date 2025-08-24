"use client";

import { useContext } from "react";
import { CardType, TokenCard } from "./TokenCard";
import { TokenSwapContext } from "../TokenSwap/context/TokenSwapContext";
import styles from "./styles.module.css";

export const TokenSwapCompareSection = () => {
  const { from, to } = useContext(TokenSwapContext);
  return (
    <div className="flex flex-col md:flex-row p-5 justify-center items-center">
      <TokenCard token={from} cardType={CardType.FROM} />
      <div className="-z-10 rotate-90 md:rotate-0 flex items-center w-32 h-32 md:w-64 md:h-64 overflow-hidden my-auto">
        <div
          className={`${styles.pipeline} max-w-32 w-full h-1 bg-blue-500`}
        ></div>
      </div>
      <TokenCard token={to} cardType={CardType.TO} />
    </div>
  );
};
