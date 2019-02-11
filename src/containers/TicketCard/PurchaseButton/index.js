import React from 'react';
import PropTypes from 'prop-types';

import styles from './PurchaseButton.module.css';

const PurchaseButton = ({ price }) => (
    <div className={styles.button}>
        <div>Купить</div>
        <div>{`за ${price}`}</div>
    </div>
);

PurchaseButton.propTypes = {
    price: PropTypes.number.isRequired,
};

export default PurchaseButton;
