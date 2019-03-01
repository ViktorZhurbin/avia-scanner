import React from 'react';
import qs from 'query-string';
import cl from 'classnames/bind';
import moment from 'moment';
import localeCurrency from 'locale-currency';

import SearchResults from '../SearchResults';
import SearchForm from '../SearchForm';

import { places } from '../../constants/mockData';
import getUniqueByKey from '../../utils/objectHelpers';
import { getFormattedTickets, fetchCurrencyRates } from '../../utils/api';
import { getBrowserLocale } from '../../utils/locale';

import styles from './index.css';

const cx = cl.bind(styles);

class App extends React.Component {
    state = {
        origin: places[0].code,
        destination: null,
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
        const departure = moment().add(1, 'days');
        this.setState({
            locale,
            currency,
            rates,
            departure,
        }, () => {
            this.onUpdateState();
        });
    }

    onUpdateState = () => {
        const { search } = window.location;
        if (search.length > 0) {
            const { departure, ...rest } = qs.parse(search);
            const departureDate = moment(departure);
            this.setState({
                departure: departureDate,
                ...rest,
            }, () => {
                this.onResetTicketData();
                if (process.env.MODE === 'dev') {
                    this.fetchTickets(); // for dev testing on mock data
                } else {
                    this.fetchTickets(search);
                }
            });
        } else {
            window.history.pushState('', '', '/');
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
        this.onResetTicketData();
        this.setState({
            departure: null,
            destination: null,
        });
    }

    fetchTickets = async (query = '') => {
        const { currency } = this.state;

        this.setState({ isLoading: true });
        const tickets = await getFormattedTickets(query);
        const stopOptions = getUniqueByKey(tickets, 'stops');
        const selectedStops = {
            [stopOptions[0]]: true,
        };
        const filteredTickets = this.filterTickets(tickets, [stopOptions[0]]);
        const rates = await fetchCurrencyRates(currency);

        this.setState({
            tickets,
            filteredTickets,
            stopOptions,
            selectedStops,
            isLoading: false,
            rates,
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { searchObj, search } = this.getSearchQuery();
        window.history.pushState(searchObj, '', `search?${search}`);
        if (process.env.MODE === 'dev') {
            this.fetchTickets(); // for dev testing on mock data
        } else {
            this.fetchTickets(search);
        }
    };

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    onDateSelect = (key, date) => {
        this.setState({
            [key]: date,
        });
    }

    onPlaceSelect = (code, key) => {
        const otherKey = key === 'origin' ? 'destination' : 'origin';
        const iataCode = this.state[otherKey] === code ? null : code;
        this.setState(() => ({
            [key]: iataCode,
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

        const departureDateString = departure
            ? moment(departure).format('YYYY-MM-DD')
            : null;

        const queryObject = {
            origin,
            destination,
            departure: departureDateString,
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

    filterTickets = (tickets, stops) => (
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
            origin,
            destination,
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
                        origin={origin}
                        destination={destination}
                        places={places}
                        onSubmit={this.onSubmit}
                        onPlaceSelect={this.onPlaceSelect}
                        onDateSelect={this.onDateSelect}
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
