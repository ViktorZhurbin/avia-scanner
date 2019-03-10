import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Filters from '../Filters';
import Ticket from '../Ticket';
import NoResuts from '../../components/NoResults';

import { ticketPropType } from '../../entities/propTypes';

import styles from './index.css';

const cx = cl.bind(styles);

class SearchResults extends React.PureComponent {
    static propTypes = {
        hasTickets: PropTypes.bool,
        ticketData: PropTypes.shape({
            allTickets: PropTypes.arrayOf(ticketPropType),
            filteredTickets: PropTypes.arrayOf(ticketPropType),
            stopOptions: PropTypes.arrayOf(PropTypes.number),
            currencyRates: PropTypes.objectOf(PropTypes.number),
        }),
    };

    static defaultProps = {
        ticketData: {},
        hasTickets: false,
    }

    state = {
        filteredTickets: [],
        selectedStops: {},
    }

    componentDidMount() {
        if (this.props.hasTickets) {
            this.onUpdateState();
        }
    }

    componentDidUpdate(prevProps) {
        const { ticketData, hasTickets } = this.props;

        if (hasTickets
            && prevProps.ticketData !== ticketData) {
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
        const {
            filteredTickets,
            selectedStops,
        } = this.state;
        const { ticketData, hasTickets } = this.props;
        const { stopOptions, allTickets, currencyRates } = ticketData;

        const hasFilteredTickets = hasTickets
            && (filteredTickets && filteredTickets.length > 0);

        return (
            hasTickets
                ? (
                    <div className={cx('container')}>
                        <div className={cx('filters')}>
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
                                                ticket={ticket}
                                                rates={currencyRates}
                                            />
                                        ))}
                                    </div>
                                )
                        }
                    </div>
                )
                : null
        );
    }
}

const mapStateToProps = ({ tickets }) => ({
    ticketData: tickets.ticketData,
    hasTickets: tickets.hasTickets,
});

export default connect(mapStateToProps, null)(SearchResults);
