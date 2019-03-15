const {
    findObjectByValue,
} = require('../helpers');

describe('Test findObjectByValue util', () => {
    it('gets the right value', () => {
        const array = [];
        const searchKey = '';
        const inputValue = '';
        const result = findObjectByValue(array, searchKey, inputValue);
        expect(result).toEqual();
    })
});
