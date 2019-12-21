import React from 'react';
import cl from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Preloader.css';

const cx = cl.bind(styles);

const Preloader = ({ className, size, color }) => (
    <span className={cx('preloader', className)}>
        <i className={cx('wheel', `color-${color}`, {
            s: size === 's',
            m: size === 'm'
        })}
        />
    </span>
);

Preloader.propTypes = {
    size: PropTypes.oneOf(['s', 'm']),
    color: PropTypes.oneOf([
        'metal',
        'white',
        'black',
        'twilight'
    ]),
    className: PropTypes.string
};

Preloader.defaultProps = {
    size: 's',
    color: 'white',
    className: ''
};

export default React.memo(Preloader);
