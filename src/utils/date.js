import date from 'date-and-time';

export default (dateString) => {
    const [day, monthIndex, year] = dateString.split('.');
    const dateObj = new Date(`20${year}`, monthIndex - 1, day);
    date.locale('ru');
    const formattedDate = date.format(dateObj, 'D MMM YYYY, ddd');

    return formattedDate;
};
