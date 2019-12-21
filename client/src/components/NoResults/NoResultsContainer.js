import { connect } from 'react-redux';

import NoResults from './NoResults';
import { resetStops } from '../../store/ticketData/actions';

const mapDispatchToProps = dispatch => ({
    resetFilter: () => dispatch(resetStops())
});

export default connect(
    null,
    mapDispatchToProps,
)(NoResults);
