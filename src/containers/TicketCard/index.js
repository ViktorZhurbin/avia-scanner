import React from 'react';

import Button from './PurchaseButton';
import FlightInfo from './FlightInfo';
import Stops from './Stops';

import ticketProps from '../../entities/props';
import genericLogo from '../../assets/generic-logo.png';

import styles from './TicketCard.module.css';

const TicketCard = ({ ticket }) => {
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
        <div className={styles.card}>
            <div className={styles.left}>
                <img
                    src={genericLogo}
                    alt="Airline Logo"
                    className={styles.companyLogo}
                />
                <Button price={price} />
            </div>
            <div className={styles.right}>
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
    ticket: ticketProps.isRequired,
};

export default TicketCard;
