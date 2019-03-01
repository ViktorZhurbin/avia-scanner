import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Calendar from '../../../../components/Calendar';
import { getISODateString } from '../../../../utils/string';

import styles from './index.css';


const cx = cl.bind(styles);

class DateSelect extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        value: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
    }

    static defaultProps = {
        value: null,
    }

    handleSelect = (date) => {
        const { onSelect, id } = this.props;

        onSelect(id, getISODateString(date));
    }

    render() {
        const { value } = this.props;

        return (
            <div className={cx('calendar')}>
                <Calendar
                    onDateSelect={this.handleSelect}
                    date={value}
                />
            </div>
        );
    }
}

export default DateSelect;
