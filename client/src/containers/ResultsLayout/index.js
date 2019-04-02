import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Filters from '../Filters';
import TicketList from '../TicketList';

import { ticketPropType } from '../../entities/propTypes';

import styles from './index.css';

const cx = cl.bind(styles);

class ResultsLayout extends React.Component {
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
        const { hasTickets } = this.props;

        if (hasTickets) {
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

    onFilterReset = () => {
        const { ticketData: { stopOptions } = [] } = this.props;

        this.onFilterByStops({ [stopOptions[0]]: true });
    }

    render() {
        const {
            filteredTickets,
            selectedStops,
        } = this.state;
        const { ticketData, hasTickets } = this.props;
        const { stopOptions, allTickets, currencyRates } = ticketData;

        return (
            hasTickets
                ? (
                    <div className={cx('container')}>
                        <Filters
                            stopOptions={stopOptions}
                            selectedStops={selectedStops}
                            onFilter={this.onFilterByStops}
                        />
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
});

export default connect(mapStateToProps, null)(ResultsLayout);
