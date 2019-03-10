import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { resetTickets, fetchTicketData } from '../../store/tickets';
import { resetSearch } from '../../store/search';
import { searchPropType } from '../../entities/propTypes';

import DateSelect from './DateSelect';
import PlaceSelect from './PlaceSelect';
import NavBar from '../NavBar';
import Button from '../../components/Button';

import styles from './index.css';

const cx = cl.bind(styles);

class SearchForm extends React.PureComponent {
    static propTypes = {
        getTickets: PropTypes.func.isRequired,
        setInitialSearch: PropTypes.func.isRequired,
        resetTicketData: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        hasTickets: PropTypes.bool,
        search: searchPropType,
    };

    static defaultProps = {
        hasTickets: false,
        search: {},
    };

    componentDidMount() {
        window.onpopstate = () => this.onUpdateState();
        this.onUpdateState();
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { queryObject, queryString } = this.getSearchQuery();
        window.history.pushState(queryObject, '', queryString);
        this.props.getTickets();
    };

    onUpdateState = () => {
        const { search } = window.location;
        if (search.length > 0) {
            this.props.getTickets();
        } else {
            this.onResetState();
        }
    }

    onResetState = () => {
        window.history.pushState('', '', '/');
        this.props.setInitialSearch();
        this.props.resetTicketData();
    }

    getSearchQuery = () => {
        const {
            origin,
            destination,
            currency,
            ...rest
        } = this.props.search;

        const queryObject = {
            origin: origin.code,
            destination: destination.code,
            currency: currency.code,
            ...rest,
        };
        const queryString = `?${qs.stringify(queryObject)}`;

        return {
            queryObject,
            queryString,
        };
    };

    render() {
        const {
            isLoading,
            hasTickets,
            search,
        } = this.props;

        return (
            <div className={cx('container', { hasTickets })}>
                <div className={cx('innerContainer', { hasTickets })}>
                    <div className={cx({ isLoading })} />
                    <NavBar
                        onResetState={this.onResetState}
                    />
                    <form
                        className={cx('form', { hasTickets })}
                        onSubmit={this.onSubmit}
                        target="_self"
                    >
                        <div className={cx('header', { hasTickets })}>
                            {isLoading
                                ? 'Fetching tickets...'
                                : 'Flights and airline tickets'}
                        </div>
                        <div className={cx('input', { hasTickets })}>
                            <PlaceSelect
                                isFirst
                                id="origin"
                                value={search.origin}
                                placeholder="From"
                            />
                            <PlaceSelect
                                id="destination"
                                value={search.destination}
                                placeholder="To"
                            />
                            <DateSelect
                                isLast
                                id="departure"
                                value={search.departure}
                                placeholder="Depart"
                            />
                        </div>
                        <div className={cx('button')}>
                            <Button isLoading={isLoading}>
                                <div className={cx('buttonText')}>
                                    {hasTickets
                                        ? 'Find'
                                        : 'Find tickets'}
                                </div>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ tickets, search }) => ({
    isLoading: tickets.isLoading,
    hasTickets: tickets.hasTickets,
    search,
});

const mapDispatchToProps = dispatch => ({
    getTickets: query => dispatch(fetchTicketData(query)),
    resetTicketData: () => dispatch(resetTickets()),
    setInitialSearch: () => dispatch(resetSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
