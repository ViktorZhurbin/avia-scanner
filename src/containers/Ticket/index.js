import React from 'react';
import classNames from 'classnames/bind';

import BuyButton from './BuyButton';
import Route from './Route';
import Path from './Path';

import ticketProps from '../../entities/propTypes';
import genericLogo from '../../assets/generic-logo.png';

import styles from './index.css';

const cx = classNames.bind(styles);

const Ticket = ({ ticket }) => {
    const {
        originStation,
        destinationStation,
        departure,
        arrival,
        stops,
        price,
    } = ticket;

    return (
        <div className={cx('card')}>
            <div className={cx('left')}>
                <img
                    src={genericLogo}
                    alt="Airline Logo"
                    className={cx('companyLogo')}
                />
                <BuyButton price={price} />
            </div>
            <div className={cx('right')}>
                <Route
                    location={originStation.Name}
                    dateString={departure}
                />
                <Path stops={stops} />
                <Route
                    location={destinationStation.Name}
                    dateString={arrival}
                />
            </div>
        </div>
    );
};

Ticket.propTypes = {
    ticket: ticketProps,
};

Ticket.defaultProps = {
    ticket: null,
};

export default Ticket;
