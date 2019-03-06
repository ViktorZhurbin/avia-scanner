import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Dropdown from '../../components/Dropdown';
import CurrencyRowItem from './CurrencyRowItem';
import { setCurrency } from '../../state/search/searchActions';
import { currencyList } from '../../constants/mockData';

import styles from './index.css';


const cx = cl.bind(styles);

class CurrencySelect extends React.Component {
    static propTypes = {
        selectedCurrency: PropTypes.string.isRequired,
        setUpCurrency: PropTypes.func.isRequired,
    }

    renderDropdown = () => {
        const { selectedCurrency, setUpCurrency } = this.props;

        return (
            <div className={cx('currencyList')}>
                {currencyList.map((item, index) => (
                    <CurrencyRowItem
                        key={item.code}
                        currency={item}
                        index={index}
                        setCurrency={setUpCurrency}
                        selectedCurrency={selectedCurrency}
                    />
                ))}
            </div>
        );
    };

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

const mapStateToProps = ({ search }) => ({
    selectedCurrency: search.currency,
});

const mapDispatchToProps = dispatch => ({
    setUpCurrency: currency => dispatch(setCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
