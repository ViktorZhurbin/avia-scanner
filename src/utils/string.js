import moment from 'moment';

export const getFlightTimeDate = (dateString, locale) => {
    const dateObject = new Date(dateString);
    moment.locale(locale);

    return {
        time: moment(dateObject).format('HH:mm'),
        date: moment(dateObject).format('D MMM YYYY, ddd'),
    };
};

export const formatPrice = (price, currencyCode, rates, locale) => {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const converted = price * rates[currencyCode];

    return formatter.format(converted);
};

export const getDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    const format = (num, str) => (
        num > 0 ? `${num}${str}` : ''
    );

    return `${format(hours, 'h ')}${format(min, 'm')}`;
};
