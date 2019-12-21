import dayjs from 'dayjs';

export const dateToIsoString = (date) => {
    const result = (date && dayjs(date).isValid())
        ? dayjs(date).format('YYYY-MM-DD')
        : null;

    return result;
};

export const getTodayPlusNDaysIsoString = (days) => {
    const date = dayjs().add(days, 'day');

    return dateToIsoString(date);
};

export const formatDateByLocale = (dateString, locale) => {
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
        weekday: 'short'
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
        weekday
    } = dateObj;

    const resultDate = `${day} ${month} ${year}, ${weekday}`;

    return {
        time,
        date: resultDate
    };
};
