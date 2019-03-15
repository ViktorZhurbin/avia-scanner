const mockTickets = require('../../mockData/rawTicketsResponse');
const {
    findObjectByValue,
} = require('../helpers');

describe('Test findObjectByValue util', () => {
    it('gets the right object', () => {
        const array = mockTickets.Carriers;
        const testKey = 'Name';
        const testValue = 'Ryanair';
        const result = findObjectByValue(array, testKey, testValue);
        expect(result[testKey]).toEqual(testValue);
    });

    it('cannot find an object', () => {
        const array = mockTickets.Carriers;
        const testKey = 'Name';
        const testValue = 'Blabla';
        const result = findObjectByValue(array, testKey, testValue);
        expect(result).toEqual(null);
    })
});
