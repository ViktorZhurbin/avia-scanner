import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Logo from '../../components/Logo';
import CurrencySelect from './CurrencySelect';

import styles from './index.css';

const cx = cl.bind(styles);

const NavBar = ({ onResetState }) => (
    <div className={cx('container')}>
        {/* eslint-disable jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */}
        <div
            className={cx('logo')}
            onClick={onResetState}
        >
            <Logo />
        </div>
        {/* eslint-enable jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */}
        <CurrencySelect />
    </div>
);

NavBar.propTypes = {
    onResetState: PropTypes.func.isRequired,
};

export default React.memo(NavBar);
