import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import DropdownSelect from '../../../components/DropdownSelect';
import { places } from '../../../constants/mockData';
import { setOrigin, setDestination } from '../../../state/search/searchActions';
import { codeNamePropType } from '../../../entities/propTypes';

import styles from '../index.css';

const cx = cl.bind(styles);

class PlaceSelect extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        value: codeNamePropType,
        placeholder: PropTypes.string.isRequired,
        selectedPlaceList: PropTypes.shape({
            origin: codeNamePropType,
            destination: codeNamePropType,
        }).isRequired,
        setUpOrigin: PropTypes.func.isRequired,
        setUpDestination: PropTypes.func.isRequired,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
    }

    static defaultProps = {
        value: null,
        isFirst: false,
        isLast: false,
    }

    renderTrigger = () => {
        const {
            value,
            placeholder,
            isFirst,
            isLast,
        } = this.props;

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
                        placeholder: !value,
                    })}
                >
                    {value.name || placeholder}
                </div>
            </div>
        );
    }

    renderItem = item => (
        <div className={cx('placeItem')}>
            <span className={cx('name')}>{item.name}</span>
            <strong className={cx('code')}>{item.code}</strong>
        </div>
    );

    onSelect = () => {
        const { id, setUpOrigin, setUpDestination } = this.props;
        return id === 'origin'
            ? setUpOrigin
            : setUpDestination;
    }

    render() {
        const {
            id,
            value,
            selectedPlaceList,
        } = this.props;

        const otherId = id === 'origin' ? 'destination' : 'origin';
        const otherSelectedPlace = selectedPlaceList[otherId];

        return (
            <DropdownSelect
                trigger={this.renderTrigger()}
                itemList={places}
                renderItem={this.renderItem}
                selectedItem={value}
                disabledItem={otherSelectedPlace}
                onSelect={this.onSelect}
                classNames={{ formSelect: true }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceSelect);
