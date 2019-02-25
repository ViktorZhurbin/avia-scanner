import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

const Button = ({ children, onClick }) => (
    // eslint-disable-next-line
    <button
        className={cx('button')}
        type="submit"
        onClick={onClick}
    >
        {children}
    </button>
);

Button.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
