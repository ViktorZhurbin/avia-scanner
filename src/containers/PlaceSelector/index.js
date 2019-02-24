import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../../components/Dropdown';

import styles from './index.css';

const cx = cl.bind(styles);

class PlaceSelector extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        itemList: PropTypes.arrayOf(
            PropTypes.objectOf(PropTypes.string),
        ).isRequired,
        onSelect: PropTypes.func.isRequired,
        iataCode: PropTypes.string.isRequired,
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
            {this.props.itemList.map(({ code, name }, index) => (
                <div
                    key={code}
                    className={cx('item')}
                    role="button"
                    tabIndex={index + 1}
                    onKeyPress={() => this.handleKeyPress(code)}
                    onClick={() => this.handleSelect(code)}
                >
                    <strong className={cx('iataCode')}>{code}</strong>
                    <span className={cx('name')}>{name}</span>
                </div>
            ))}
        </div>
    );

    renderTrigger = () => {
        const { iataCode, itemList } = this.props;

        const selectedItem = itemList.find(item => item.code === iataCode);

        return (
            <div className={cx('triggerContainer')}>
                <span className={cx('triggerText')}>{selectedItem.name}</span>
            </div>
        );
    }

    render() {
        return (
            <Dropdown
                trigger={this.renderTrigger()}
            >
                {this.renderDropdown()}
            </Dropdown>
        );
    }
}

export default PlaceSelector;
