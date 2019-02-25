import React from 'react';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import cl from 'classnames/bind';

import { inflectStopsEn } from '../../../utils/inflection';
import planeSVG from '../../../assets/plane.svg';

import styles from './index.css';

const cx = cl.bind(styles);

const Path = ({ stops }) => (
    <div className={cx('container')}>
        {stops === 0
            ? null
            : (
                <div className={cx('connections')}>
                    {inflectStopsEn(stops)}
                </div>
            )}
        <div className={cx('bottom')}>
            <div className={cx('line')} />
            <SVGInline svg={planeSVG} />
        </div>
    </div>
);

Path.propTypes = {
    stops: PropTypes.number.isRequired,
};

export default Path;
