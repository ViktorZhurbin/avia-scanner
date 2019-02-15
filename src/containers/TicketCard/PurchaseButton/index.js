import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../../../utils/string';

import styles from './PurchaseButton.module.css';

const PurchaseButton = ({ price }) => (
    <div className={styles.button}>
        <div>Купить</div>
        <div>{`за ${formatPrice(price)}`}</div>
    </div>
);

PurchaseButton.propTypes = {
    price: PropTypes.number.isRequired,
};

export default PurchaseButton;
