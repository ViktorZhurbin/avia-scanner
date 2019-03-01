import dayjs from 'dayjs';

import getBrowserLocale from './getBrowserLocale';

export const getISODateString = date => (
    (date && dayjs(date).isValid())
        ? dayjs(date).format('YYYY-MM-DD')
        : null
);

export const formatDateByBrowserLocale = (dateString) => {
    const locale = getBrowserLocale();
    const date = new Date(dateString);
    return dayjs(date).isValid()
        ? new Intl.DateTimeFormat(locale).format(date)
        : null;
};

export const getFlightTimeDate = (dateString) => {
    const [date, time] = dateString.split('T');

    return {
        time,
        date,
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
