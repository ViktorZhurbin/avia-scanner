import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Preloader from '../Preloader';

import styles from './index.css';

const cx = cl.bind(styles);

const Button = ({ children, onClick, isLoading }) => (
    <button
        className={cx('button')}
        type="submit"
        onClick={onClick}
    >
        {isLoading
            ? <Preloader color="white" />
            : children
        }
    </button>
);

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]).isRequired,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
};

Button.defaultProps = {
    onClick: () => null,
    isLoading: false,
};

export default React.memo(Button);
