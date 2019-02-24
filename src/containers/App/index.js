import React from 'react';
import cl from 'classnames/bind';
import quryString from 'query-string';

import SearchResults from '../SearchResults';
import SearchForm from '../SearchForm';

import { places } from '../../constants/mockData';
import getUniqueByKey from '../../utils/objectHelpers';
import { getFormattedTickets } from '../../utils/api';

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
    }

    async componentDidMount() {
        const { location } = this.props; // eslint-disable-line

        const tickets = await getFormattedTickets();
        // const tickets = await getFormattedTickets(location.search);
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

    onSubmit = () => null;

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    onDateChange = (departure) => {
        if (departure) {
            this.setState({
                departure,
            });
        }
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
        } = this.state;

        const queryObject = {
            origin,
            destination,
            departure,
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

        return (
            <div className={cx('container')}>
                <SearchForm
                    origin={origin}
                    destination={destination}
                    places={places}
                    onSubmit={this.onSubmit}
                    onPlaceSelect={this.onPlaceSelect}
                    onDateChange={this.onDateChange}
                    locale={locale}
                />
                <SearchResults
                    tickets={tickets}
                    filteredTickets={filteredTickets}
                    stopOptions={stopOptions}
                    selectedStops={selectedStops}
                    onFilterByStops={this.onFilterByStops}
                    onResetFilters={this.onResetFilters}
                />
            </div>
        );
    }
}

export default App;
