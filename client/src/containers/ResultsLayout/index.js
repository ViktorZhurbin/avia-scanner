import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Filters from '../Filters';
import TicketList from '../TicketList';

import { ticketPropType } from '../../entities/propTypes';
import getFilteredTickets from '../../store/ticketData/selectors';

import styles from './index.css';

const cx = cl.bind(styles);

class ResultsLayout extends React.Component {
    static propTypes = {
        hasTickets: PropTypes.bool,
        filteredTickets: PropTypes.arrayOf(ticketPropType),
        ticketData: PropTypes.shape({
            allTickets: PropTypes.arrayOf(ticketPropType),
            filteredTickets: PropTypes.arrayOf(ticketPropType),
            stopOptions: PropTypes.arrayOf(PropTypes.number),
            currencyRates: PropTypes.objectOf(PropTypes.number),
        }),
    };

    static defaultProps = {
        ticketData: {},
        filteredTickets: [],
        hasTickets: false,
    }

    render() {
        const {
            ticketData,
            hasTickets,
            filteredTickets,
        } = this.props;
        const { allTickets, currencyRates } = ticketData;

        return (
            hasTickets
                ? (
                    <div className={cx('container')}>
                        <Filters />
                        <TicketList
                            currencyRates={currencyRates}
                            hasTickets={hasTickets}
                            filteredTickets={filteredTickets}
                            allTicketsCount={allTickets.length}
                            onFilterReset={this.onFilterReset}
                        />
                    </div>
                )
                : null
        );
    }
}

const mapStateToProps = ({ tickets }) => ({
    ticketData: tickets.ticketData,
    hasTickets: tickets.hasTickets,
    filteredTickets: getFilteredTickets(tickets),
});

export default connect(mapStateToProps, null)(ResultsLayout);
