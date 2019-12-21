import dayjs from 'dayjs';

import {
    dateToIsoString,
    formatDateByLocale,
    getFlightTimeDate
} from '../dateTime';

describe('Test dateToIsoString util', () => {
    it('check valid date', () => {
        const date = dayjs('Thu Mar 14 2030 10:00:00 GMT+0000');
        const value = dateToIsoString(date);
        expect(value).toEqual('2030-03-14');
    });

    it('check invalid date', () => {
        const date = dayjs('Thu Smth Mar 14 2030 10:00:00 GMT+W');
        const value = dateToIsoString(date);
        expect(value).toEqual(null);
    });
});

describe('Test formatDateByLocale util', () => {
    it('format to en-US date', () => {
        const value = formatDateByLocale('2030-03-28', 'en-US');
        expect(value).toEqual('3/28/2030');
    });

    it('format to ru-RU date', () => {
        const value = formatDateByLocale('2030-03-28', 'ru-RU');
        expect(value).toEqual('28.03.2030');
    });
});

describe('Test getFlightTimeDate util', () => {
    it('format to en-US locale', () => {
        const value = getFlightTimeDate('2030-03-28T11:30:00', 'en-US');
        const expected = {
            time: '11:30',
            date: '28 Mar 2030, Thu'
        };

        expect(value).toEqual(expected);
    });

    it('format to ru-RU locale', () => {
        const value = getFlightTimeDate('2030-03-28T11:30:00', 'ru-RU');
        const expected = {
            time: '11:30',
            date: '28 мар. 2030, чт'
        };

        expect(value).toEqual(expected);
    });
});
