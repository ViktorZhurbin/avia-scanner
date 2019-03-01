import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../../components/Dropdown';

import styles from './index.css';

import { currencyList } from '../../constants/mockData';

const cx = cl.bind(styles);

class CurrencySelect extends React.Component {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        selectedCurrency: PropTypes.string,
    }

    static defaultProps = {
        selectedCurrency: null,
    }

    onCurrencySelect = (currencyCode) => {
        this.props.onSelect('currency', currencyCode);
    }

    handleKeyPress = (event, currencyCode) => {
        if (event.key === 'Enter') {
            this.onCurrencySelect(currencyCode);
        }
    }

    renderDropdown = () => {
        const { selectedCurrency } = this.props;

        return (
            <div className={cx('currencyList')}>
                {currencyList.map(({ code, name }, index) => (
                    <div
                        key={code}
                        className={cx({
                            currencyItem: true,
                            isSelected: code === selectedCurrency,
                        })}
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
