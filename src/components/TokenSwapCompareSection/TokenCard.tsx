import Image from "next/image";
import { TToken } from "../TokenSwap/context/TokenSwapContext";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";

export const TokenCard = ({ token }: { token: TToken | null }) => {
  const [rate, setRate] = useState<number>(0);
  const [inFlight, setInFlight] = useState(false);

  const loadToken = useCallback(() => {
    const abortController = new AbortController();
    if (!token) return;
    setInFlight(true);
    fetch(`/api/${token?.chainId}/${token?.symbol}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then(
        ({
          tokenInfo: {
            priceInfo: { unitPrice },
          },
        }) => {
          setRate(unitPrice);
          setInFlight(false);
        }
      )
      .catch();

    return abortController;
  }, [token]);

  useEffect(() => {
    const controller = loadToken();

    return () => {
      controller?.abort("Component unmounted");
    };
  }, [loadToken]);

  if (token == null) {
    return (
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex gap-3">Select a Token</div>
      </div>
    );
  }

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 hover:scale-150 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
      <div className="font-normal text-gray-700 dark:text-gray-400">
        {inFlight ? <Spinner /> : rate}
      </div>
    </div>
  );
};
