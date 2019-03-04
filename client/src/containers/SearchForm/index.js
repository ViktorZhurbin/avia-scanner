import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { fetchTickets } from '../../utils/api';
import { resetTickets } from '../../state/tickets/ticketsActions';
import Select from '../Select';
import NavBar from '../NavBar';
import Button from '../../components/Button';
import { places } from '../../constants/mockData';
import { getISODatStringOfTodayPlusNdays } from '../../utils/string';

import styles from './index.css';

const cx = cl.bind(styles);

class SearchForm extends React.PureComponent {
    static propTypes = {
        getTickets: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        fullScreen: PropTypes.bool,
        locale: PropTypes.string,
        currency: PropTypes.string,
    };

    static defaultProps = {
        // isLoading: false,
        fullScreen: true,
        currency: null,
        locale: null,
    };

    state = {
        origin: places[0],
        destination: places[2],
        departure: null,
    }

    componentDidMount() {
        window.onpopstate = () => this.onUpdateState();
        const departure = getISODatStringOfTodayPlusNdays(14);
        this.setState({
            departure,
        }, () => {
            this.onUpdateState();
        });
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
            const { origin, destination, ...rest } = qs.parse(search);
            this.props.getTickets(search);
            // console.log(query);
            this.setState({
                origin: this.getLocationByCode(origin),
                destination: this.getLocationByCode(destination),
                ...rest,
            });
        } else {
            this.setState({
                // origin: null,
                // destination: null,
                // departure: null,
            }, () => this.onResetState());
        }
    }

    onResetState = () => {
        window.history.pushState('', '', '/');
        resetTickets();
    }

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    onSelect = (id, date) => {
        this.setState({
            [id]: date,
        });
    }

    onPlaceSelect = (id, place) => {
        const otherId = id === 'origin' ? 'destination' : 'origin';
        const location = this.state[otherId] === place ? null : place;
        this.setState(() => ({
            [id]: location,
        }));
    }

    getLocationByCode = code => (
        places.find(item => item.code === code)
    )

    getSearchQuery = () => {
        const {
            origin = null,
            destination = null,
            departure = null,
        } = this.state;

        const {
            locale = null,
            currency = null,
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
        } = this.props;

        const {
            origin,
            destination,
            departure,
        } = this.state;

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
                                onSelect={this.onSelect}
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

const mapStateToProps = ({ tickets }) => ({
    isLoading: tickets.isLoading,
    currency: tickets.currency,
});

const mapDispatchToProps = {
    getTickets: fetchTickets,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
