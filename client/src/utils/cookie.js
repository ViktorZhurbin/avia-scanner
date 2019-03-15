import cookies from 'browser-cookies';
import qs from 'query-string';

const lastSearch = 'last_search';

export const setLastSearchCookie = (queryString) => {
    const { departure } = qs.parse(queryString);

    cookies.set(
        lastSearch,
        queryString,
        { expires: departure },
    );
};

export const getLastSearchCookie = () => (
    cookies.get(lastSearch)
);
