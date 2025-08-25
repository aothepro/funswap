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
import { getTokenImage } from "@/utils/getTokenImage";

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
  const [showTooltip, setShowTooltip] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);

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

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!navigator.clipboard) {
      inputRef.current?.focus();
      inputRef.current?.select();
      document.execCommand("copy");
      setIsContentCopied(true);
    } else {
      await navigator.clipboard.writeText(amountInput).then(() => {
        setIsContentCopied(true);
      });
    }

    setTimeout(() => {
      setIsContentCopied(false);
      setShowTooltip(false);
    }, 2000);
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
                <div className="flex gap-3 px-5">
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
                  <div>
                    {showTooltip && (
                      <div className="relative">
                        <div className="absolute -translate-y-10 z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none">
                          {isContentCopied ? "Copied" : "Copy"}
                        </div>
                      </div>
                    )}
                    <button
                      onMouseEnter={() => {
                        setShowTooltip(true);
                      }}
                      onMouseLeave={() => {
                        if (!isContentCopied) setShowTooltip(false);
                      }}
                      onClick={handleCopy}
                      className="cursor-pointer rounded-lg dark:bg-gray-800 bg-gray-50 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      <div className="h-4 w-4">
                        <svg
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-gray-500 dark:fill-amber-500"
                            d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
