import React from 'react';
import PropTypes from 'prop-types';

import Calendar from 'react-calendar';

const MyCalendar = ({ onDateSelect, value }) => (
    <Calendar
        onChange={onDateSelect}
        date={value}
    />
);

MyCalendar.propTypes = {
    onDateSelect: PropTypes.func.isRequired,
    value: PropTypes.string,
};

MyCalendar.defaultProps = {
    value: null,
};

export default React.memo(MyCalendar);
