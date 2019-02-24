import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FilterGroup from '../FilterGroup';
import TicketCard from '../TicketCard';

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
    } = props;

    const hasFilteredTickets = filteredTickets && filteredTickets.length > 0;

    return (
        <div className={cx('container')}>
            <FilterGroup
                stopOptions={stopOptions}
                selectedStops={selectedStops}
                onFilter={onFilterByStops}
            />
            {tickets && !hasFilteredTickets
                ? (
                    <TicketCard
                        onFilterReset={onResetFilters}
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
    );
};

SearchResults.propTypes = {
    tickets: PropTypes.arrayOf(ticketPropType).isRequired,
    filteredTickets: PropTypes.arrayOf(ticketPropType).isRequired,
    stopOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedStops: PropTypes.objectOf(PropTypes.bool).isRequired,
    onFilterByStops: PropTypes.func.isRequired,
    onResetFilters: PropTypes.func.isRequired,
};

export default SearchResults;
