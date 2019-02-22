import {
    camelCase,
    mapKeys,
    sortBy,
    uniqueId,
} from 'lodash';

import mockTicketData from '../server/mockTicketData';

export const formatTicketData = (data) => {
    const formatted = data.map((item) => {
        const camelCased = mapKeys(item, (value, key) => camelCase(key));
        camelCased.id = uniqueId();

        return camelCased;
    });

    return sortBy(formatted, ['price']);
};


const findObjectByValue = (array, searchKey, inputValue) => (
    array.find(item => item[searchKey] === inputValue)
);

const getPrice = (arr, searchKey, inputValue) => (
    findObjectByValue(arr, searchKey, inputValue)
        .PricingOptions[0]
        .Price
);

export const getFormattedTickets = () => {
    // const ticketData = await fetchTickets();
    const {
        Legs: tickets,
        Places: places,
        Carriers: carriersList,
        Itineraries: itineraries,
    } = mockTicketData;
    const ticketsSlice = tickets.slice(0, 10);
    const formatted = ticketsSlice.map((item) => {
        const camelCased = mapKeys(item, (value, key) => camelCase(key));
        const {
            id,
            carriers,
            destinationStation,
            originStation,
            stops,
            directionality,
        } = camelCased;

        const formattedItem = {
            ...camelCased,
            stops: stops.length,
            originStation: findObjectByValue(places, 'Id', originStation),
            destinationStation: findObjectByValue(places, 'Id', destinationStation),
            flightCarrier: findObjectByValue(carriersList, 'Id', carriers[0]),
            price: getPrice(itineraries, `${directionality}LegId`, id),
        };

        return formattedItem;
    });

    return sortBy(formatted, ['price']);
};
