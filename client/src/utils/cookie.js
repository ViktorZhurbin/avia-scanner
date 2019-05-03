import cookies from 'browser-cookies';
import qs from 'query-string';

const LAST_SEARCH = 'last_search';

export const setLastSearchCookie = (queryString) => {
    if (queryString && queryString.length > 0) {
        const { departure } = qs.parse(queryString);

        cookies.set(
            LAST_SEARCH,
            queryString,
            { expires: departure },
        );
    }
};

export const getLastSearchCookie = () => (
    cookies.get(LAST_SEARCH)
);
