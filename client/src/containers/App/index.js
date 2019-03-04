import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';
import localeCurrency from 'locale-currency';

import SearchForm from '../SearchForm';
import Loader from '../../components/Loader';
import { setLocale, setCurrency } from '../../state/tickets/ticketsActions';
import getBrowserLocale from '../../utils/getBrowserLocale';

import styles from './index.css';

const SearchResults = React.lazy(() => import('../SearchResults'));
const cx = cl.bind(styles);


class App extends React.PureComponent {
    static propTypes = {
        hasTickets: PropTypes.bool.isRequired,
        locale: PropTypes.string,
        currency: PropTypes.string,
        setUpLocale: PropTypes.func.isRequired,
        setUpCurrency: PropTypes.func.isRequired,
    }

    static defaultProps = {
        locale: null,
        currency: null,
    }

    componentDidMount() {
        const locale = getBrowserLocale();
        this.props.setUpLocale(locale);
        const currency = localeCurrency.getCurrency(locale);
        this.props.setUpCurrency(currency);
    }

    render() {
        const { hasTickets, locale, currency } = this.props;

        return (
            locale && currency
                ? (
                    <div className={cx('container')}>
                        <div
                            className={cx({
                                form: true,
                                formOnly: !hasTickets,
                            })}
                        >
                            <SearchForm
                                fullScreen={!hasTickets}
                            />
                        </div>
                        {hasTickets
                            ? (
                                <React.Suspense fallback={<Loader />}>
                                    <div className={cx('results')}>
                                        <SearchResults />
                                    </div>
                                </React.Suspense>
                            )
                            : null}
                    </div>
                )
                : <Loader />
        );
    }
}

const mapStateToProps = ({ tickets }) => ({
    hasTickets: tickets.hasTickets,
    locale: tickets.locale,
    currency: tickets.currency,
});

const mapDispatchToProps = dispatch => ({
    setUpLocale: locale => dispatch(setLocale(locale)),
    setUpCurrency: currency => dispatch(setCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
