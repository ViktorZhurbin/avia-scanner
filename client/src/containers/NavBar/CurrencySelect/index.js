import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Select from '../../../components/Select';
import { setCurrency } from '../../../store/searchQuery/actions';
import { currencyList } from '../../../constants/mockData';
import { codeNamePropType } from '../../../entities/propTypes';

import styles from './index.css';


const cx = cl.bind(styles);

class CurrencySelect extends React.PureComponent {
    static propTypes = {
        currency: codeNamePropType.isRequired,
        setUpCurrency: PropTypes.func.isRequired,
    }

    renderTrigger = () => {
        const { currency } = this.props;

        return (
            <div className={cx('triggerContainer')}>
                <span className={cx('triggerText')}>
                    {currency.code}
                </span>
            </div>
        );
    }

    renderItem = item => (
        <div className={cx('item')}>
            <strong className={cx('code')}>
                {item.code}
            </strong>
            <span className={cx('name')}>
                {item.name}
            </span>
        </div>
    )

    render() {
        const { currency, setUpCurrency } = this.props;

        return (
            <Select
                trigger={this.renderTrigger()}
                itemList={currencyList}
                renderItem={this.renderItem}
                selectedItem={currency}
                onSelect={setUpCurrency}
                classNames={{ currency: true }}
            />
        );
    }
}

const mapStateToProps = ({ search: { currency } }) => ({
    currency,
});

const mapDispatchToProps = dispatch => ({
    setUpCurrency: currency => dispatch(setCurrency(currency)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CurrencySelect);
