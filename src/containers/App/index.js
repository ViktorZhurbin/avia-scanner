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
import getBrowserLocale from '../../utils/getBrowserLocale';

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
        moment.locale(locale);
        const currency = localeCurrency.getCurrency(locale);
        const rates = await fetchCurrencyRates(currency);
        this.setState({
            locale,
            currency,
            rates,
        }, () => {
            this.onUpdateState();
        });
    }

    onUpdateState = () => {
        const { search } = window.location;
        if (search.length > 0) {
            const queryObject = qs.parse(search);
            this.setState({ ...queryObject }, () => {
                this.onResetState();
                // this.fetchTickets(search);
                this.fetchTickets();
            });
        } else {
            window.history.pushState('', '', '/');
            this.onResetState();
        }
    }

    onResetState = () => {
        this.setState({
            tickets: [],
            filteredTickets: [],
            stopOptions: [],
            selectedStops: {},
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
        // this.fetchTickets(search);
        this.fetchTickets();
    };

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    onDateChange = (key, date) => {
        const dateString = date
            ? moment(date).format('YYYY-MM-DD')
            : null;
        this.setState({
            [key]: dateString,
        });
    }

    onSelect = (code, key) => {
        this.setState({
            [key]: code,
        });
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
        } = this.state;

        const hasResults = tickets.length > 0;

        return (
            <div>
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
                        onSelect={this.onSelect}
                        onDateChange={this.onDateChange}
                        onResetState={this.onResetState}
                        selectedCurrency={currency}
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
