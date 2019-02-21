import React from 'react';

import Button from './PurchaseButton';
import FlightInfo from './FlightInfo';
import Stops from './Stops';

import ticketProps from '../../entities/props';
import genericLogo from '../../assets/generic-logo.png';

import styles from './TicketCard.module.css';

const TicketCard = ({ ticket }) => {
    const {
        origin,
        originName,
        destination,
        destinationName,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        stops,
        price,
    } = ticket;

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
                    time={departureTime}
                    city={`${origin}, ${originName}`}
                    date={departureDate}
                />
                <Stops stops={stops} />
                <FlightInfo
                    time={arrivalTime}
                    city={`${destination}, ${destinationName}`}
                    date={arrivalDate}
                />
            </div>
        </div>
    );
};

TicketCard.propTypes = {
    ticket: ticketProps.isRequired,
};

export default TicketCard;
