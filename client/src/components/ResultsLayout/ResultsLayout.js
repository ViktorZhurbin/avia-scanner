import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Filters from '../Filters';
import TicketList from '../TicketList';

import styles from './ResultsLayout.css';

const cx = cl.bind(styles);

const ResultsLayout = ({ hasTickets }) => (
    hasTickets
        ? (
            <div className={cx('container')}>
                <Filters />
                <TicketList />
            </div>
        )
        : null
);

ResultsLayout.propTypes = {
    hasTickets: PropTypes.bool.isRequired
};

export default ResultsLayout;
