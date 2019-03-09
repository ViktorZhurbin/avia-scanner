import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import BuyButton from './BuyButton';
import Route from './Route';
import Path from './Path';

import { formatPrice } from '../../utils/string';
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

    const price = formatPrice(offer.price, currency.code, rates, locale);

    return (
        <div className={cx('card')}>
            <div className={cx('left')}>
                <img
                    src={carrier.ImageUrl}
                    alt="Carrier Logo"
                    className={cx('carrierLogo')}
                />
                <BuyButton
                    price={price}
                    link={offer.link}
                />
            </div>
            <div className={cx('right')}>
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

const mapStateToProps = ({ search }) => ({
    currency: search.currency,
    locale: search.locale,
});

export default React.memo(connect(mapStateToProps, null)(Ticket));
