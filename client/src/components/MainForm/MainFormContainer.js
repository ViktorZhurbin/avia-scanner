import { connect } from 'react-redux';

import MainForm from './MainForm';
import {
    setOrigin,
    setDestination,
    setDeparture,
} from '../../store/searchQuery/actions';

const mapStateToProps = ({ search }) => ({
    search,
});

const mapDispatchToProps = dispatch => ({
    setUpOrigin: value => dispatch(setOrigin(value)),
    setUpDestination: value => dispatch(setDestination(value)),
    setUpDeparture: value => dispatch(setDeparture(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainForm);
