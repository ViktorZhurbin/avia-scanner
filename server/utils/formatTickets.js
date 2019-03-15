const _ = require('lodash');

const {
    findObjectByValue,
    getPrice,
    getId,
    getLocation,
    getArrayOfUniqueKeys,
} = require('./helpers');

module.exports = {
    formatTickets: (ticketsData) => {
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
        const filteredTickets = _.filter(allTickets, ({ stops }) => stops === stopOptions[0]);

        return {
            allTickets,
            filteredTickets,
            stopOptions,
        };
    },
};
