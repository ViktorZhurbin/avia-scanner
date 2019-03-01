import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Select from '../Select';
import NavBar from '../NavBar';
import Button from '../../components/Button';

import styles from './index.css';

const cx = cl.bind(styles);

const SearchForm = (props) => {
    const {
        originName,
        destinationName,
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
                        <Select
                            isFirst
                            type="place"
                            id="origin"
                            value={originName}
                            onSelect={onPlaceSelect}
                            placeholder="From"
                        />
                        <Select
                            type="place"
                            id="destination"
                            value={destinationName}
                            onSelect={onPlaceSelect}
                            placeholder="To"
                        />
                        <Select
                            isLast
                            type="date"
                            id="departure"
                            value={departure}
                            onSelect={onDateSelect}
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
};

SearchForm.propTypes = {
    originName: PropTypes.string,
    destinationName: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onPlaceSelect: PropTypes.func.isRequired,
    onDateSelect: PropTypes.func.isRequired,
    onResetState: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    fullScreen: PropTypes.bool,
    selectedCurrency: PropTypes.string,
    departure: PropTypes.string,
};

SearchForm.defaultProps = {
    isLoading: false,
    fullScreen: true,
    selectedCurrency: null,
    originName: null,
    destinationName: null,
    departure: null,
};

export default SearchForm;
