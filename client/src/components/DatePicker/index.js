import React from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import { ICON_AFTER_POSITION, OPEN_UP } from 'react-dates/constants';
import 'moment/min/locales.min';

import { getBrowserLocale } from '../../utils/locale';

class DatePicker extends React.Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        date: PropTypes.object, // eslint-disable-line
        placeholder: PropTypes.string,
    }

    static defaultProps = {
        placeholder: null,
        date: null,
    };

    state = {
        focused: false,
    }

    async componentDidMount() {
        const locale = getBrowserLocale();
        const [lang] = locale.split('-');
        const { default: moment } = await import(/* webpackChunkName: "moment" */ 'moment');
        moment.locale(lang);
    }

    onDateChange = (date) => {
        this.props.handleChange('departure', date);
    }

    render() {
        const { date, placeholder } = this.props;

        return (
            <SingleDatePicker
                date={date}
                id="date"
                onDateChange={this.onDateChange}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                required
                noBorder
                placeholder={placeholder}
                showClearDate={Boolean(date)}
                showDefaultInputIcon={!date}
                inputIconPosition={ICON_AFTER_POSITION}
                openDirection={OPEN_UP}
                withPortal
                hideKeyboardShortcutsPanel
                transitionDuration={100}
                numberOfMonths={1}
            />
        );
    }
}

export default DatePicker;
