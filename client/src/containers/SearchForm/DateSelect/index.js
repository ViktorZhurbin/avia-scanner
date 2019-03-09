import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import SVGInline from 'react-svg-inline';
import { connect } from 'react-redux';

import { setDeparture } from '../../../state/search';
import calendarIcon from '../../../assets/calendar.svg';
import clearDateIcon from '../../../assets/close.svg';
import { formatDateByBrowserLocale, dateToIsoString } from '../../../utils/string';

import styles from '../index.css';
import DatePicker from '../../../components/DatePicker';

const cx = cl.bind(styles);

class DateSelect extends React.PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.objectOf(PropTypes.string),
        ]),
        placeholder: PropTypes.string.isRequired,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
        setUpDeparture: PropTypes.func.isRequired,
    }

    static defaultProps = {
        value: null,
        isFirst: false,
        isLast: false,
    }

    handleClearDate = (event) => {
        const { setUpDeparture } = this.props;

        event.stopPropagation();
        setUpDeparture(null);
    }

    handleSetDate = (date) => {
        const { setUpDeparture } = this.props;
        setUpDeparture(dateToIsoString(date));
    }

    renderTrigger = () => {
        const {
            value,
            placeholder,
            isFirst,
            isLast,
        } = this.props;

        const formatted = value && formatDateByBrowserLocale(value);

        return (
            <div
                className={cx({
                    triggerContainer: true,
                    isFirst,
                    isLast,
                })}
            >
                <div
                    className={cx({
                        triggerText: true,
                        dateTrigger: true,
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

const mapDispatchToProps = dispatch => ({
    setUpDeparture: departure => dispatch(setDeparture(departure)),
});

export default connect(null, mapDispatchToProps)(DateSelect);
