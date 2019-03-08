import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import SVGInline from 'react-svg-inline';
import { connect } from 'react-redux';

import { setDeparture } from '../../../state/search/searchActions';
import calendarIcon from '../../../assets/calendar.svg';
import clearDateIcon from '../../../assets/close.svg';

import { formatDateByBrowserLocale } from '../../../utils/string';

import styles from '../index.css';
import DatePicker from '../../../components/DatePicker';

const cx = cl.bind(styles);

class SearchSelect extends React.PureComponent {
    static propTypes = {
        departure: PropTypes.string,
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
        departure: null,
        value: null,
        isFirst: false,
        isLast: false,
    }

    handleClearDate = (event) => {
        const { setUpDeparture } = this.props;

        event.stopPropagation();
        setUpDeparture(null);
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
        const { setUpDeparture, departure } = this.props;

        return (
            <DatePicker
                onSelect={setUpDeparture}
                value={departure}
                trigger={this.renderTrigger()}
                classNames={{ formSelect: true }}
            />
        );
    }
}

const mapStateToProps = ({ search }) => ({
    departure: search.departure,
});

const mapDispatchToProps = dispatch => ({
    setUpDeparture: departure => dispatch(setDeparture(departure)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSelect);
