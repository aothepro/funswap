import Image from "next/image";
import {
  TokenSwapContext,
  TToken,
} from "../TokenSwap/context/TokenSwapContext";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Spinner } from "../Spinner/Spinner";

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

  const [amountInput, setAmount] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = loadToken();

    return () => {
      controller?.abort("Component unmounted");
    };
  }, [loadToken]);

  useEffect(() => {
    if (conversionDetails?.symbol !== token?.symbol)
      setAmount((1 / rate) * (conversionDetails?.valueInUSD || 1) + "");
  }, [conversionDetails, rate, token?.symbol]);

  const changeConversionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.split("").reduce(
      (acc, value) => {
        if (/\d/.test(value) && !(value == "0" && acc.result.length == 0)) {
          acc.result += value;
        } else if (value === "." && !acc.hasDecimal) {
          acc.result += acc.result.length === 0 ? "0" + value : value;
          acc.hasDecimal = true;
        }
        return acc;
      },
      { result: "", hasDecimal: false }
    ).result;

    setAmount(cleaned);
    setConversionDetails({
      symbol: token?.symbol ?? "",
      valueInUSD: parseFloat(cleaned) * rate,
    });
  };

  return (
    <div className="w-full cursor-pointer">
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
        onClick={() => {
          if (inputRef == null) return;
          inputRef.current?.focus();
          inputRef.current?.select();
        }}
        className={`flex items-center min-h-52 bg-white border border-gray-200 rounded-lg shadow-sm hover:scale-105 ${
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
            <div className="text-xl">Select a Token to swap</div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center gap-3">
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              <h5 className="text-2xl font-bold tracking-tight text-white">
                {token?.symbol}
              </h5>
            </div>
            <div className="font-normal text-gray-700 dark:text-gray-400">
              {inFlight ? (
                <div className="flex gap-2">
                  <Spinner />
                  <div className="my-auto text-white">
                    Fetching Latest Price
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="token-value"
                    ref={inputRef}
                    onChange={changeConversionHandler}
                    value={amountInput}
                    className="p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <label
                    htmlFor="token-value"
                    className="block m-auto text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {token?.symbol}
                  </label>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
