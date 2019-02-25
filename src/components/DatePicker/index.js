import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { ICON_AFTER_POSITION, OPEN_UP } from 'react-dates/constants';

class DatePicker extends React.Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
    }

    state = {
        date: moment().add(1, 'days'),
    }

    componentDidMount() {
        const { date } = this.state;
        const { handleChange } = this.props;

        if (date) {
            handleChange('departure', date);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { date } = this.state;
        const { handleChange } = this.props;

        console.log('did');
        if (prevState.date !== date) {
            handleChange('departure', date);
        }
    }

    onDateChange = (date) => {
        const { handleChange } = this.props;

        this.setState({
            date,
        }, () => {
            if (date) {
                handleChange('departure', date);
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
                placeholder="Departure"
                showClearDate={Boolean(this.state.date)}
                showDefaultInputIcon={!this.state.date}
                inputIconPosition={ICON_AFTER_POSITION}
                openDirection={OPEN_UP}
                withPortal
                hideKeyboardShortcutsPanel
                transitionDuration={100}
            />
        );
    }
}

export default DatePicker;
