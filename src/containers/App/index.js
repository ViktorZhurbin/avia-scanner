import React from 'react';
import quryString from 'query-string';
import cl from 'classnames/bind';
import moment from 'moment';

import SearchResults from '../SearchResults';
import SearchForm from '../SearchForm';

import { places } from '../../constants/mockData';
import getUniqueByKey from '../../utils/objectHelpers';
import { getFormattedTickets } from '../../utils/api';
import getBrowserLocale from '../../utils/getBrowserLocale';

import styles from './index.css';

const cx = cl.bind(styles);

class App extends React.Component {
    state = {
        origin: places[0].code,
        destination: places[1].code,
        departure: null,
        tickets: [],
        filteredTickets: [],
        stopOptions: [],
        selectedStops: {},
        locale: null,
    }

    componentDidMount() {
        const locale = getBrowserLocale();
        this.setState({ locale });
        const query = window.location.search;
        if (query.length > 0) {
            this.fetchTickets(query);
        }
    }

    onResetState = () => {
        window.history.pushState('', '', '/');
        this.setState({
            tickets: [],
            filteredTickets: [],
            stopOptions: [],
            selectedStops: {},
        });
    }

    fetchTickets = async (query = '') => {
        const tickets = await getFormattedTickets(query);
        const stopOptions = getUniqueByKey(tickets, 'stops');
        const selectedStops = {
            [stopOptions[0]]: true,
        };
        const filteredTickets = this.filterTickets(tickets, [stopOptions[0]]);

        this.setState({
            tickets,
            filteredTickets,
            stopOptions,
            selectedStops,
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const query = this.getSearchQuery();
        window.history.pushState(query, '', `search?${query}`);
        this.fetchTickets(query);
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

    onPlaceSelect = (code, id) => {
        this.setState({
            [id]: code,
        });
    }

    getSearchQuery = () => {
        const {
            origin = null,
            destination = null,
            departure = null,
            locale = null,
        } = this.state;

        const userLocale = locale || getBrowserLocale();

        const queryObject = {
            origin,
            destination,
            departure,
            locale: userLocale,
        };

        return quryString.stringify(queryObject);
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
                        origin={origin}
                        destination={destination}
                        places={places}
                        onSubmit={this.onSubmit}
                        onPlaceSelect={this.onPlaceSelect}
                        onDateChange={this.onDateChange}
                        locale={locale}
                        onResetState={this.onResetState}
                    />
                </div>
                {hasResults
                    ? (
                        <div className={cx('results')}>
                            <SearchResults
                                tickets={tickets}
                                filteredTickets={filteredTickets}
                                stopOptions={stopOptions}
                                selectedStops={selectedStops}
                                onFilterByStops={this.onFilterByStops}
                                onResetFilters={this.onResetFilters}
                            />
                        </div>
                    )
                    : null}
            </div>
        );
    }
}

export default App;
