import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { setOrigin, setDestination } from '../../../../state/search/searchActions';
import { placePropType } from '../../../../entities/propTypes';
import styles from './index.css';

const cx = cl.bind(styles);

class PlaceRowItem extends React.PureComponent {
    static propTypes = {
        setUpOrigin: PropTypes.func.isRequired,
        setUpDestination: PropTypes.func.isRequired,
        selectedPlaceList: PropTypes.objectOf(placePropType).isRequired,
        place: placePropType.isRequired,
        index: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
    }

    onSelect = () => {
        const {
            id,
            place,
            setUpOrigin,
            setUpDestination,
        } = this.props;
        const onSelect = id === 'origin' ? setUpOrigin : setUpDestination;
        onSelect(place);
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSelect();
        }
    }

    render() {
        const {
            id,
            place,
            index,
            selectedPlaceList,
        } = this.props;

        const selectedPlace = selectedPlaceList[id];
        const otherId = id === 'origin' ? 'destination' : 'origin';
        const otherSelectedPlace = selectedPlaceList[otherId];

        return (
            <div
                className={cx('item', {
                    isSelected: selectedPlace.code === place.code,
                    isDisabled: otherSelectedPlace.code === place.code,
                })}
                role="button"
                tabIndex={index + 1}
                onKeyPress={this.onKeyPress}
                onClick={this.onSelect}
            >
                <span className={cx('name')}>{place.name}</span>
                <strong className={cx('iataCode')}>{place.code}</strong>
            </div>
        );
    }
}

const mapStateToProps = ({ search }) => ({
    selectedPlaceList: {
        origin: search.origin || {},
        destination: search.destination || {},
    },
});

const mapDispatchToProps = dispatch => ({
    setUpOrigin: origin => dispatch(setOrigin(origin)),
    setUpDestination: destination => dispatch(setDestination(destination)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceRowItem);
