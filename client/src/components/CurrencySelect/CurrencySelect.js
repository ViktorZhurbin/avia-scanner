import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Select from '../Select';
import { currencyList } from '../../constants/mockData';
import { codeNamePropType } from '../../entities/propTypes';

import styles from './CurrencySelect.css';

const cx = cl.bind(styles);

const renderItem = currency => (
    <div className={cx('item')}>
        <strong className={cx('code')}>
            {currency.code}
        </strong>
        <span className={cx('name')}>
            {currency.name}
        </span>
    </div>
);


const DropdownTrigger = ({ currencyCode }) => (
    <div className={cx('triggerContainer')}>
        <span className={cx('triggerText')}>
            {currencyCode}
        </span>
    </div>
);

const CurrencySelect = ({ currency, setUpCurrency }) => (
    <Select
        trigger={(
            <DropdownTrigger
                currencyCode={currency.code}
            />
        )}
        itemList={currencyList}
        renderItem={renderItem}
        selectedItem={currency}
        onSelect={setUpCurrency}
        classNames={{ currency: true }}
    />
);

CurrencySelect.propTypes = {
    currency: codeNamePropType.isRequired,
    setUpCurrency: PropTypes.func.isRequired,
};

DropdownTrigger.propTypes = {
    currencyCode: PropTypes.string.isRequired,
};

export default CurrencySelect;
