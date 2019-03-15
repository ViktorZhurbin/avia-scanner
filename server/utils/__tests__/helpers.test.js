const mockTickets = require('../../mockData/rawTicketsResponse');
const {
    findObjectByValue,
    getPrice,
} = require('../helpers');

describe('Test findObjectByValue util', () => {
    const array = mockTickets.Carriers;
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
    const array = mockTickets.Itineraries;
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

