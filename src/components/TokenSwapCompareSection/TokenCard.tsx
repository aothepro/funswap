import Image from "next/image";
import {
  TokenSwapContext,
  TToken,
} from "../TokenSwap/context/TokenSwapContext";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import { getTokenImage } from "@/utils/getTokenImage";
import { CurrencyInputWithCopy } from "../CurrencyInputWithCopy/CurrencyInputWithCopy";

export enum CardType {
  FROM,
  TO,
}

export const TokenCard = ({
  token,
  cardType,
}: {
  token: TToken | null;
  cardType: CardType;
}) => {
  const [rate, setRate] = useState<number>(0);
  const [inFlight, setInFlight] = useState(false);

  const { conversionDetails, setConversionDetails } =
    useContext(TokenSwapContext);

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

  const [tokenAmount, setTokenAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState("");
  const tokenRef = useRef<HTMLInputElement>(null);
  const usdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = loadToken();

    return () => {
      controller?.abort("Component unmounted");
    };
  }, [loadToken]);

  useEffect(() => {
    if (document.activeElement !== usdRef.current) {
      setUsdAmount((conversionDetails?.valueInUSD || 0) + "");
    }
    if (document.activeElement !== tokenRef.current) {
      setTokenAmount((1 / rate) * (conversionDetails?.valueInUSD || 0) + "");
    }
  }, [conversionDetails, rate]);

  return (
    <div className="cursor-pointer w-md">
      <div className="relative">
        <span
          className={`absolute ms-2 z-10 ${
            cardType === CardType.FROM ? "left-0 top-2" : "right-0 top-2"
          } bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-white`}
        >
          {cardType === CardType.FROM ? "From" : "To"}
        </span>
      </div>
      <div
        className={`flex items-center min-h-52 bg-white border border-gray-200 rounded-lg shadow-sm hover:scale-105 transition-all ${
          cardType === CardType.FROM
            ? "hover:from-indigo-400 hover:to-teal-500 bg-linear-to-r/srgb from-indigo-500 to-teal-400"
            : "hover:from-violet-400 hover:to-fuchsia-500 bg-linear-to-bl from-violet-500 to-fuchsia-500"
        }`}
      >
        {token === null ? (
          <div
            className={`flex items-center m-auto ${
              cardType === CardType.FROM && "flex-row-reverse"
            }`}
          >
            <Image
              className="size-6 animate-bounce my-auto"
              aria-hidden
              src="/icons/uparrow.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            <div className="text-xl text-white">Select a Token to swap</div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 items-center w-full">
            <div className="flex items-center gap-3">
              <Image
                src={getTokenImage(token.symbol)}
                width={32}
                height={32}
                alt={`token ${token.symbol}`}
              />
              <div className="text-2xl font-bold tracking-tight text-white">
                {token?.symbol}
              </div>
            </div>
            <div className="font-normal text-gray-700 dark:text-gray-400">
              {inFlight ? (
                <div className="flex h-[108px]">
                  <div className="flex gap-2 my-auto backdrop-blur-3xl p-2 rounded-full outline-1">
                    <Spinner />
                    <div className="my-auto text-lg font-bold leading-none tracking-tight text-white pe-3">
                      Fetching latest price
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <CurrencyInputWithCopy
                    ref={usdRef}
                    input={usdAmount}
                    symbol={"USD"}
                    onChange={(e, input) => {
                      setConversionDetails({
                        valueInUSD: parseFloat(input),
                        symbol: token?.symbol || "",
                      });
                      setUsdAmount(input);
                    }}
                  />
                  <CurrencyInputWithCopy
                    ref={tokenRef}
                    input={tokenAmount}
                    symbol={token.symbol}
                    onChange={(e, input) => {
                      setConversionDetails({
                        valueInUSD: rate * parseFloat(input),
                        symbol: token?.symbol || "",
                      });
                      setTokenAmount(input);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
