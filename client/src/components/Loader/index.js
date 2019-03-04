import React from 'react';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

const Loader = () => (
    <div className={cx('loader')}>
        <span className={cx('loaderBall', 'one')} />
        <span className={cx('loaderBall', 'two')} />
        <span className={cx('loaderBall', 'three')} />
    </div>
);

export default React.memo(Loader);
