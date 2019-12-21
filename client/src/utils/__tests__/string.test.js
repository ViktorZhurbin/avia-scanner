import {
    formatPrice,
    convertPrice,
    getDuration,
    validateQueryString
} from '../string';
import { currencyRates } from '../../constants/mockData';

describe('Test getDuration util', () => {
    it('with 59 minutes', () => {
        const value = getDuration(59);
        expect(value).toEqual('59m');
    });

    it('with 61 minutes', () => {
        const value = getDuration(61);
        expect(value).toEqual('1h 1m');
    });
});

describe('Test convertPrice util', () => {
    it('convert to RUB from USD', () => {
        const value = convertPrice(100, 'RUB', currencyRates('USD'));
        expect(value).toEqual(6000);
    });

    it('convert to USD from RUB', () => {
        const value = convertPrice(12000, 'USD', currencyRates('RUB'));
        expect(value).toEqual(200);
    });

    it('convert to USD from EUR', () => {
        const value = convertPrice(100, 'USD', currencyRates('EUR'));
        expect(value).toEqual(110);
    });
});

describe('Test formatPrice util', () => {
    it('format RUB in ru-RU locale', () => {
        const value = formatPrice(1000, 'RUB', 'ru-RU');
        expect(value).toEqual('1 000 ₽');
    });

    it('format USD in en-US locale', () => {
        const value = formatPrice(1000, 'USD', 'en-US');
        expect(value).toEqual('$1,000');
    });

    it('format EUR in de-DE locale', () => {
        const value = formatPrice(1000, 'EUR', 'de-DE');
        expect(value).toEqual('1.000 €');
    });
});

describe('Test validateQueryString util with correct query string', () => {
    const query = '?origin=DME&destination=DUB&currency=USD&locale=en-US&departure=2019-03-28';
    const { isValid, missingValues } = validateQueryString(query);
    it('check isValid', () => {
        expect(isValid).toBeTruthy();
    });
    it('check missingValues', () => {
        expect(missingValues).toHaveLength(0);
    });
});

describe('Test validateQueryString util with bad query string', () => {
    const query = '?origin=&destination=&currency=USD&locale=en-US';
    const valuesToBeMissing = ['origin', 'destination', 'departure'];
    const { isValid, missingValues } = validateQueryString(query);
    it('check isValid', () => {
        expect(isValid).toBeFalsy();
    });
    it('check missingValues', () => {
        expect(missingValues).toEqual(valuesToBeMissing);
    });
});
