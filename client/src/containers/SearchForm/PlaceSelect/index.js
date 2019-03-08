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
        origin: PropTypes.shape({
            value: codeNamePropType,
            onSelect: PropTypes.func,
        }).isRequired,
        destination: PropTypes.shape({
            value: codeNamePropType,
            onSelect: PropTypes.func,
        }).isRequired,
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

    render() {
        const {
            id,
            value,
        } = this.props;

        const otherId = id === 'origin' ? 'destination' : 'origin';
        const otherSelectedPlace = this.props[otherId].value;

        return (
            <DropdownSelect
                trigger={this.renderTrigger()}
                itemList={places}
                renderItem={this.renderItem}
                selectedItem={value}
                disabledItem={otherSelectedPlace}
                onSelect={this.props[id].onSelect}
                classNames={{ formSelect: true }}
            />
        );
    }
}

const mapStateToProps = ({ search }) => ({
    origin: {
        value: search.origin || {},
    },
    destination: {
        value: search.destination || {},
    },
});

const mapDispatchToProps = dispatch => ({
    origin: {
        onSelect: value => dispatch(setOrigin(value)),
    },
    destination: {
        onSelect: value => dispatch(setDestination(value)),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceSelect);
