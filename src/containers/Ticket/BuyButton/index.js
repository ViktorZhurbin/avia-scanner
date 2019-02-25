import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { formatPrice } from '../../../utils/string';
import Button from '../../../components/Button';

import styles from './index.css';

const cx = cl.bind(styles);

const BuyButton = ({ price }) => (
    <div className={cx('buttonWrapper')}>
        <Button>
            <div className={cx('buttonText')}>
                <div className={cx('buyText')}>Book</div>
                <div className={cx('priceText')}>{`${formatPrice(price)}`}</div>
            </div>
        </Button>
    </div>
);

BuyButton.propTypes = {
    price: PropTypes.number.isRequired,
};

export default BuyButton;
