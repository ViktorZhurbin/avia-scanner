import { connect } from 'react-redux';

import Ticket from './Ticket';

const mapStateToProps = ({ search: { currency, locale } }) => ({
    currency,
    locale,
});

export default connect(
    mapStateToProps,
)(Ticket);
