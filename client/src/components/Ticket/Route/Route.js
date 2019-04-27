import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { getFlightTimeDate } from '../../../utils/dateTime';

import styles from './Route.css';

const cx = cl.bind(styles);

const Route = ({ dateString, location, locale }) => {
    const { time, date } = getFlightTimeDate(dateString, locale);

    return (
        <div className={cx('flightInfo')}>
            <div className={cx('time')}>{time}</div>
            <div className={cx('location')}>{location}</div>
            <div className={cx('date')}>{date}</div>
        </div>
    );
};

Route.propTypes = {
    location: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    dateString: PropTypes.string.isRequired,
};

export default React.memo(Route);
