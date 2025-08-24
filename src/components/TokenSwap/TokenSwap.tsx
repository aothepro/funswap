import { TokenSelector } from "../TokenSelector/TokenSelector";
import { TokenSwapCompareSection } from "../TokenSwapCompareSection/TokenSwapCompareSection";
import { TokenSwapContextProvider } from "./context/TokenSwapContextProvider";

export const TokenSwap = () => {
  return (
    <div className="flex flex-col text-center gap-6 w-full">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Token Price Explorer
      </h1>
      <TokenSwapContextProvider>
        <TokenSelector />
        <TokenSwapCompareSection />
      </TokenSwapContextProvider>
    </div>
  );
};
