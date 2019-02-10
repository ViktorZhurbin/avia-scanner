import React from 'react';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import planeSVG from '../../../assets/plane.svg';

import styles from './Stops.module.css';

const Stops = ({ stops = 1 }) => (
    <div className={styles.container}>
        <div className={styles.connections}>{`${stops} пересадка`}</div>
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
