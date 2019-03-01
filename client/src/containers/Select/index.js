import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../../components/Dropdown';
import SelectTrigger from '../../components/SelectTrigger';
import Place from './types/Place';
import Date from './types/Date';

import { formatDateByBrowserLocale } from '../../utils/string';

import styles from './index.css';

const cx = cl.bind(styles);

class Select extends React.Component {
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
        isFirst: false,
        isLast: false,
        value: null,
        id: null,
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
                        type,
                    }}
                />
            </div>
        );
    }

    render() {
        const { type } = this.props;

        const Component = type === 'place' ? Place : Date;

        return (
            <Dropdown
                classNames={{
                    placeSelect: true,
                }}
                trigger={this.renderTrigger()}
            >
                <Component {...this.props} />
            </Dropdown>
        );
    }
}

export default Select;
