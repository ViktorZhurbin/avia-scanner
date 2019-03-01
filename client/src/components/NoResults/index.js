import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Button from '../Button';

import styles from './index.css';

const cx = cl.bind(styles);

const NoResuts = ({ ticketsCount, onFilterReset }) => (
    <div className={cx('container')}>
        <div className={cx('text')}>
            {`We found ${ticketsCount} tickets
            but none of them matches current filter settings`}
        </div>
        <div className={cx('resetButton')}>
            {/* eslint-disable-next-line */}
            <Button
                onClick={onFilterReset}
            >
                <span className={cx('buttonText')}>
                    Reset Filters
                </span>
            </Button>
        </div>
    </div>
);

NoResuts.propTypes = {
    ticketsCount: PropTypes.number.isRequired,
    onFilterReset: PropTypes.func.isRequired,
};

export default React.memo(NoResuts);
