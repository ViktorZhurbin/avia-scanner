import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

// import { getBrowserLocale } from '../../utils/locale';

class DatePicker extends React.Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        date: PropTypes.instanceOf(Date),
        // placeholder: PropTypes.string,
    }

    static defaultProps = {
        // placeholder: null,
        date: null,
    };

    state = {
        // focused: false,
    }

    async componentDidMount() {
        // const locale = getBrowserLocale();
        // const [lang] = locale.split('-');
        // const { default: moment } = await import(/* webpackChunkName: "moment" */ 'moment');
        // moment.locale(lang);
    }

    onDateChange = (date) => {
        this.props.handleChange('departure', date);
    }

    render() {
        const { date /* placeholder */ } = this.props;

        return (
            <Calendar
                onChange={this.onDateChange}
                value={date}
            />
        );
    }
}

export default DatePicker;
