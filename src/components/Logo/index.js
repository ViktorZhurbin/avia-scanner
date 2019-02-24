import React from 'react';
import SVGInline from 'react-svg-inline';
import cl from 'classnames/bind';

import logoSVG from '../../assets/main-logo.svg';

import styles from './index.css';

const cx = cl.bind(styles);

export default () => (
    <div className={cx('container')}>
        <SVGInline svg={logoSVG} />
    </div>
);
