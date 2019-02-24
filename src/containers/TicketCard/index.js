import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Button from './PurchaseButton';
import FlightInfo from './FlightInfo';
import Stops from './Stops';

import ticketProps from '../../entities/propTypes';
import genericLogo from '../../assets/generic-logo.png';

import styles from './index.css';

const cx = classNames.bind(styles);

const TicketCard = ({ ticket, onFilterReset }) => {
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

    const origin = `${originStation.Code}, ${originStation.Name}`;
    const destination = `${destinationStation.Code}, ${destinationStation.Name}`;

    return (
        <div className={cx('card')}>
            <div className={cx('left')}>
                <img
                    src={genericLogo}
                    alt="Airline Logo"
                    className={cx('companyLogo')}
                />
                <Button price={price} />
            </div>
            <div className={cx('right')}>
                <FlightInfo
                    city={origin}
                    dateString={departure}
                />
                <Stops stops={stops} />
                <FlightInfo
                    city={destination}
                    dateString={arrival}
                />
            </div>
        </div>
    );
};

TicketCard.propTypes = {
    ticket: ticketProps,
    onFilterReset: PropTypes.func,
};

TicketCard.defaultProps = {
    ticket: null,
    onFilterReset: () => null,
};

export default TicketCard;
