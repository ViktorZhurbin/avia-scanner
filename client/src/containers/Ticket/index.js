import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import BuyButton from './BuyButton';
import Route from './Route';
import Path from './Path';

import { formatPrice } from '../../utils/string';
import { ticketPropType } from '../../entities/propTypes';
import genericLogo from '../../assets/generic-logo.png';

import styles from './index.css';

const cx = classNames.bind(styles);

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
        // stops,
        offer,
        carrier,
        duration,
    } = ticket;

    const price = formatPrice(offer.price, currency, rates, locale);

    return (
        <div className={cx('card')}>
            <div className={cx('left')}>
                <img
                    src={carrier.ImageUrl || genericLogo}
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
    currency: PropTypes.string.isRequired,
    rates: PropTypes.objectOf(PropTypes.number).isRequired,
};

Ticket.defaultProps = {};

export default React.memo(Ticket);
