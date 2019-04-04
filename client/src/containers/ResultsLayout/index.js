import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Filters from '../Filters';
import TicketList from '../TicketList';

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
    hasTickets: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ tickets }) => ({
    hasTickets: tickets.hasTickets,
});

export default connect(
    mapStateToProps,
)(ResultsLayout);
