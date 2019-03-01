import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Filters from '../Filters';
import Ticket from '../Ticket';
import NoResuts from '../../components/NoResults';

import { ticketPropType } from '../../entities/propTypes';

import styles from './index.css';

const cx = classNames.bind(styles);

class SearchResults extends React.PureComponent {
    static propTypes = {
        tickets: PropTypes.arrayOf(ticketPropType).isRequired,
        filteredTickets: PropTypes.arrayOf(ticketPropType).isRequired,
        stopOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
        selectedStops: PropTypes.objectOf(PropTypes.bool).isRequired,
        rates: PropTypes.objectOf(PropTypes.number).isRequired,
        onFilterByStops: PropTypes.func.isRequired,
        onResetFilters: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
    };

    state = {
        isFilterVisible: true,
    }

    render() {
        const {
            tickets,
            filteredTickets,
            stopOptions,
            selectedStops,
            onFilterByStops,
            onResetFilters,
            locale,
            currency,
            rates,
        } = this.props;
        const { isFilterVisible } = this.state;

        const hasFilteredTickets = tickets.length > 0 && filteredTickets.length > 0;

        return (
            <div className={cx('container')}>
                <div
                    className={cx({
                        filters: true,
                        isVisible: isFilterVisible,
                    })}
                >
                    <Filters
                        stopOptions={stopOptions}
                        selectedStops={selectedStops}
                        onFilter={onFilterByStops}
                    />
                </div>
                {
                    !hasFilteredTickets
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
                                        currency={currency}
                                        ticket={ticket}
                                        rates={rates}
                                    />
                                ))}
                            </div>
                        )
                }
            </div>
        );
    }
}

export default SearchResults;
