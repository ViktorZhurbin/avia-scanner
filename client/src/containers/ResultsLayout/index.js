import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Filters from '../Filters';
import TicketList from '../TicketList';

import { getFilteredTickets } from '../../store/ticketData/selectors';

import styles from './index.css';

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
    hasTickets: PropTypes.bool,
};

ResultsLayout.defaultProps = {
    hasTickets: false,
};

const mapStateToProps = ({ tickets }) => ({
    ticketData: tickets.ticketData,
    hasTickets: tickets.hasTickets,
    filteredTickets: getFilteredTickets(tickets),
});

export default connect(mapStateToProps, null)(ResultsLayout);
