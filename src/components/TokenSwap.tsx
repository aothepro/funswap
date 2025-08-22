import { TokenCard } from "./TokenCard";
import { TokenSelector } from "./TokenSelector";

export const TokenSwap = () => {
  return (
    <div className="flex flex-col text-center gap-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Token Price Explorer
      </h1>
      <TokenSelector />
      <div className="flex justify-between gap-5">
        <TokenCard ticker={"USDC"} icon={""} />
        <TokenCard ticker={"BTC"} icon={""} />
      </div>
    </div>
  );
};
