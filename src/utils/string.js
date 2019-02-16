import date from 'date-and-time';

export const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('.');
    const dateObj = new Date(`20${year}`, month - 1, day);
    date.locale('ru');
    const formattedDate = date.format(dateObj, 'D MMM YYYY, ddd');

    return formattedDate;
};

export const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
    });

    return formatter.format(price);
};
