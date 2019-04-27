import { connect } from 'react-redux';

import Filters from './Filters';
import { setStops } from '../../store/ticketData/actions';

const mapDispatchToProps = dispatch => ({
    setUpStops: value => dispatch(setStops(value)),
});

const mapStateToProps = ({ tickets }) => ({
    selectedStops: tickets.selectedStops,
    stopOptions: tickets.ticketData.stopOptions,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Filters);
