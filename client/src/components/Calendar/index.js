import React from 'react';
import PropTypes from 'prop-types';

const Calendar = React.lazy(() => import('react-calendar'));

const MyCalendar = ({ onDateSelect, value }) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        <Calendar
            onChange={onDateSelect}
            date={value}
        />
    </React.Suspense>
);

MyCalendar.propTypes = {
    onDateSelect: PropTypes.func.isRequired,
    value: PropTypes.string,
};

MyCalendar.defaultProps = {
    value: null,
};

export default React.memo(MyCalendar);
