import React from 'react';

import FilterGroup from '../../containers/FilterGroup';
import TicketCard from '../../containers/TicketCard';
import Header from '../../containers/Header';

import styles from './Home.module.css';

import getUniqueByKey from '../../utils/objectHelpers';
import { getFormattedTickets } from '../../utils/formatTicketData';

class Home extends React.Component {
    state = {
        tickets: [],
        filteredTickets: [],
        availableStops: [],
    }

    componentDidMount() {
        const tickets = getFormattedTickets();
        const availableStops = getUniqueByKey(tickets, 'stops');
        const selectedStops = [availableStops[0]];
        const filteredTickets = this.filterTickets(tickets, selectedStops);
        this.setState({
            tickets,
            filteredTickets,
            availableStops,
        });
    }

    onFilterStops = (selectedStops) => {
        const { tickets } = this.state;

        const filteredTickets = tickets.filter(({ stops }) => (
            selectedStops[stops]
        ));
        this.setState({
            filteredTickets,
        });
    }

    filterTickets = (tickets, stops) => (
        tickets.filter(ticket => (
            stops.includes(ticket.stops)
        ))
    );

    render() {
        const { filteredTickets, availableStops } = this.state;

        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <FilterGroup
                        stops={availableStops}
                        onFilter={this.onFilterStops}
                    />
                    {filteredTickets
                        ? (
                            <div>
                                {filteredTickets.map(ticket => (
                                    <TicketCard
                                        key={ticket.id}
                                        ticket={ticket}
                                    />
                                ))}
                            </div>
                        )
                        : null}
                </div>
            </div>
        );
    }
}

export default Home;
