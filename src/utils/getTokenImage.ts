
export const getTokenImage = (symbol: string): string => {
    return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/128/icon/${symbol.toLowerCase()}.png`
};
