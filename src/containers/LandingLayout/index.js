import React from 'react';
import cl from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import quryString from 'query-string';

import PlaceSelector from '../PlaceSelector';
import DatePicker from '../../components/DatePicker';

import styles from './index.css';

import 'react-dates/lib/css/_datepicker.css';

const cx = cl.bind(styles);

const places = [
    {
        code: 'LHR',
        name: 'London',
    },
    {
        code: 'CDG',
        name: 'Paris',
    },
    {
        code: 'SVO',
        name: 'Moscow',
    },
];

class LandingLayout extends React.Component {
    state = {
        origin: places[0].code,
        destination: places[1].code,
        departure: null,
    }

    onSubmit = () => null;

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    onDateChange = (departure) => {
        if (departure) {
            this.setState({
                departure,
            });
        }
    }

    onSelect = (code, id) => {
        this.setState({
            [id]: code,
        });
    }

    getSearchQuery = () => {
        const {
            origin = null,
            destination = null,
            departure = null,
        } = this.state;

        const queryObject = {
            origin,
            destination,
            departure,
        };

        return quryString.stringify(queryObject);
    };

    render() {
        const { origin, destination } = this.state;

        moment.locale('en');
        const searchQuery = this.getSearchQuery();

        return (
            <div className={cx('container')}>
                <div className={cx('header')}>
                    Flights and airline tickets
                </div>
                <form
                    className={cx('formContainer')}
                    onSubmit={this.onSubmit}
                    target="_self"
                >
                    <div className={cx('formInput')}>
                        <div className={cx('places')}>
                            <div className={cx('placeItem')}>
                                <PlaceSelector
                                    id="origin"
                                    itemList={places}
                                    iataCode={origin}
                                    onSelect={this.onSelect}
                                />
                            </div>
                            <div className={cx('placeItem')}>
                                <PlaceSelector
                                    id="destination"
                                    itemList={places}
                                    iataCode={destination}
                                    onSelect={this.onSelect}
                                />
                            </div>
                        </div>
                        <div className={cx('dates')}>
                            <DatePicker
                                handleChange={this.onDateChange}
                            />
                        </div>
                    </div>
                    <div className={cx('buttonWrapper')}>
                        <Link to={`/search?${searchQuery}`}>
                            <button
                                className={cx('submitButton')}
                                type="submit"
                            >
                                Search
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default LandingLayout;
