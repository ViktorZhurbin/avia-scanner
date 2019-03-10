import React from 'react';

import SearchForm from '../SearchForm';
import Loader from '../../components/Loader';

const SearchResultsPromise = import(/* webpackChunkName: "SearchResults" */ '../SearchResults');
const SearchResults = React.lazy(() => SearchResultsPromise);

const App = () => (
    <React.Fragment>
        <SearchForm />
        <React.Suspense fallback={<Loader />}>
            <SearchResults />
        </React.Suspense>
    </React.Fragment>
);

export default React.memo(App);
