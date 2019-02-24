import React from 'react';
import cl from 'classnames/bind';

import Logo from '../../components/Logo';
import CurrencySelector from '../CurrencySelector';

import styles from './index.css';

const cx = cl.bind(styles);

const NavBar = () => (
    <div className={cx('container')}>
        <div className={cx('logo')}>
            <Logo />
        </div>
        <CurrencySelector />
    </div>
);

export default NavBar;
