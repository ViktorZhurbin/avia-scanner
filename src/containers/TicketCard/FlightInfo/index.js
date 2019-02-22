import React from 'react';
import PropTypes from 'prop-types';

import { getTimeDate } from '../../../utils/string';

import styles from './FlightInfo.module.css';

const FlightInfo = ({ dateString, city }) => {
    const { time, date } = getTimeDate(dateString);

    return (
        <div className={styles.flightInfo}>
            <div className={styles.time}>{time}</div>
            <div className={styles.city}>{city}</div>
            <div className={styles.date}>{date}</div>
        </div>
    );
};

FlightInfo.propTypes = {
    city: PropTypes.string.isRequired,
    dateString: PropTypes.string.isRequired,
};

export default FlightInfo;
