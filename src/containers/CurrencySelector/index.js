import React from 'react';

import Dropdown from '../../components/Dropdown';

import styles from './CurrencySelector.module.css';

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
        // stops: [],
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
            <div className={styles.currencyList}>
                {list.map(({ code, name }, index) => (
                    <div
                        key={code}
                        className={styles.currencyItem}
                        role="button"
                        tabIndex={index + 1}
                        onKeyPress={() => this.handleKeyPress(code)}
                        onClick={() => this.onCurrencySelect(code)}
                    >
                        <strong className={styles.code}>{code}</strong>
                        <span className={styles.name}>{name}</span>
                    </div>
                ))}
            </div>
        );
    }

    renderTrigger = () => {
        const { selectedCurrency } = this.state;

        return (
            <div className={styles.triggerContainer}>
                <span className={styles.triggerText}>{selectedCurrency}</span>
            </div>
        );
    }

    render() {
        return (
            // <div className={styles.container}>
            <Dropdown
                trigger={this.renderTrigger()}
            >
                {this.renderDropdown()}
            </Dropdown>
            // {/* </div> */}
        );
    }
}

export default CurrencySelector;
