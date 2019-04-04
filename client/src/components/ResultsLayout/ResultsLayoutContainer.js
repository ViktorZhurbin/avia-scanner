import { connect } from 'react-redux';

import ResultsLayout from './ResultsLayout';

const mapStateToProps = ({ tickets }) => ({
    hasTickets: tickets.hasTickets,
});

export default connect(
    mapStateToProps,
)(ResultsLayout);
