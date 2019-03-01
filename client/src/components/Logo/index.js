import React from 'react';
import SVGInline from 'react-svg-inline';
import cl from 'classnames/bind';

import headerLogo from '../../assets/headerLogo.svg';

import styles from './index.css';

const cx = cl.bind(styles);

const Logo = () => (
    <div className={cx('container')}>
        <SVGInline svg={headerLogo} />
    </div>
);

export default React.memo(Logo);
