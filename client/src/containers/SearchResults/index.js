import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import Filters from '../Filters';
import Ticket from '../Ticket';
import NoResuts from '../../components/NoResults';

import { ticketPropType } from '../../entities/propTypes';

import styles from './index.css';

const cx = classNames.bind(styles);

class SearchResults extends React.PureComponent {
    static propTypes = {
        locale: PropTypes.string,
        currency: PropTypes.string,
        hasTickets: PropTypes.bool,
        ticketData: PropTypes.shape({
            allTickets: PropTypes.arrayOf(ticketPropType),
            filteredTickets: PropTypes.arrayOf(ticketPropType),
            stopOptions: PropTypes.arrayOf(PropTypes.number),
            currencyRates: PropTypes.objectOf(PropTypes.number),
        }),
    };

    static defaultProps = {
        locale: null,
        currency: null,
        ticketData: {},
        hasTickets: false,
    }

    state = {
        filteredTickets: [],
        selectedStops: {},
    }

    componentDidMount() {
        this.onUpdateState();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ticketData !== this.props.ticketData) {
            this.onUpdateState();
        }
    }

    onUpdateState = async () => {
        const { ticketData } = this.props;
        const { filteredTickets, stopOptions } = ticketData;

        const selectedStops = {
            [stopOptions[0]]: true,
        };
        this.setState({
            filteredTickets,
            selectedStops,
        });
    }

    onFilterByStops = (selectedStops) => {
        const { ticketData } = this.props;

        const filteredTickets = ticketData.allTickets.filter(({ stops }) => (
            selectedStops[stops]
        ));
        this.setState(() => ({
            filteredTickets,
            selectedStops,
        }));
    }

    onResetFilters = () => {
        const { stopOptions } = this.props.ticketData;

        this.onFilterByStops({ [stopOptions[0]]: true });
    }

    render() {
        const { locale, currency } = this.props;
        const {
            filteredTickets,
            selectedStops,
        } = this.state;
        const { ticketData, hasTickets } = this.props;
        const { stopOptions, allTickets, currencyRates } = ticketData;

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
                                        rates={currencyRates}
                                    />
                                ))}
                            </div>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = ({ tickets }) => ({
    ticketData: tickets.ticketData,
    hasTickets: tickets.hasTickets,
    currency: tickets.currency,
    locale: tickets.locale,
});

export default connect(mapStateToProps, null)(SearchResults);
