import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Logo from '../../assets/headerLogo.svg';
import CurrencySelect from '../CurrencySelect';

import styles from './NavBar.css';

const cx = cl.bind(styles);

const NavBar = ({ onReset }) => (
    <div className={cx('container')}>
        <Logo
            className={cx('logo')}
            onClick={onReset}
        />
        <CurrencySelect />
    </div>
);

NavBar.propTypes = {
    onReset: PropTypes.func.isRequired
};

export default React.memo(NavBar);
