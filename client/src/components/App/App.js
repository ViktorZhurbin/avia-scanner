import React from 'react';

import FormLayout from '../FormLayout';
import Loading from '../Loading';

const ResultsLayoutPromise = import(
    /* webpackChunkName: "ResultsLayout" */ '../ResultsLayout'
);
const ResultsLayout = React.lazy(() => ResultsLayoutPromise);

const App = () => (
    <React.Fragment>
        <FormLayout />
        <React.Suspense fallback={<Loading />}>
            <ResultsLayout />
        </React.Suspense>
    </React.Fragment>
);

export default React.memo(App);
