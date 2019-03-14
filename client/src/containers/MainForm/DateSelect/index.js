import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import SVGInline from 'react-svg-inline';

import DatePicker from '../../../components/DatePicker';
import calendarIcon from '../../../assets/calendar.svg';
import clearDateIcon from '../../../assets/close.svg';
import { formatDateByLocale, dateToIsoString } from '../../../utils/dateTime';
import getBrowserLocale from '../../../utils/getBrowserLocale';

import styles from '../index.css';

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
                    <SVGInline
                        className={cx('dateIcon')}
                        svg={formatted ? clearDateIcon : calendarIcon}
                        onClick={formatted ? this.handleClearDate : null}
                    />
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
