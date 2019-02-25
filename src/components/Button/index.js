import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

const Button = ({ children, onClick }) => (
    <button
        className={cx('button')}
        type="submit"
        onClick={onClick}
    >
        {children}
    </button>
);

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]).isRequired,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    onClick: () => null,
};

export default Button;
