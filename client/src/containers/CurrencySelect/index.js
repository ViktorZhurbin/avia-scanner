import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import DropdownSelect from '../../components/DropdownSelect';
import { setCurrency } from '../../state/search/searchActions';
import { currencyList } from '../../constants/mockData';

import styles from './index.css';


const cx = cl.bind(styles);

class CurrencySelect extends React.PureComponent {
    static propTypes = {
        selectedCurrency: PropTypes.shape({
            name: PropTypes.string,
            code: PropTypes.string,
        }).isRequired,
        setUpCurrency: PropTypes.func.isRequired,
    }

    renderTrigger = () => {
        const { selectedCurrency } = this.props;

        return (
            <div className={cx('triggerContainer')}>
                <span className={cx('triggerText')}>
                    {selectedCurrency.code}
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
        const { selectedCurrency, setUpCurrency } = this.props;

        return (
            <DropdownSelect
                trigger={this.renderTrigger()}
                itemList={currencyList}
                renderItem={this.renderItem}
                selectedItem={selectedCurrency}
                onSelect={setUpCurrency}
                classNames={{
                    currency: true,
                }}
            />
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
