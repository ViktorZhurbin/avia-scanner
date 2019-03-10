import dayjs from 'dayjs';

import getBrowserLocale from './getBrowserLocale';

export const dateToIsoString = date => (
    (date && dayjs(date).isValid())
        ? dayjs(date).format('YYYY-MM-DD')
        : null
);

export const getTodayPlusNDaysIsoString = (days) => {
    const date = dayjs().add(days, 'day');

    return dateToIsoString(date);
};

export const formatDateByBrowserLocale = (dateString) => {
    const locale = getBrowserLocale();
    const date = new Date(dateString);
    return dayjs(date).isValid()
        ? new Intl.DateTimeFormat(locale).format(date)
        : null;
};

export const getFlightTimeDate = (dateString, locale) => {
    const formatted = dayjs(dateString).format('DD MMM YYYY[@]HH:mm');
    const [date, time] = formatted.split('@');

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    const formattedParts = formatter.formatToParts(new Date(date));

    const dateObj = {};
    formattedParts.forEach(({ type, value }) => {
        dateObj[type] = value;
    });

    const {
        year,
        month,
        day,
        weekday,
    } = dateObj;

    const resultDate = `${day} ${month} ${year}, ${weekday}`;

    return {
        time,
        date: resultDate,
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
