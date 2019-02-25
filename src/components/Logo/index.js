import React from 'react';
import SVGInline from 'react-svg-inline';
import cl from 'classnames/bind';

import logoSVG from '../../assets/main-logo.svg';

import styles from './index.css';

const cx = cl.bind(styles);

const onClick = () => {
    window.history.pushState('', '', '/');
};

const Logo = () => (
    // eslint-disable-next-line
    < div
        className={cx('container')}
        onClick={onClick}
    >
        <SVGInline svg={logoSVG} />
    </div>
);

export default Logo;
