const { getMockTickets } = require('../../mockData/rawTicketsResponse');
const { formatTickets } = require('../formatTickets');
const {
    findObjectByValue,
    getPrice,
    getId,
    getLocation,
    getArrayOfUniqueKeys
} = require('../helpers');

const mockData = getMockTickets('2020-11-29');
const formattedMockTickets = formatTickets(mockData);

describe('Test findObjectByValue util', () => {
    const array = mockData.Carriers;
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
    const array = mockData.Itineraries;
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
        const expected = '11051-2020-11-29T18:50:00-11154-2020-11-29T08:00:00';
        expect(result).toEqual(expected);
    });
});

describe('Test getLocation util', () => {
    const array = mockData.Places;
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
        expect(result).toEqual([1, 2]);
    });
});
