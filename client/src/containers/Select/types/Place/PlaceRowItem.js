import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

class PlaceRowItem extends React.PureComponent {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        selectedPlace: PropTypes.string,
        place: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        index: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
    }

    static defaultProps = {
        selectedPlace: null,
    }

    onSelect = () => {
        const { place, onSelect, id } = this.props;

        onSelect(id, place.code, place.name);
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSelect();
        }
    }

    render() {
        const {
            place,
            index,
            selectedPlace,
        } = this.props;

        return (
            <div
                className={cx('item')}
                role="button"
                tabIndex={index + 1}
                onKeyPress={this.onKeyPress}
                onClick={this.onSelect}
                selected={selectedPlace === place.name}
            >
                <span className={cx('name')}>{place.name}</span>
                <strong className={cx('iataCode')}>{place.code}</strong>
            </div>
        );
    }
}

export default PlaceRowItem;
