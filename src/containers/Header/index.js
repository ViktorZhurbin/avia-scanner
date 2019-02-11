import React from 'react';

import Logo from '../../components/Logo';
import CurrencySelector from '../CurrencySelector';

import styles from './Header.module.css';


const Header = () => (
    <div className={styles.container}>
        <Logo />
        <CurrencySelector />
    </div>
);

export default Header;
