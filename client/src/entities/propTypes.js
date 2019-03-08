import PropTypes from 'prop-types';

const mixedObject = PropTypes.objectOf(
    PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
);

export const classNamesPropType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
    )]);

export const ticketPropType = PropTypes.shape({
    arrival: PropTypes.string,
    departure: PropTypes.string,
    origin: mixedObject,
    destination: mixedObject,
    directionality: PropTypes.string,
    direction: PropTypes.number,
    carrier: mixedObject,
    carriers: PropTypes.arrayOf(PropTypes.number),
    flightNumbers: PropTypes.arrayOf(mixedObject),
    operatingCarriers: PropTypes.arrayOf(
        PropTypes.number,
    ),
    id: PropTypes.string,
    journeyMode: PropTypes.string,
    segments: PropTypes.arrayOf(
        PropTypes.number,
    ),
    stops: PropTypes.number,
    offer: PropTypes.shape({
        price: PropTypes.number,
        link: PropTypes.string,
    }),
});

export const placePropType = PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
});

export const searchPropType = PropTypes.shape({
    locale: PropTypes.string,
    currency: PropTypes.string,
    origin: placePropType,
    destination: placePropType,
    departure: PropTypes.string,
});
