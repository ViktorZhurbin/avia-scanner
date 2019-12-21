import { connect } from 'react-redux';

import CurrencySelect from './CurrencySelect';
import { setCurrency } from '../../store/searchQuery/actions';

const mapStateToProps = ({ search: { currency } }) => ({
    currency
});

const mapDispatchToProps = dispatch => ({
    setUpCurrency: currency => dispatch(setCurrency(currency))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CurrencySelect);
