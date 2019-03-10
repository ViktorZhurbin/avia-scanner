import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../SearchForm';
import Loader from '../../components/Loader';

const SearchResultsPromise = import(/* webpackChunkName: "SearchResults" */ '../SearchResults');
const SearchResults = React.lazy(() => SearchResultsPromise);

const App = ({ hasTickets }) => (
    <React.Fragment>
        <SearchForm />
        {hasTickets
            ? (
                <React.Suspense fallback={<Loader />}>
                    <SearchResults
                        hasTickets={hasTickets}
                    />
                </React.Suspense>
            )
            : null}
    </React.Fragment>
);

App.propTypes = {
    hasTickets: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ tickets }) => ({
    hasTickets: tickets.hasTickets,
});

export default React.memo(
    connect(
        mapStateToProps,
    )(App),
);
