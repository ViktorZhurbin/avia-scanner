import React from 'react';

import FilterGroup from '../../containers/FilterGroup';
import TicketCard from '../../containers/TicketCard';
import Header from '../../containers/Header';

import styles from './Home.module.css';

import mockData from '../../utils/mockData';
import formatTicketData from '../../utils/formatTicketData';
import getUniqueByKey from '../../utils/objectHelpers';

const Home = () => {
    const ticketData = formatTicketData(mockData);
    const stopsOptions = getUniqueByKey(ticketData, 'stops');

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <FilterGroup stops={stopsOptions} />
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
};

export default Home;
