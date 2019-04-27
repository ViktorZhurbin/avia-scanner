import { connect } from 'react-redux';

import TicketList from './TicketList';
import { getFilteredTickets, getAllTicketsCount } from '../../store/ticketData/selectors';

const mapStateToProps = ({ tickets }) => ({
    hasTickets: tickets.hasTickets,
    currencyRates: tickets.ticketData.currencyRates,
    allTicketsCount: getAllTicketsCount(tickets),
    filteredTickets: getFilteredTickets(tickets),
});

export default connect(
    mapStateToProps,
)(TicketList);
