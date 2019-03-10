import React from 'react';

import SearchForm from '../SearchForm';
import Loading from '../../components/Loading';

const SearchResultsPromise = import(/* webpackChunkName: "SearchResults" */ '../SearchResults');
const SearchResults = React.lazy(() => SearchResultsPromise);

const App = () => (
    <React.Fragment>
        <SearchForm />
        <React.Suspense fallback={<Loading />}>
            <SearchResults />
        </React.Suspense>
    </React.Fragment>
);

export default React.memo(App);
