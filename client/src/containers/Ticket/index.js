import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import BuyButton from './BuyButton';
import Route from './Route';
import Path from './Path';

import { formatPrice, convertPrice } from '../../utils/string';
import { ticketPropType, codeNamePropType } from '../../entities/propTypes';

import styles from './index.css';

const cx = cl.bind(styles);

const Ticket = ({
    ticket,
    locale,
    currency,
    rates,
}) => {
    const {
        origin,
        destination,
        departure,
        arrival,
        offer,
        carrier,
        duration,
    } = ticket;

    const convertedPrice = convertPrice(offer.price, currency.code, rates);
    const formattedPrice = formatPrice(convertedPrice, currency.code, locale);

    return (
        <div className={cx('card')}>
            <div className={cx('price')}>
                <img
                    src={carrier.ImageUrl}
                    alt="Carrier Logo"
                    className={cx('carrierLogo')}
                />
                <BuyButton
                    price={formattedPrice}
                    link={offer.link}
                />
            </div>
            <div className={cx('details')}>
                <Route
                    location={origin.Name}
                    dateString={departure}
                    locale={locale}
                />
                <Path duration={duration} />
                <Route
                    location={destination.Name}
                    dateString={arrival}
                    locale={locale}
                />
            </div>
        </div>
    );
};

Ticket.propTypes = {
    ticket: ticketPropType.isRequired,
    locale: PropTypes.string.isRequired,
    currency: codeNamePropType.isRequired,
    rates: PropTypes.objectOf(PropTypes.number).isRequired,
};

Ticket.defaultProps = {};

const mapStateToProps = ({ search: { currency, locale } }) => ({
    currency,
    locale,
});

export default React.memo(
    connect(
        mapStateToProps,
    )(Ticket),
);
