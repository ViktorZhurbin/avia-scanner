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
        value: PropTypes.objectOf(PropTypes.string),
    }

    static defaultProps = {
        value: null,
    }

    render() {
        const { value, id } = this.props;

        return (
            <div className={cx('itemList')}>
                {places.map((item, index) => (
                    <PlaceRowItem
                        key={item.code}
                        id={id}
                        place={item}
                        index={index}
                        selectedPlace={value && value.code}
                    />
                ))}
            </div>
        );
    }
}

export default PlaceSelect;
