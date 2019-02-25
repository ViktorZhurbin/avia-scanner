import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Logo from '../../components/Logo';
import CurrencySelect from '../CurrencySelect';

import styles from './index.css';

const cx = cl.bind(styles);

const NavBar = props => (
    <div className={cx('container')}>
        {/* eslint-disable-next-line */}
        <div
            className={cx('logo')}
            onClick={props.onResetState}
        >
            <Logo />
        </div>
        <CurrencySelect />
    </div>
);

NavBar.propTypes = {
    onResetState: PropTypes.func.isRequired,
};

export default NavBar;
