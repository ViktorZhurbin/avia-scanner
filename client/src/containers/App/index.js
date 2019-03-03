import React from 'react';
import qs from 'query-string';
import cl from 'classnames/bind';
import localeCurrency from 'locale-currency';

import SearchResults from '../SearchResults';
import SearchForm from '../SearchForm';

import { fetchTickets, fetchCurrencyRates } from '../../utils/api';
import { getISODateString } from '../../utils/string';
import getBrowserLocale from '../../utils/getBrowserLocale';

import styles from './index.css';

const cx = cl.bind(styles);

class App extends React.PureComponent {
    state = {
        origin: null,
        originName: null,
        destination: null,
        destinationName: null,
        departure: null,
        tickets: [],
        filteredTickets: [],
        stopOptions: [],
        selectedStops: {},
        locale: null,
        currency: null,
    }

    async componentDidMount() {
        window.onpopstate = () => this.onUpdateState();
        const locale = getBrowserLocale();
        const currency = localeCurrency.getCurrency(locale);
        const rates = await fetchCurrencyRates(currency);
        const departure = getISODateString(new Date());
        this.setState({
            locale,
            currency,
            rates,
            departure,
        }, () => {
            this.onUpdateState();
        });
    }


    onSubmit = (event) => {
        event.preventDefault();
        const { searchObj, search } = this.getSearchQuery();
        window.history.pushState(searchObj, '', `search?${search}`);
        if (process.env.NODE_ENV === 'development') {
            this.fetchTickets(search); // for dev testing on mock data
        } else {
            this.fetchTickets(search);
        }
    };

    onUpdateState = () => {
        const { search } = window.location;
        if (search.length > 0) {
            const { ...rest } = qs.parse(search);
            this.setState({
                ...rest,
            }, () => {
                this.onResetTicketData();
                if (process.env.NODE_ENV === 'development') {
                    this.fetchTickets(); // for dev testing on mock data
                } else {
                    this.fetchTickets(search);
                }
            });
        } else {
            this.onResetState();
        }
    }

    onResetTicketData = () => {
        this.setState({
            tickets: [],
            filteredTickets: [],
            stopOptions: [],
            selectedStops: {},
        });
    }

    onResetState = () => {
        window.history.pushState('', '', '/');
        this.onResetTicketData();
        this.setState({
            departure: null,
            destination: null,
            origin: null,
        });
    }

    fetchTickets = async (query = '') => {
        const { currency } = this.state;

        this.setState({ isLoading: true });
        const { allTickets, stopOptions, filteredTickets } = await fetchTickets(query);
        const selectedStops = {
            [stopOptions[0]]: true,
        };
        const rates = await fetchCurrencyRates(currency);

        this.setState({
            tickets: allTickets,
            filteredTickets,
            stopOptions,
            selectedStops,
            isLoading: false,
            rates,
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

    onPlaceSelect = (id, code, name) => {
        const otherId = id === 'origin' ? 'destination' : 'origin';
        const iataCode = this.state[otherId] === code ? null : code;
        const cityName = this.state[`${otherId}Name`] === name ? null : name;
        this.setState(() => ({
            [id]: iataCode,
            [`${id}Name`]: cityName,
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
            origin,
            destination,
            departure,
            locale,
            currency,
        };

        return {
            searchObj: queryObject,
            search: qs.stringify(queryObject),
        };
    };

    onFilterByStops = (newSelectedStops) => {
        const { tickets } = this.state;

        const filteredTickets = tickets.filter(({ stops }) => (
            newSelectedStops[stops]
        ));
        this.setState({
            filteredTickets,
            selectedStops: newSelectedStops,
        });
    }

    filterByStops = (tickets, stops) => (
        tickets.filter(ticket => (
            stops.includes(ticket.stops)
        ))
    );

    onResetFilters = () => {
        const { stopOptions } = this.state;

        this.onFilterByStops({ [stopOptions[0]]: true });
    }

    render() {
        const {
            originName,
            destinationName,
            locale,
            tickets,
            filteredTickets,
            stopOptions,
            selectedStops,
            isLoading,
            currency,
            rates,
            departure,
        } = this.state;

        const hasResults = tickets.length > 0;

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
                        originName={originName}
                        destinationName={destinationName}
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
                                rates={rates}
                                tickets={tickets}
                                filteredTickets={filteredTickets}
                                stopOptions={stopOptions}
                                selectedStops={selectedStops}
                                onFilterByStops={this.onFilterByStops}
                                onResetFilters={this.onResetFilters}
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
