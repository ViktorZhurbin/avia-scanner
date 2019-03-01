import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { places } from '../../../../constants/mockData';
import PlaceRowItem from './PlaceRowItem';

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
        const { value, onSelect, id } = this.props;

        return (
            <div className={cx('itemList')}>
                {places.map((item, index) => (
                    <PlaceRowItem
                        key={item}
                        id={id}
                        place={item}
                        index={index}
                        selectedPlace={value}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        );
    }
}

export default PlaceSelect;
