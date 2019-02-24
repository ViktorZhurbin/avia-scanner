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

    return price;
};

const getId = (ticket) => {
    const {
        originStation,
        departure,
        destinationStation,
        arrival,
    } = ticket;

    return [originStation, departure, destinationStation, arrival].join('-');
};

export default (ticketsData) => {
    const {
        Legs: tickets,
        Places: places,
        Carriers: carriersList,
        Itineraries: itineraries,
    } = ticketsData;
    const ticketsSlice = tickets.slice(0, 20);
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
            id: getId(camelCased),
            stops: stops.length,
            originStation: findObjectByValue(places, 'Id', originStation),
            destinationStation: findObjectByValue(places, 'Id', destinationStation),
            flightCarrier: findObjectByValue(carriersList, 'Id', carriers[0]),
            price: getPrice(itineraries, `${directionality}LegId`, id),
        };

        return formattedItem;
    });

    const filtered = filter(formatted, item => item.price > 0);
    const sorted = sortBy(filtered, ['price']);
    const unique = uniqBy(sorted, 'id');

    return unique;
};
