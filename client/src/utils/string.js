import qs from 'query-string';

export const formatPrice = (price, currencyCode, locale) => {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(price);
};

export const convertPrice = (price, toCurrency, rates) => {
    const parsed = Number.parseFloat(price);
    const exchangeRate = rates[toCurrency];
    const rounded = (parsed * exchangeRate).toFixed();

    return Number.parseInt(rounded, 10);
};

export const getDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    const format = (num, str) => (
        num > 0 ? `${num}${str}` : ''
    );

    return `${format(hours, 'h ')}${format(min, 'm')}`;
};

export const validateQuery = (query) => {
    const queryObject = qs.parse(query);
    const requiredKeys = ['origin', 'destination', 'departure', 'currency', 'locale'];
    if (Object.keys(queryObject).length !== requiredKeys.length) {
        return false;
    }
    const testValues = requiredKeys.map(item => queryObject[item] && queryObject[item].length > 0);

    return testValues.length === requiredKeys.length;
};
