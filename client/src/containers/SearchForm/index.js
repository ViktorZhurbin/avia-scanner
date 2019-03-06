import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { fetchTickets } from '../../utils/api';
import { resetTickets } from '../../state/tickets/ticketsActions';
import { resetSearch } from '../../state/search/searchActions';
import { placePropType } from '../../entities/propTypes';

import Select from '../Select';
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
        locale: PropTypes.string,
        currency: PropTypes.string,
        origin: placePropType,
        destination: placePropType,
        departure: PropTypes.string,
    };

    static defaultProps = {
        fullScreen: true,
        currency: null,
        locale: null,
        origin: null,
        destination: null,
        departure: null,
    };

    componentDidMount() {
        window.onpopstate = () => this.onUpdateState();
        this.onUpdateState();
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { searchObj, search } = this.getSearchQuery();
        window.history.pushState(searchObj, '', search);
        this.props.getTickets(search);
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
            locale = null,
            currency = null,
            origin = {},
            destination = {},
            departure = null,
        } = this.props;

        const queryObject = {
            origin: origin && origin.code,
            destination: destination && destination.code,
            departure,
            locale,
            currency,
        };
        const queryString = qs.stringify(queryObject);

        return {
            searchObj: queryObject,
            search: `?${queryString}`,
        };
    };

    render() {
        const {
            isLoading,
            fullScreen,
            origin,
            destination,
            departure,
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
                        <div className={cx('headerText')}>
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
                            <Select
                                isFirst
                                type="place"
                                id="origin"
                                value={origin}
                                onSelect={this.onPlaceSelect}
                                placeholder="From"
                            />
                            <Select
                                type="place"
                                id="destination"
                                value={destination}
                                onSelect={this.onPlaceSelect}
                                placeholder="To"
                            />
                            <Select
                                isLast
                                type="date"
                                id="departure"
                                value={departure}
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
    currency: search.currency,
    locale: search.locale,
    origin: search.origin,
    destination: search.destination,
    departure: search.departure,
});

const mapDispatchToProps = dispatch => ({
    getTickets: query => fetchTickets(query)(dispatch),
    resetTicketData: () => dispatch(resetTickets()),
    setInitialSearch: () => dispatch(resetSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
