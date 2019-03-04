import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Filters from '../Filters';
import Ticket from '../Ticket';
import NoResuts from '../../components/NoResults';

import { fetchCurrencyRates } from '../../utils/api';
import { ticketPropType } from '../../entities/propTypes';

import styles from './index.css';

const cx = classNames.bind(styles);

class SearchResults extends React.PureComponent {
    static propTypes = {
        locale: PropTypes.string,
        currency: PropTypes.string,
        ticketData: PropTypes.shape({
            allTickets: PropTypes.arrayOf(ticketPropType),
            filteredTickets: PropTypes.arrayOf(ticketPropType),
            stopOptions: PropTypes.arrayOf(PropTypes.number),
        }),
    };

    static defaultProps = {
        locale: null,
        currency: null,
        ticketData: {},
    }

    state = {
        allTickets: [],
        filteredTickets: [],
        stopOptions: [],
        selectedStops: {},
        rates: {},
    }

    async componentDidMount() {
        const { currency, ticketData } = this.props;
        const { allTickets, filteredTickets, stopOptions } = ticketData;

        const rates = await fetchCurrencyRates(currency);
        const selectedStops = {
            [stopOptions[0]]: true,
        };
        this.setState({
            rates,
            allTickets,
            filteredTickets,
            stopOptions,
            selectedStops,
        });
    }

    onFilterByStops = (selectedStops) => {
        const { allTickets } = this.state;

        const filteredTickets = allTickets.filter(({ stops }) => (
            selectedStops[stops]
        ));
        this.setState({
            filteredTickets,
            selectedStops,
        });
    }

    onResetFilters = () => {
        const { stopOptions } = this.state;

        this.onFilterByStops({ [stopOptions[0]]: true });
    }

    render() {
        const { locale, currency } = this.props;
        const {
            allTickets,
            filteredTickets,
            stopOptions,
            selectedStops,
            rates,
        } = this.state;

        const hasTickets = allTickets && allTickets.length > 0;
        const hasFilteredTickets = hasTickets
            && (filteredTickets && filteredTickets.length > 0);

        return (
            <div className={cx('container')}>
                <div
                    className={cx({
                        filters: true,
                    })}
                >
                    <Filters
                        stopOptions={stopOptions}
                        selectedStops={selectedStops}
                        onFilter={this.onFilterByStops}
                    />
                </div>
                {
                    hasTickets && !hasFilteredTickets
                        ? (
                            <NoResuts
                                ticketsCount={allTickets.length}
                                onFilterReset={this.onResetFilters}
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
