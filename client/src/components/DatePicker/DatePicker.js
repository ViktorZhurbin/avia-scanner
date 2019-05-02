import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Loading from '../Loading';
import Dropdown from '../Dropdown';
import { classNamesPropType } from '../../entities/propTypes';

import styles from './DatePicker.css';

const cx = cl.bind(styles);

const CalendarPromise = import(/* webpackChunkName: "calendar" */ 'react-calendar');
const Calendar = React.lazy(() => CalendarPromise);

const DatePicker = ({
    trigger,
    onSelect,
    classNames,
}) => {
    const [date, setDate] = useState(new Date());

    const handleDateSelect = (newDate) => {
        setDate(newDate);
        onSelect(newDate);
    };

    return (
        <Dropdown
            classNames={{ ...classNames }}
            trigger={trigger}
        >
            <React.Suspense fallback={<Loading />}>
                <div className={cx('calendarModal')}>
                    <Calendar
                        value={date}
                        onChange={handleDateSelect}
                    />
                </div>
                <div className={cx('modalOverlay')} />
            </React.Suspense>
        </Dropdown>

    );
};

DatePicker.propTypes = {
    trigger: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired,
    classNames: classNamesPropType,
};

DatePicker.defaultProps = {
    classNames: null,
};

export default DatePicker;
