import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

class CurrencyRowItem extends React.PureComponent {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        selectedCurrency: PropTypes.string,
        currency: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        index: PropTypes.number.isRequired,
    }

    static defaultProps = {
        selectedCurrency: null,
    }

    onSelect = () => {
        const { currency, onSelect } = this.props;

        onSelect('currency', currency.code);
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
