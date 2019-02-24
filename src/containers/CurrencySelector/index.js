import React from 'react';
import cl from 'classnames/bind';

import Dropdown from '../../components/Dropdown';

import styles from './index.css';

const cx = cl.bind(styles);

const currencyList = [
    {
        code: 'USD',
        name: 'US Dollar',
    },
    {
        code: 'RUB',
        name: 'Rouble',
    },
    {
        code: 'EUR',
        name: 'Euro',
    },
];

class CurrencySelector extends React.Component {
    state = {
        selectedCurrency: 'USD',
    }


    onCurrencySelect = (currencyCode) => {
        this.setState({
            selectedCurrency: currencyCode,
        });
    }

    handleKeyPress = (event, currencyCode) => {
        if (event.key === 'Enter') {
            this.onCurrencySelect(currencyCode);
        }
    }

    renderDropdown = () => {
        const list = currencyList;

        return (
            <div className={cx('currencyList')}>
                {list.map(({ code, name }, index) => (
                    <div
                        key={code}
                        className={cx('currencyItem')}
                        role="button"
                        tabIndex={index + 1}
                        onKeyPress={() => this.handleKeyPress(code)}
                        onClick={() => this.onCurrencySelect(code)}
                    >
                        <strong className={cx('code')}>{code}</strong>
                        <span className={cx('name')}>{name}</span>
                    </div>
                ))}
            </div>
        );
    }

    renderTrigger = () => {
        const { selectedCurrency } = this.state;

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

export default CurrencySelector;
