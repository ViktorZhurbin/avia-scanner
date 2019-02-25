import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import BuyButton from './BuyButton';
import Route from './Route';
import Path from './Path';

import ticketProps from '../../entities/propTypes';
import genericLogo from '../../assets/generic-logo.png';

import styles from './index.css';

const cx = classNames.bind(styles);

const Ticket = ({ ticket, onFilterReset }) => {
    if (!ticket) {
        return (
            <div className={cx(['card', 'empty'])}>
                <div className={cx('infoText')}>
                    There were no tickets that matched your filter settings.
                </div>
                <div className={cx('hintText')}>
                    {/* eslint-disable-next-line */}
                    <span
                        className={cx('resetButton')}
                        onClick={onFilterReset}
                    >
                        Reset
                    </span>
                    filters to see more of the tickets we found.
                </div>
            </div>
        );
    }

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
    onFilterReset: PropTypes.func,
};

Ticket.defaultProps = {
    ticket: null,
    onFilterReset: () => null,
};

export default Ticket;
