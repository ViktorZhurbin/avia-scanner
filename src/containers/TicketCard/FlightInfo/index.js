import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { getFlightTimeDate } from '../../../utils/string';

import styles from './index.css';

const cx = cl.bind(styles);

const FlightInfo = ({ dateString, city }) => {
    const { time, date } = getFlightTimeDate(dateString);

    return (
        <div className={cx('flightInfo')}>
            <div className={cx('time')}>{time}</div>
            <div className={cx('city')}>{city}</div>
            <div className={cx('date')}>{date}</div>
        </div>
    );
};

FlightInfo.propTypes = {
    city: PropTypes.string.isRequired,
    dateString: PropTypes.string.isRequired,
};

export default FlightInfo;
