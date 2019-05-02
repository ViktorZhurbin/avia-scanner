import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { getDuration } from '../../../utils/string';
import PlaneIcon from '../../../assets/plane.svg';

import styles from './Path.css';

const cx = cl.bind(styles);

const Path = ({ duration }) => (
    <div className={cx('container')}>
        {!duration
            ? null
            : (
                <div className={cx('duration')}>
                    {getDuration(duration)}
                </div>
            )}
        <div className={cx('bottom')}>
            <div className={cx('line')} />
            <PlaneIcon />
        </div>
    </div>
);

Path.propTypes = {
    duration: PropTypes.number.isRequired,
};

export default React.memo(Path);
