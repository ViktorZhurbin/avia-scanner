import React from 'react';

import FilterPanel from '../../containers/FilterPanel';
import TicketCard from '../../containers/TicketCard';
import Header from '../../containers/Header';

import styles from './Home.module.css';

import mockData from '../../utils/mockData';
import formatTicketData from '../../utils/formatTicketData';

const ticketData = formatTicketData(mockData);

const Home = () => (
    <div className={styles.container}>
        <Header />
        <div className={styles.content}>
            <FilterPanel />
            <div>
                {ticketData.map(ticket => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default Home;
