import React from 'react';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { inflectStopsEn } from '../../../utils/inflection';
import planeSVG from '../../../assets/plane.svg';

import styles from './Stops.module.css';

const Stops = ({ stops }) => (
    <div className={styles.container}>
        {stops === 0
            ? null
            : (
                <div className={styles.connections}>
                    {inflectStopsEn(stops)}
                </div>
            )}
        <div className={styles.bottom}>
            <div className={styles.line} />
            <SVGInline svg={planeSVG} />
        </div>
    </div>
);

Stops.propTypes = {
    stops: PropTypes.number.isRequired,
};

export default Stops;
