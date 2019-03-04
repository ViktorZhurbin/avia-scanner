import React from 'react';
import qs from 'query-string';
import cl from 'classnames/bind';
import localeCurrency from 'locale-currency';
import axios from 'axios';

import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';

import { fetchTickets } from '../../utils/api';
import { getISODatStringOfTodayPlusNdays } from '../../utils/string';
import getBrowserLocale from '../../utils/getBrowserLocale';
import { places } from '../../constants/mockData';

import styles from './index.css';

const cx = cl.bind(styles);

const source = axios.CancelToken.source();

class App extends React.PureComponent {
    state = {
        origin: places[0],
        destination: places[2],
        departure: null,
        ticketData: {},
        locale: null,
        currency: null,
    }

    componentDidMount() {
        window.onpopstate = () => this.onUpdateState();
        const locale = getBrowserLocale();
        const currency = localeCurrency.getCurrency(locale);
        const departure = getISODatStringOfTodayPlusNdays(14);
        this.setState({
            locale,
            currency,
            departure,
        }, () => {
            this.onUpdateState();
        });
    }

    componentWillUnmount() {
        source.cancel();
    }

    getLocationByCode = code => (
        places.find(item => item.code === code)
    )

    onSubmit = (event) => {
        event.preventDefault();
        const { searchObj, search } = this.getSearchQuery();
        window.history.pushState(searchObj, '', `${search}`);
        this.fetchTickets(search);
    };

    onUpdateState = () => {
        const { search } = window.location;
        if (search.length > 0) {
            const { origin, destination, ...rest } = qs.parse(search);
            // console.log(query);
            this.setState({
                origin: this.getLocationByCode(origin),
                destination: this.getLocationByCode(destination),
                ...rest,
            }, () => this.fetchTickets(search));
        } else {
            this.onResetState();
        }
    }

    onResetState = () => {
        window.history.pushState('', '', '/');
        source.cancel();
        this.setState({
            // origin: null,
            // destination: null,
            // departure: null,
            isLoading: false,
            ticketData: {},
        });
    }

    fetchTickets = async (query = '') => {
        this.setState({ isLoading: true });
        const ticketData = await fetchTickets(query, source.token);

        this.setState({
            ticketData,
            isLoading: false,
        });
    }

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    onSelect = (id, date) => {
        this.setState({
            [id]: date,
        });
    }

    onPlaceSelect = (id, place) => {
        const otherId = id === 'origin' ? 'destination' : 'origin';
        const location = this.state[otherId] === place ? null : place;
        this.setState(() => ({
            [id]: location,
        }));
    }

    getSearchQuery = () => {
        const {
            origin = null,
            destination = null,
            departure = null,
            locale = null,
            currency = null,
        } = this.state;

        const queryObject = {
            origin: origin && origin.code,
            destination: destination && destination.code,
            departure,
            locale,
            currency,
        };
        const queryString = qs.stringify(queryObject);

        return {
            searchObj: queryObject,
            search: `?${queryString}`,
        };
    };

    render() {
        const {
            origin,
            destination,
            departure,
            locale,
            isLoading,
            currency,
            ticketData,
        } = this.state;

        const hasResults = ticketData && ticketData.allTickets && ticketData.allTickets.length > 0;

        return (
            <div className={cx('container')}>
                <div
                    className={cx({
                        form: true,
                        formOnly: !hasResults,
                    })}
                >
                    <SearchForm
                        isLoading={isLoading}
                        origin={origin}
                        destination={destination}
                        onSubmit={this.onSubmit}
                        onPlaceSelect={this.onPlaceSelect}
                        onSelect={this.onSelect}
                        onResetState={this.onResetState}
                        selectedCurrency={currency}
                        departure={departure}
                        fullScreen={!hasResults}
                    />
                </div>
                {hasResults
                    ? (
                        <div className={cx('results')}>
                            <SearchResults
                                ticketData={ticketData}
                                locale={locale}
                                currency={currency}
                            />
                        </div>
                    )
                    : null}
            </div>
        );
    }
}

export default App;
