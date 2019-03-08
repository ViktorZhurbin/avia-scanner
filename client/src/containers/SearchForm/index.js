import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { fetchTickets } from '../../utils/api';
import { resetTickets } from '../../state/tickets/ticketsActions';
import { resetSearch } from '../../state/search/searchActions';
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
        fullScreen: PropTypes.bool,
        search: searchPropType,
    };

    static defaultProps = {
        fullScreen: true,
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
        this.props.getTickets(queryString);
    };

    onUpdateState = () => {
        const { search } = window.location;
        if (search.length > 0) {
            this.props.getTickets(search);
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
            fullScreen,
            search,
        } = this.props;

        return (
            <div
                className={cx({
                    container: true,
                    fullScreen,
                })}
            >
                <div
                    className={cx({
                        isLoading,
                    })}
                />
                <div className={cx('innerContainer')}>
                    <NavBar
                        onResetState={this.onResetState}
                    />
                    <form
                        className={cx({
                            formContainer: true,
                            fullScreen,
                        })}
                        onSubmit={this.onSubmit}
                        target="_self"
                    >
                        <div
                            className={cx({
                                headerText: true,
                                fullScreen,
                            })}
                        >
                            {isLoading
                                ? 'Fetching tickets...'
                                : 'Flights and airline tickets'}
                        </div>
                        <div
                            className={cx({
                                formInput: true,
                                fullScreen,
                            })}
                        >
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
                                type="date"
                                id="departure"
                                value={search.departure}
                                placeholder="Start Date"
                            />
                        </div>
                        <div className={cx('formSubmit')}>
                            <Button isLoading={isLoading}>
                                <div className={cx('buttonText')}>
                                    {fullScreen
                                        ? 'Find tickets'
                                        : 'Find'}
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
    search,
});

const mapDispatchToProps = dispatch => ({
    getTickets: query => fetchTickets(query)(dispatch),
    resetTicketData: () => dispatch(resetTickets()),
    setInitialSearch: () => dispatch(resetSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
