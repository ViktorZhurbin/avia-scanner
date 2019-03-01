import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../../components/Dropdown';
import SelectTrigger from '../../components/SelectTrigger';

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
        children: PropTypes.node.isRequired,
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
                    <span className={cx('name')}>{place.name}</span>
                    <strong className={cx('iataCode')}>{place.code}</strong>
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

        return (
            <div
                className={cx({
                    triggerContainer: true,
                    isFirst,
                })}
            >
                <SelectTrigger
                    text={selectedItem}
                    placeholder={placeholder}
                    classNames={{
                        placeSelector: true,
                    }}
                />
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
                {this.props.children}
            </Dropdown>
        );
    }
}

export default PlaceSelect;
