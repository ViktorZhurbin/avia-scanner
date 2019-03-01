import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Calendar from '../../../../components/Calendar';
import { getISODateString } from '../../../../utils/string';

import styles from './index.css';

const cx = cl.bind(styles);

class DateSelect extends React.PureComponent {
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
            <React.Fragment>
                <div className={cx('calendarModal')}>
                    <Calendar
                        onDateSelect={this.handleSelect}
                        date={value}
                    />
                </div>
                <div className={cx('modalOverlay')} />
            </React.Fragment>
        );
    }
}

export default DateSelect;
