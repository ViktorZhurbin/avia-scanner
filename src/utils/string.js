import moment from 'moment';

export const getFlightTimeDate = (dateString, locale) => {
    const dateObject = new Date(dateString);
    moment.locale(locale);

    return {
        time: moment(dateObject).format('HH:mm'),
        date: moment(dateObject).format('D MMM YYYY, ddd'),
    };
};

export const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(price);
};
