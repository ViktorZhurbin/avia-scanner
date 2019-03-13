export const places = [
    {
        code: 'TXL',
        name: 'Berlin',
    },
    {
        code: 'DME',
        name: 'Moscow',
    },
    {
        code: 'DUB',
        name: 'Dublin',
    },
    {
        code: 'HEL',
        name: 'Helsinki',
    },
    {
        code: 'TBS',
        name: 'Tbilisi',
    },
];

export const currencyList = [
    {
        code: 'USD',
        name: 'US Dollar',
    },
    {
        code: 'RUB',
        name: 'Rouble',
    },
    {
        code: 'EUR',
        name: 'Euro',
    },
];

export const currencyRates = (baseCurrency) => {
    const map = {
        USD: {
            USD: 1,
            EUR: 0.8,
            RUB: 60,
        },
        EUR: {
            USD: 1.1,
            EUR: 1,
            RUB: 70,
        },
        RUB: {
            USD: 0.016666667,
            EUR: 0.013,
            RUB: 1,
        },
    };

    return map[baseCurrency];
};
