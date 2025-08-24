"use client";

import { useContext } from "react";
import {
  TokenSwapContext,
  TToken,
} from "../TokenSwap/context/TokenSwapContext";
import { isTokenSame } from "@/utils/isTokenSame";

export const TokenSelectorButton = ({ token }: { token: TToken }) => {
  const { from, to, setFrom, setTo } = useContext(TokenSwapContext);

  const handleTokenClick = () => {
    if (from == null && to == null) {
      setFrom(token);
      return;
    }

    if (from != null && to == null) {
      if (isTokenSame(token, from)) {
        setFrom(null);
      }
      setTo(token);
      return;
    }

    if (from == null && to != null) {
      if (isTokenSame(token, to)) {
        setTo(null);
      }
      setFrom(token);
      return;
    }

    if (isTokenSame(token, from)) {
      setFrom(null);
      return;
    }

    if (isTokenSame(token, to)) {
      setTo(null);
      return;
    }

    setTo(token);
  };

  return (
    <button
      onClick={handleTokenClick}
      key={`${token.chainId} - ${token.symbol}`}
      className={`${
        isTokenSame(from, token) &&
        "scale-120 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      } ${
        isTokenSame(to, token) &&
        "scale-120 bg-gradient-to-r from-green-400 to-blue-500"
      } cursor-pointer block max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 hover:scale-120 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
    >
      {token.symbol}
    </button>
  );
};
