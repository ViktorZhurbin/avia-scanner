import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import SearchForm from '../SearchForm';
import Loader from '../../components/Loader';
import styles from './index.css';

const cx = cl.bind(styles);

const SearchResultsPromise = import(/* webpackChunkName: "SearchResults" */ '../SearchResults');
const SearchResults = React.lazy(() => SearchResultsPromise);

const App = ({ hasTickets }) => (
    <div className={cx('container')}>
        <div
            className={cx('form', {
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
                        <SearchResults
                            hasTickets={hasTickets}
                        />
                    </div>
                </React.Suspense>
            )
            : null}
    </div>
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
