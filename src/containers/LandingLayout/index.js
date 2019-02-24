import React from 'react';
import cl from 'classnames/bind';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';

import PlaceSelector from '../PlaceSelector';

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
        origin: places[0],
        destination: places[1],
    }

    onSubmit = () => null;

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    onSelect = (code, id) => {
        this.setState({
            [id]: code,
        });
    }

    getSearchQuery = () => {
        const {
            origin,
            destination,
        } = this.state;

        return `from=${origin.code}&to=${destination.code}`;
    };

    render() {
        const { origin, destination } = this.state;

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
                                    selectedItem={origin}
                                    onSelect={this.onSelect}
                                />
                            </div>
                            <div className={cx('placeItem')}>
                                <PlaceSelector
                                    id="destination"
                                    itemList={places}
                                    selectedItem={destination}
                                    onSelect={this.onSelect}
                                />
                            </div>
                        </div>
                        <div className={cx('dates')}>
                            <DateRangePicker
                                // momentPropTypes.momentObj or null,
                                startDate={this.state.startDate}
                                // PropTypes.string.isRequired,
                                startDateId="your_unique_start_date_id"
                                // momentPropTypes.momentObj or null,
                                endDate={this.state.endDate}
                                // PropTypes.string.isRequired,
                                endDateId="your_unique_end_date_id"
                                // PropTypes.func.isRequired,
                                onDatesChange={({ startDate, endDate }) => (
                                    this.setState({ startDate, endDate })
                                )}
                                // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                focusedInput={this.state.focusedInput}
                                // PropTypes.func.isRequired,
                                onFocusChange={focusedInput => this.setState({ focusedInput })}
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
