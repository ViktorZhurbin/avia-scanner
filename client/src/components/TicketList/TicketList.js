import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Ticket from '../Ticket';
import NoResults from '../NoResults';
import { ticketPropType } from '../../entities/propTypes';
import { filterTickets } from '../../utils/api';

import styles from './TicketList.css';

const cx = cl.bind(styles);

const TicketList = (props) => {
    const {
        currencyRates,
        hasTickets,
        selectedStops,
        allTickets,
    } = props;

    const filteredTickets = useMemo(
        () => filterTickets(allTickets, selectedStops),
        [allTickets, selectedStops],
    );

    return (
        hasTickets && filteredTickets.length === 0
            ? (
                <NoResults
                    count={allTickets.length}
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
    allTickets: PropTypes.arrayOf(ticketPropType),
    currencyRates: PropTypes.objectOf(PropTypes.number),
    hasTickets: PropTypes.bool.isRequired,
    selectedStops: PropTypes.arrayOf(PropTypes.number).isRequired,
};

TicketList.defaultProps = {
    allTickets: [],
    currencyRates: {},
};

export default TicketList;
