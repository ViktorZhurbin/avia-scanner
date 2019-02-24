import PropTypes from 'prop-types';

const mixedObject = PropTypes.objectOf(
    PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
);

export default PropTypes.shape({
    arrival: PropTypes.string,
    departure: PropTypes.string,
    carriers: PropTypes.arrayOf(
        PropTypes.number,
    ),
    originStation: mixedObject,
    destinationStation: mixedObject,
    directionality: PropTypes.string,
    direction: PropTypes.number,
    flightCarrier: mixedObject,
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
    price: PropTypes.number,
});
