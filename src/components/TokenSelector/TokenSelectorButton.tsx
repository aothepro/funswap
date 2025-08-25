"use client";

import { useContext } from "react";
import {
  TokenSwapContext,
  TToken,
} from "../TokenSwap/context/TokenSwapContext";
import { isTokenSame } from "@/utils/isTokenSame";
import Image from "next/image";
import { getTokenImage } from "@/utils/getTokenImage";

export const TokenSelectorButton = ({ token }: { token: TToken }) => {
  const { from, to, setFrom, setTo } = useContext(TokenSwapContext);

  const handleTokenClick = () => {
    if (from == null && to == null) {
      setFrom(token);
    } else if (from != null && to == null) {
      if (isTokenSame(token, from)) {
        setFrom(null);
      }
      setTo(token);
    } else if (from == null && to != null) {
      if (isTokenSame(token, to)) {
        setTo(null);
      }
      setFrom(token);
    } else if (isTokenSame(token, from)) {
      setFrom(null);
      return;
    } else if (isTokenSame(token, to)) {
      setTo(null);
    } else setTo(token);
  };

  return (
    <button
      onClick={handleTokenClick}
      key={`${token.chainId} - ${token.symbol}`}
      className={`hover:scale-130 text-black dark:text-white ${
        isTokenSame(from, token) &&
        "scale-120 font-bold text-white hover:from-indigo-400 hover:to-teal-500 bg-linear-to-r/srgb from-indigo-500 to-teal-400"
      } ${
        isTokenSame(to, token) &&
        "scale-120 font-bold text-white hover:from-violet-400 hover:to-fuchsia-500 bg-linear-to-bl from-violet-500 to-fuchsia-500"
      } cursor-pointer block max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 hover:scale-120 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
    >
      <div className="flex gap-2">
        <Image
          src={getTokenImage(token.symbol)}
          width={32}
          height={32}
          alt={`token ${token.symbol}`}
        />
        <div className="my-auto dark:text-shadow-lg/30 ">{token.symbol}</div>
      </div>
    </button>
  );
};
