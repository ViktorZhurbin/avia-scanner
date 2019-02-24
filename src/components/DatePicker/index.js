import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { OPEN_UP } from 'react-dates/constants';

const formatDate = date => (
    moment(date).format('YYYY-MM-DD')
);

class DatePicker extends React.Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
    }

    state = {
        date: null,
    }

    onDateChange = (date) => {
        const { handleChange } = this.props;

        this.setState({
            date,
        }, () => {
            if (date) {
                handleChange(formatDate(date));
            }
        });
    }

    render() {
        return (
            <SingleDatePicker
                date={this.state.date}
                id="date"
                onDateChange={this.onDateChange}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                required
                noBorder
                openDirection={OPEN_UP}
                placeholder="Departure"
            />
        );
    }
}

export default DatePicker;
