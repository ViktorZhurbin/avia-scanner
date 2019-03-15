const _ = require('lodash');

const self = module.exports = {
    findObjectByValue: (array, testKey, testValue) => {
        const result = array.find(item => item[testKey] === testValue)

        return result ? result : null;
    },

    getPrice: (array, testKey, testValue) => {
        const obj = self.findObjectByValue(array, testKey, testValue);

        const options = obj && obj.PricingOptions[0];
        const price = options ? options.Price : null;
        const link = options ? options.DeeplinkUrl : null;

        return { price, link };
    },

    getId: (ticket) => {
        const {
            originStation,
            departure,
            destinationStation,
            arrival,
        } = ticket;

        return [originStation, departure, destinationStation, arrival].filter(item => Boolean(item)).join('-');
    },

    getLocation: (places, placeId) => {
        const firstRun = self.findObjectByValue(places, 'Id', placeId);
        if (firstRun.Type === 'City') {
            return firstRun;
        }

        return self.findObjectByValue(places, 'Id', firstRun.ParentId);
    },

    getArrayOfUniqueKeys: (arr, key) => {
        const keyValues = arr.map(item => item[key]);

        return _.uniq(keyValues).sort();
    },
}