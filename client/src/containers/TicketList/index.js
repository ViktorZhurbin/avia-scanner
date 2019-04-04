import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Ticket from '../Ticket';
import NoResults from '../../components/NoResults';
import { ticketPropType } from '../../entities/propTypes';
import { getFilteredTickets, getAllTicketsCount } from '../../store/ticketData/selectors';

import styles from './index.css';

const cx = cl.bind(styles);

const TicketList = (props) => {
    const {
        currencyRates,
        hasTickets,
        filteredTickets,
        allTicketsCount,
    } = props;

    return (
        hasTickets && filteredTickets.length === 0
            ? (
                <NoResults
                    count={allTicketsCount}
                />
            )
            : (
                <div className={cx('container')}>
                    {filteredTickets.map(ticket => (
                        <Ticket
                            key={ticket.id}
                            ticket={ticket}
                            rates={currencyRates}
                        />
                    ))}
                </div>
            )
    );
};

TicketList.propTypes = {
    filteredTickets: PropTypes.arrayOf(ticketPropType),
    currencyRates: PropTypes.objectOf(PropTypes.number),
    hasTickets: PropTypes.bool.isRequired,
    allTicketsCount: PropTypes.number.isRequired,
};

TicketList.defaultProps = {
    filteredTickets: [],
    currencyRates: {},
};

const mapStateToProps = ({ tickets }) => ({
    hasTickets: tickets.hasTickets,
    currencyRates: tickets.ticketData.currencyRates,
    allTicketsCount: getAllTicketsCount(tickets),
    filteredTickets: getFilteredTickets(tickets),
});

export default connect(
    mapStateToProps,
)(TicketList);
