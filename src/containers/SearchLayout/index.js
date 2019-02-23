import React from 'react';
import classNames from 'classnames/bind';

import FilterGroup from '../FilterGroup';
import TicketCard from '../TicketCard';
import Header from '../Header';

import getUniqueByKey from '../../utils/objectHelpers';
import { getFormattedTickets } from '../../utils/api';

import styles from './index.css';

const cx = classNames.bind(styles);

class SearchLayout extends React.Component {
    state = {
        tickets: [],
        filteredTickets: [],
        stopOptions: [],
        selectedStops: {},
    }

    async componentDidMount() {
        const tickets = await getFormattedTickets({ mockData: true });
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

    resetFilters = () => {
        const { stopOptions } = this.state;

        this.onFilterByStops({ [stopOptions[0]]: true });
    }

    render() {
        const {
            tickets,
            filteredTickets,
            stopOptions,
            selectedStops,
        } = this.state;

        const hasFilteredTickets = filteredTickets && filteredTickets.length > 0;

        return (
            <div className={cx('container')}>
                <Header />
                <div className={cx('content')}>
                    <FilterGroup
                        stopOptions={stopOptions}
                        selectedStops={selectedStops}
                        onFilter={this.onFilterByStops}
                    />
                    {tickets && !hasFilteredTickets
                        ? (
                            <TicketCard
                                onFilterReset={this.resetFilters}
                            />
                        )
                        : (
                            <div>
                                {filteredTickets.map(ticket => (
                                    <TicketCard
                                        key={ticket.id}
                                        ticket={ticket}
                                    />
                                ))}
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default SearchLayout;
