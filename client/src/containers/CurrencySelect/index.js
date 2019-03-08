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
        selectedCurrency: PropTypes.string.isRequired,
        setUpCurrency: PropTypes.func.isRequired,
    }

    renderTrigger = () => {
        const { selectedCurrency } = this.props;

        return (
            <div className={cx('triggerContainer')}>
                <span className={cx('triggerText')}>
                    {selectedCurrency}
                </span>
            </div>
        );
    }

    renderItem = item => (
        <React.Fragment>
            <strong className={cx('code')}>
                {item.code}
            </strong>
            <span className={cx('name')}>
                {item.name}
            </span>
        </React.Fragment>
    )

    render() {
        const { selectedCurrency, setUpCurrency } = this.props;

        return (
            <DropdownSelect
                selectedItem={selectedCurrency}
                onSelect={setUpCurrency}
                itemList={currencyList}
                classNames={{ currencyList: true }}
                renderItem={this.renderItem}
                trigger={this.renderTrigger()}
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
