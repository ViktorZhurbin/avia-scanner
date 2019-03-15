const rawMockTickets = require('../../mockData/rawTicketsResponse');
const formattedMockTickets = require('../../mockData/ticketData');
const {
    findObjectByValue,
    getPrice,
    getId,
    getLocation,
    getArrayOfUniqueKeys,
} = require('../helpers');

describe('Test findObjectByValue util', () => {
    const array = rawMockTickets.Carriers;
    const testKey = 'Name';
    it('gets the right result', () => {
        const testValue = 'Ryanair';
        const result = findObjectByValue(array, testKey, testValue);
        expect(result[testKey]).toEqual(testValue);
    });

    it('cannot find an object', () => {
        const testValue = 'Blabla';
        const result = findObjectByValue(array, testKey, testValue);
        expect(result).toEqual(null);
    });
});

describe('Test getPrice util', () => {
    const array = rawMockTickets.Itineraries;
    const testKey = 'OutboundLegId';
    it('gets the right result', () => {
        const testValue = '11051-1903290900--32090-2-11154-1903291710';
        const result = getPrice(array, testKey, testValue);
        expect(result.price).toEqual(396.03);
    });

    it('cannot find an object', () => {
        const testValue = 'Blabla';
        const result = getPrice(array, testKey, testValue);
        expect(result).toEqual({ price: null, link: null });
    });
});

describe('Test getId util', () => {
    const ticket = formattedMockTickets.allTickets[0];
    it('gets the right result', () => {
        const result = getId(ticket);
        const expected = '13554-2019-03-03T22:15:00-10413-2019-03-04T18:45:00';
        expect(result).toEqual(expected);
    });
});

describe('Test getLocation util', () => {
    const array = rawMockTickets.Places;
    it('gets the right result from city id', () => {
        const id = 6403;
        const result = getLocation(array, id);
        expect(result.Name).toEqual('Prague');
    });

    it('gets the right result from airport id', () => {
        const id = 13066;
        const result = getLocation(array, id);
        expect(result.Name).toEqual('Chisinau');
    });
});

describe('Test getArrayOfUniqueKeys util', () => {
    const array = formattedMockTickets.allTickets;
    const key = 'stops';
    it('gets the right result', () => {
        const result = getArrayOfUniqueKeys(array, key);
        expect(result).toEqual([0, 1]);
    });
});
