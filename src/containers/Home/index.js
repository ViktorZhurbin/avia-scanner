import React from 'react';

import Logo from '../../components/Logo';
import TicketCard from '../../components/TicketCard';

import styles from './Home.module.css';

import mockData from '../../utils/mockData';
import formatTicketData from '../../utils/formatTicketData';

const ticketData = formatTicketData(mockData);

const Home = () => (
    <div className={styles.container}>
        <Logo />
        <div className={styles.content}>
            {ticketData.map(ticket => (
                <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                />
            ))}
        </div>
    </div>
);

export default Home;
