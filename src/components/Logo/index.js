import React from 'react';
import SVGInline from 'react-svg-inline';

import logoSVG from '../../assets/main-logo.svg';

import styles from './Logo.module.css';

export default () => (
    <div className={styles.container}>
        <SVGInline svg={logoSVG} />
    </div>
);
