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
  useState,
} from "react";
import { Spinner } from "../Spinner/Spinner";

export const TokenCard = ({ token }: { token: TToken | null }) => {
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

  if (token == null) {
    return (
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex gap-3">Select a Token</div>
      </div>
    );
  }

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 hover:scale-110 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
        {inFlight ? (
          <Spinner />
        ) : (
          <div className="flex gap-3">
            <input
              type="text"
              id="small-input"
              onBlur={changeConversionHandler}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
              value={amountInput}
              onChange={(e) => {
                setAmount(e.currentTarget.value);
              }}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label
              htmlFor="small-input"
              className="block m-auto text-sm font-medium text-gray-900 dark:text-white"
            >
              {token.symbol}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
