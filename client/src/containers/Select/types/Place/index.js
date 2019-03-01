import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { places } from '../../../../constants/mockData';

import styles from './index.css';

const cx = cl.bind(styles);

class PlaceSelect extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        value: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
    }

    static defaultProps = {
        value: null,
    }

    handleSelect = (iataCode, cityName) => {
        const { onSelect, id } = this.props;

        onSelect(id, iataCode, cityName);
    }

    handleKeyPress = (event, iataCode, cityName) => {
        if (event.key === 'Enter') {
            this.handleSelect(iataCode, cityName);
        }
    }

    render() {
        const { value } = this.props;

        return (
            <div className={cx('itemList')}>
                {places.map(({ name, code }, index) => (
                    <div
                        key={code}
                        className={cx('item')}
                        role="button"
                        tabIndex={index + 1}
                        onKeyPress={() => this.handleKeyPress(code, name)}
                        onClick={() => this.handleSelect(code, name)}
                        selected={value === name}
                    >
                        <span className={cx('name')}>{name}</span>
                        <strong className={cx('iataCode')}>{code}</strong>
                    </div>
                ))}
            </div>
        );
    }
}

export default PlaceSelect;
