import { connect } from 'react-redux';

import NoResults from './NoResults';
import { setStops } from '../../store/ticketData/actions';

const mapStateToProps = ({ tickets }) => ({
    stopOptions: tickets.ticketData.stopOptions,
});

const mapDispatchToProps = dispatch => ({
    setUpStops: value => dispatch(setStops(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NoResults);
