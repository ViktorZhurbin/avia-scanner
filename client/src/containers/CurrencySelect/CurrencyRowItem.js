import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

class CurrencyRowItem extends React.PureComponent {
    static propTypes = {
        selectedCurrency: PropTypes.string.isRequired,
        currency: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        index: PropTypes.number.isRequired,
        setCurrency: PropTypes.func.isRequired,
    }

    onSelect = () => {
        const { currency } = this.props;
        this.props.setCurrency(currency.code);
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSelect();
        }
    }

    render() {
        const {
            currency,
            index,
            selectedCurrency,
        } = this.props;
        return (
            <div
                key={currency.code}
                className={cx({
                    currencyItem: true,
                    isSelected: currency.code === selectedCurrency,
                })}
                role="button"
                tabIndex={index + 1}
                onKeyPress={this.onKeyPress}
                onClick={this.onSelect}
            >
                <strong className={cx('code')}>
                    {currency.code}
                </strong>
                <span className={cx('name')}>
                    {currency.name}
                </span>
            </div>
        );
    }
}

export default CurrencyRowItem;
