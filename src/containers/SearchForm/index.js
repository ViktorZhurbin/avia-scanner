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
    } = props;

    return (
        <div className={cx('container')}>
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
                <div className={cx('searchForm')}>
                    <div className={cx('headerText')}>
                        {isLoading
                            ? 'Fetching tickets...'
                            : 'Flights and airline tickets'}
                    </div>
                    <form
                        className={cx('formContainer')}
                        onSubmit={onSubmit}
                        target="_self"
                    >
                        <div className={cx('formInput')}>
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
                            <DatePicker
                                handleChange={onDateSelect}
                                date={departure}
                                placeholder="Departure"
                            />
                            <div className={cx('buttonWrapper')}>
                                <Button isLoading={isLoading}>
                                    <div className={cx('buttonText')}>Search</div>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

SearchForm.propTypes = {
    origin: PropTypes.string.isRequired,
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
    selectedCurrency: PropTypes.string,
    departure: PropTypes.object, // eslint-disable-line
};

SearchForm.defaultProps = {
    isLoading: false,
    selectedCurrency: null,
    destination: null,
    departure: null,
};

export default SearchForm;
