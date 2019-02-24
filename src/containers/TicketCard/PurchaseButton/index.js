import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { formatPrice } from '../../../utils/string';

import styles from './index.css';

const cx = cl.bind(styles);

const PurchaseButton = ({ price }) => (
    <div className={cx('button')}>
        <div className={cx('buttonText')}>Book</div>
        <div className={cx('buttonPrice')}>{`${formatPrice(price)}`}</div>
    </div>
);

PurchaseButton.propTypes = {
    price: PropTypes.number.isRequired,
};

export default PurchaseButton;
