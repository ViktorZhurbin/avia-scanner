import { connect } from 'react-redux';

import Filters from './Filters';
import { setStops } from '../../store/ticketData/actions';

const mapDispatchToProps = dispatch => ({
    onChange: value => dispatch(setStops(value))
});

const mapStateToProps = ({ tickets }) => ({
    selectedFilters: tickets.selectedStops,
    allFilters: tickets.ticketData.stopOptions
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Filters);
