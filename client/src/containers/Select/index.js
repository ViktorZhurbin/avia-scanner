import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import SVGInline from 'react-svg-inline';

import calendarIcon from '../../assets/calendar.svg';
import clearDateIcon from '../../assets/close.svg';

import Dropdown from '../../components/Dropdown';
import SelectTrigger from '../../components/SelectTrigger';
import Place from './types/Place';
import Date from './types/Date';

import { formatDateByBrowserLocale } from '../../utils/string';

import styles from './index.css';

const cx = cl.bind(styles);

class Select extends React.PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        id: PropTypes.string,
        value: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
    }

    static defaultProps = {
        id: null,
        value: null,
        isFirst: false,
        isLast: false,
    }

    handleClearDate = (event) => {
        const { onSelect, id } = this.props;

        event.stopPropagation();
        onSelect(id, null);
    }


    renderTrigger = () => {
        const {
            value,
            placeholder,
            isFirst,
            isLast,
            type,
        } = this.props;

        const formatted = (value && type === 'date')
            ? formatDateByBrowserLocale(value)
            : value;

        return (
            <div
                className={cx({
                    triggerContainer: true,
                    isFirst,
                    isLast,
                })}
            >
                <SelectTrigger
                    selectedItem={formatted}
                    placeholder={placeholder}
                    classNames={{
                        date: type === 'date',
                    }}
                >
                    {type === 'date'
                        ? (
                            <SVGInline
                                className={cx('icon')}
                                svg={value ? clearDateIcon : calendarIcon}
                                onClick={value ? this.handleClearDate : null}
                            />
                        )
                        : null}
                </SelectTrigger>
            </div>
        );
    }

    render() {
        const { type } = this.props;

        const Component = type === 'place' ? Place : Date;

        return (
            <Dropdown
                classNames={{
                    select: true,
                }}
                trigger={this.renderTrigger()}
            >
                <Component {...this.props} />
            </Dropdown>
        );
    }
}

export default Select;
