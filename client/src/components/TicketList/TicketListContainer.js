import { connect } from 'react-redux';

import TicketList from './TicketList';

const mapStateToProps = ({ tickets }) => ({
    hasTickets: tickets.hasTickets,
    currencyRates: tickets.ticketData.currencyRates,
    allTickets: tickets.ticketData.allTickets,
    selectedStops: tickets.selectedStops
});

export default connect(
    mapStateToProps,
)(TicketList);
