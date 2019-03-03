const _ = require('lodash');

const findObjectByValue = (array, searchKey, inputValue) => (
    array.find(item => item[searchKey] === inputValue)
);

const getPrice = (arr, searchKey, inputValue) => {
    const obj = findObjectByValue(arr, searchKey, inputValue);

    const options = obj && obj.PricingOptions[0];
    const price = options ? options.Price : null;
    const link = options ? options.DeeplinkUrl : null;

    return { price, link };
};

const getId = (ticket) => {
    const {
        originStation,
        departure,
        destinationStation,
        arrival,
    } = ticket;

    return [originStation, departure, destinationStation, arrival].filter(item => Boolean(item)).join('-');
};

const getLocation = (places, placeId) => {
    const firstRun = findObjectByValue(places, 'Id', placeId);
    if (firstRun.Type === 'City') {
        return firstRun;
    }

    return findObjectByValue(places, 'Id', firstRun.ParentId);
};

const getArrayOfUniqueKeys = (arr, key) => {
    const keyValues = arr.map(item => item[key]);

    return _.uniq(keyValues).sort();
};

module.exports = {
    format: (ticketsData) => {
        const {
            Legs: ticketList,
            Places: placeList,
            Carriers: carrierList,
            Itineraries: itineraryList,
        } = ticketsData;


        const preparedTicketData = _
            .chain(ticketList)
            .filter(({ Directionality }) => Directionality === 'Outbound')
            .map(item => _.mapKeys(item, (value, key) => _.camelCase(key)))
            .value();

        const mappedTickets = preparedTicketData.map((item) => {
            const {
                id,
                carriers,
                destinationStation,
                originStation,
                stops,
                directionality,
            } = item;

            return {
                ...item,
                id: getId(item),
                stops: stops.length,
                origin: getLocation(placeList, originStation),
                destination: getLocation(placeList, destinationStation),
                carrier: findObjectByValue(carrierList, 'Id', carriers[0]),
                offer: getPrice(itineraryList, `${directionality}LegId`, id),
            };
        });

        const allTickets = _
            .chain(mappedTickets)
            .uniqBy('id')
            .sortBy(item => item.offer.price)
            .value();

        const stopOptions = getArrayOfUniqueKeys(allTickets, 'stops');
        const filteredTickets = _.filter(allTickets, ({ stops }) => stops === stopOptions[0])

        return {
            allTickets,
            filteredTickets,
            stopOptions,
        };
    }
};
