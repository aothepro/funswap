import { useState, ChangeEvent, Ref } from "react";

export const CurrencyInputWithCopy = ({
  input,
  symbol,
  ref,
  onChange,
}: {
  input: string;
  symbol: string;
  ref: Ref<HTMLInputElement>;
  onChange: (input: string) => void;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);

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

    onChange(cleaned);
  };

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await navigator.clipboard.writeText(input).then(() => {
      setIsContentCopied(true);
    });

    setTimeout(() => {
      setIsContentCopied(false);
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <div className="flex gap-3 px-5 h-12">
      <input
        type="text"
        id="token-value"
        ref={ref}
        onChange={(e) => changeConversionHandler(e)}
        value={input}
        className="p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <label
        htmlFor="token-value"
        className="block m-auto text-sm font-medium text-gray-900 dark:text-white"
      >
        {symbol}
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
          className="cursor-pointer rounded-lg dark:bg-gray-800 bg-gray-50 py-3 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          aria-label={`copy ${symbol} token value`}
        >
          <div className="h-4 w-4">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path
                className="fill-gray-500 dark:fill-white"
                d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
