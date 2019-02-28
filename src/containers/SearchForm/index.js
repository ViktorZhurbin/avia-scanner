import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import PlaceSelect from '../PlaceSelect';
import NavBar from '../NavBar';
import DatePicker from '../../components/DatePicker';
import Button from '../../components/Button';

import styles from './index.css';

import 'react-dates/lib/css/_datepicker.css';
import '../../custom/datepickerOverrides.css';

const cx = cl.bind(styles);

const SearchForm = (props) => {
    const {
        origin,
        destination,
        places,
        onSubmit,
        onPlaceSelect,
        onDateSelect,
        onResetState,
        isLoading,
        selectedCurrency,
        departure,
        fullScreen,
    } = props;

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
                    onResetState={onResetState}
                    onCurrencySelect={onPlaceSelect}
                    selectedCurrency={selectedCurrency}
                />
                <form
                    className={cx({
                        formContainer: true,
                        fullScreen,
                    })}
                    onSubmit={onSubmit}
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
                        <PlaceSelect
                            isFirst
                            id="origin"
                            itemList={places}
                            iataCode={origin}
                            onSelect={onPlaceSelect}
                            placeholder="From"
                        />
                        <PlaceSelect
                            id="destination"
                            itemList={places}
                            iataCode={destination}
                            onSelect={onPlaceSelect}
                            placeholder="To"
                        />
                        <div className={cx('dateSelect')}>
                            <DatePicker
                                handleChange={onDateSelect}
                                date={departure}
                                placeholder="Departure"
                            />
                        </div>
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
};

SearchForm.propTypes = {
    origin: PropTypes.string,
    destination: PropTypes.string,
    places: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            code: PropTypes.string,
        }),
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onPlaceSelect: PropTypes.func.isRequired,
    onDateSelect: PropTypes.func.isRequired,
    onResetState: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    fullScreen: PropTypes.bool,
    selectedCurrency: PropTypes.string,
    departure: PropTypes.object, // eslint-disable-line
};

SearchForm.defaultProps = {
    isLoading: false,
    fullScreen: true,
    selectedCurrency: null,
    origin: null,
    destination: null,
    departure: null,
};

export default SearchForm;
