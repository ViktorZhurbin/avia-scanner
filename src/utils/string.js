import date from 'date-and-time';

export const getTimeDate = (dateString) => {
    const dateObject = new Date(dateString);
    date.locale('en');

    return {
        time: date.format(dateObject, 'hh:mm'),
        date: date.format(dateObject, 'D MMM YYYY, ddd'),
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
