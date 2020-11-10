import { connect } from 'react-redux';

import FormLayout from './FormLayout';

import { reset, request, requestCancel } from '../../store/ticketData/actions';
import { resetSearch, setFormInput } from '../../store/searchQuery/actions';

const mapStateToProps = ({ tickets }) => ({
    isLoading: tickets.isLoading,
    hasTickets: tickets.hasTickets
});

const mapDispatchToProps = dispatch => ({
    getTickets: (query, options) => dispatch(request(query, options)),
    getTicketsCancel: () => dispatch(requestCancel()),
    resetTickets: () => dispatch(reset()),
    resetSearchQuery: () => dispatch(resetSearch()),
    setUpFormInput: search => dispatch(setFormInput(search))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FormLayout);
