import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import DatePicker from '../../DatePicker';
import CalendarIcon from '../../../assets/calendar.svg';
import ClearDateIcon from '../../../assets/close.svg';
import { formatDateByLocale, dateToIsoString } from '../../../utils/dateTime';
import getBrowserLocale from '../../../utils/getBrowserLocale';

import styles from '../MainForm.css';

const cx = cl.bind(styles);

class DateSelect extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string.isRequired,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
        onSelect: PropTypes.func.isRequired,
        isHighlighted: PropTypes.bool,
    }

    static defaultProps = {
        value: null,
        isFirst: false,
        isLast: false,
        isHighlighted: false,
    }

    handleClearDate = (event) => {
        const { onSelect } = this.props;

        event.stopPropagation();
        onSelect(null);
    }

    handleSetDate = (date) => {
        const { onSelect } = this.props;
        onSelect(dateToIsoString(date));
    }

    renderTrigger = () => {
        const {
            value,
            placeholder,
            isFirst,
            isLast,
            isHighlighted,
        } = this.props;

        const locale = getBrowserLocale();
        const formatted = value && formatDateByLocale(value, locale);

        return (
            <div
                className={cx('triggerContainer', {
                    isFirst,
                    isLast,
                    isHighlighted,
                })}
            >
                <div
                    className={cx('triggerText', 'dateTrigger', {
                        placeholder: !formatted,
                    })}
                >
                    {formatted || placeholder}
                    <div className={cx('dateIcon')}>
                        {formatted
                            ? (
                                <ClearDateIcon
                                    onClick={this.handleClearDate}
                                />
                            )
                            : <CalendarIcon />
                        }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <DatePicker
                onSelect={this.handleSetDate}
                trigger={this.renderTrigger()}
                classNames={{ formSelect: true }}
            />
        );
    }
}

export default DateSelect;
