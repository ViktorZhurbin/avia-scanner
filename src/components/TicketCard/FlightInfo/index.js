import React from 'react';
import PropTypes from 'prop-types';

import styles from './FlightInfo.module.css';

const FlightInfo = (props) => {
    const {
        time,
        city,
        date,
    } = props;

    return (
        <div className={styles.flightInfo}>
            <div className={styles.time}>{time}</div>
            <div className={styles.city}>{city}</div>
            <div className={styles.date}>{date}</div>
        </div>
    );
};

FlightInfo.propTypes = {
    time: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default FlightInfo;
