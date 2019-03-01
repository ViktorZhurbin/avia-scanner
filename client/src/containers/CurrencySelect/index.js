import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../../components/Dropdown';

import styles from './index.css';

import { currencyList } from '../../constants/mockData';
import CurrencyRowItem from './CurrencyRowItem';

const cx = cl.bind(styles);

class CurrencySelect extends React.Component {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        selectedCurrency: PropTypes.string,
    }

    static defaultProps = {
        selectedCurrency: null,
    }

    handleKeyPress = (event, currencyCode) => {
        if (event.key === 'Enter') {
            this.onCurrencySelect(currencyCode);
        }
    }

    renderDropdown = () => {
        const { selectedCurrency, onSelect } = this.props;

        return (
            <div className={cx('currencyList')}>
                {currencyList.map((item, index) => (
                    <CurrencyRowItem
                        key={item.code}
                        currency={item}
                        index={index}
                        onSelect={onSelect}
                        selectedCurrency={selectedCurrency}
                    />
                ))}
            </div>
        );
    }

    renderTrigger = () => {
        const { selectedCurrency } = this.props;

        return (
            <div className={cx('triggerContainer')}>
                <span className={cx('triggerText')}>{selectedCurrency}</span>
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

export default CurrencySelect;
