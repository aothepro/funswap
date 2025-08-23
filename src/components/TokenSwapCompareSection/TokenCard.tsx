import Image from "next/image";
import { TToken } from "../TokenSwap/context/TokenSwapContext";

export const TokenCard = ({ token }: { token: TToken | null }) => {
  

  if (token == null) {
    return (
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex gap-3">Select a Token</div>
      </div>
    );
  }
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex gap-3">
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {token?.symbol}
        </h5>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">$100000</p>
    </div>
  );
};
