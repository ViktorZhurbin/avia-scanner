import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../../components/Dropdown';

import styles from './index.css';

const cx = cl.bind(styles);

class PlaceSelect extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        itemList: PropTypes.arrayOf(
            PropTypes.objectOf(PropTypes.string),
        ).isRequired,
        onSelect: PropTypes.func.isRequired,
        iataCode: PropTypes.string,
        placeholder: PropTypes.string,
        isFirst: PropTypes.bool,
    }

    static defaultProps = {
        isFirst: false,
        iataCode: null,
        placeholder: 'To',
    }

    handleSelect = (iataCode) => {
        const { onSelect, id } = this.props;

        onSelect(iataCode, id);
    }

    handleKeyPress = (event, iataCode) => {
        if (event.key === 'Enter') {
            this.handleSelect(iataCode);
        }
    }

    renderDropdown = () => (
        <div className={cx('itemList')}>
            {this.props.itemList.map((place, index) => (
                <div
                    key={place.code}
                    className={cx('item')}
                    role="button"
                    tabIndex={index + 1}
                    onKeyPress={() => this.handleKeyPress(place.code)}
                    onClick={() => this.handleSelect(place.code)}
                >
                    <strong className={cx('iataCode')}>{place.code}</strong>
                    <span className={cx('name')}>{place.name}</span>
                </div>
            ))}
        </div>
    );

    renderTrigger = () => {
        const {
            iataCode,
            placeholder,
            itemList,
            isFirst,
        } = this.props;

        const selectedItem = itemList.find(item => item.code === iataCode);
        const triggerText = selectedItem ? selectedItem.name : placeholder;

        return (
            <div
                className={cx({
                    triggerContainer: true,
                    isFirst,
                })}
            >
                <div
                    className={cx({
                        triggerText: true,
                        placeholder: triggerText === placeholder,
                    })}
                >
                    {triggerText}
                </div>
            </div>
        );
    }

    render() {
        return (
            <Dropdown
                classNames={{
                    placeSelect: true,
                }}
                trigger={this.renderTrigger()}
            >
                {this.renderDropdown()}
            </Dropdown>
        );
    }
}

export default PlaceSelect;
