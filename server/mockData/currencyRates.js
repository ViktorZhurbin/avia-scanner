module.exports = {
    mockRates: (baseCurrency) => {
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
                USD: 0.015,
                EUR: 0.013,
                RUB: 1,
            },
        };

        return map[baseCurrency];
    }
}