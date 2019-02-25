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
        onSelect,
        onDateChange,
        onResetState,
        isLoading,
        selectedCurrency,
    } = props;

    return (
        <div className={cx('container')}>
            <div className={cx('innerContainer')}>
                <NavBar
                    onResetState={onResetState}
                    onCurrencySelect={onSelect}
                    selectedCurrency={selectedCurrency}
                />
                <div className={cx('searchForm')}>
                    <div className={cx('headerText')}>
                        Flights and airline tickets
                    </div>
                    <form
                        className={cx('formContainer')}
                        onSubmit={onSubmit}
                        target="_self"
                    >
                        <div className={cx('formInput')}>
                            <div className={cx('places')}>
                                <PlaceSelect
                                    isFirst
                                    id="origin"
                                    itemList={places}
                                    iataCode={origin}
                                    onSelect={onSelect}
                                />
                                <PlaceSelect
                                    id="destination"
                                    itemList={places}
                                    iataCode={destination}
                                    onSelect={onSelect}
                                />
                            </div>
                            <div className={cx('dates')}>
                                <DatePicker
                                    handleChange={onDateChange}
                                />
                            </div>
                        </div>
                        <div className={cx('buttonWrapper')}>
                            <Button isLoading={isLoading}>
                                <div className={cx('buttonText')}>Search</div>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

SearchForm.propTypes = {
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    places: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            code: PropTypes.string,
        }),
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onResetState: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    selectedCurrency: PropTypes.string,
};

SearchForm.defaultProps = {
    isLoading: false,
    selectedCurrency: null,
};

export default SearchForm;
