import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Button from '../../../components/Button';

import styles from './index.css';

const cx = cl.bind(styles);

const BuyButton = ({ price, link }) => (
    <div className={cx('buttonWrapper')}>
        <a
            className={cx('buttonLink')}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Button>
                <div className={cx('buttonTextWrap')}>
                    <div className={cx('buyText')}>Book</div>
                    <div className={cx('priceText')}>{price}</div>
                </div>
            </Button>
        </a>
    </div>
);

BuyButton.propTypes = {
    price: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default BuyButton;
