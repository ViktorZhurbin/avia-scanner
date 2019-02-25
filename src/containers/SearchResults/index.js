import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Filters from '../Filters';
import Ticket from '../Ticket';
import NoResuts from '../../components/NoResults';

import ticketPropType from '../../entities/propTypes';

import styles from './index.css';

const cx = classNames.bind(styles);

const SearchResults = (props) => {
    const {
        tickets,
        filteredTickets,
        stopOptions,
        selectedStops,
        onFilterByStops,
        onResetFilters,
        locale,
    } = props;

    const hasFilteredTickets = tickets.length > 0 && filteredTickets.length > 0;

    return (
        <div className={cx('container')}>
            <Filters
                stopOptions={stopOptions}
                selectedStops={selectedStops}
                onFilter={onFilterByStops}
            />
            {!hasFilteredTickets
                ? (
                    <NoResuts
                        ticketsCount={tickets.length}
                        onFilterReset={onResetFilters}
                    />
                )
                : (
                    <div>
                        {filteredTickets.map(ticket => (
                            <Ticket
                                key={ticket.id}
                                locale={locale}
                                ticket={ticket}
                            />
                        ))}
                    </div>
                )}
        </div>
    );
};

SearchResults.propTypes = {
    tickets: PropTypes.arrayOf(ticketPropType).isRequired,
    filteredTickets: PropTypes.arrayOf(ticketPropType).isRequired,
    stopOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedStops: PropTypes.objectOf(PropTypes.bool).isRequired,
    onFilterByStops: PropTypes.func.isRequired,
    onResetFilters: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
};

export default SearchResults;
