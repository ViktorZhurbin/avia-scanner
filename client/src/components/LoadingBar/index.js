import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

const LoadingBar = ({ isLoading }) => (
    <div className={cx({ isLoading })} />
);

LoadingBar.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

export default React.memo(LoadingBar);
