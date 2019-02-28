import {
    camelCase,
    mapKeys,
    sortBy,
    uniqBy,
    filter,
} from 'lodash';

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

export default (ticketsData) => {
    const {
        Legs: ticketList,
        Places: placeList,
        Carriers: carrierList,
        Itineraries: itineraryList,
    } = ticketsData;

    const outboundTickets = filter(ticketList, ticket => ticket.Directionality === 'Outbound');

    const formatted = outboundTickets.map((item) => {
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
            id: getId(camelCased),
            stops: stops.length,
            origin: getLocation(placeList, originStation),
            destination: getLocation(placeList, destinationStation),
            carrier: findObjectByValue(carrierList, 'Id', carriers[0]),
            offer: getPrice(itineraryList, `${directionality}LegId`, id),
        };

        return formattedItem;
    });

    const filtered = filter(formatted, ({ offer }) => offer.price > 0);
    const sorted = sortBy(filtered, ({ offer }) => offer.price);
    const unique = uniqBy(sorted, 'id');

    return unique;
};
