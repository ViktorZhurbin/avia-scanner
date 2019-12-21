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

const DateSelect = ({
    value,
    placeholder,
    isFirst,
    isLast,
    onSelect,
    isHighlighted
}) => {
    const handleClearDate = (event) => {
        event.stopPropagation();
        onSelect(null);
    };

    const handleSetDate = (date) => {
        const formattedDate = dateToIsoString(date);
        onSelect(formattedDate);
    };

    const renderTrigger = () => {
        const locale = getBrowserLocale();
        const formatted = value && formatDateByLocale(value, locale);

        return (
            <div
                className={cx('triggerContainer', {
                    isFirst,
                    isLast,
                    isHighlighted
                })}
            >
                <div
                    className={cx('triggerText', 'dateTrigger', {
                        placeholder: !formatted
                    })}
                >
                    {formatted || placeholder}
                    <div className={cx('dateIcon')}>
                        {formatted
                            ? (
                                <ClearDateIcon
                                    onClick={handleClearDate}
                                />
                            )
                            : <CalendarIcon />
                        }
                    </div>
                </div>
            </div>
        );
    };

    return (
        <DatePicker
            onSelect={handleSetDate}
            trigger={renderTrigger()}
            classNames={{ formSelect: true }}
        />
    );
};

DateSelect.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    isHighlighted: PropTypes.bool
};

DateSelect.defaultProps = {
    value: null,
    isFirst: false,
    isLast: false,
    isHighlighted: false
};

export default DateSelect;
