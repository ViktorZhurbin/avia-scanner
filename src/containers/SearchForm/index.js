import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import moment from 'moment';

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
        onDateChange,
        locale,
        onResetState,
    } = props;

    moment.locale(locale);

    return (
        <div className={cx('container')}>
            <div className={cx('innerContainer')}>
                <NavBar onResetState={onResetState} />
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
                                    onSelect={onPlaceSelect}
                                />
                                <PlaceSelect
                                    id="destination"
                                    itemList={places}
                                    iataCode={destination}
                                    onSelect={onPlaceSelect}
                                />
                            </div>
                            <div className={cx('dates')}>
                                <DatePicker
                                    handleChange={onDateChange}
                                />
                            </div>
                        </div>
                        <div className={cx('buttonWrapper')}>
                            <Button>
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
    onPlaceSelect: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onResetState: PropTypes.func.isRequired,
    locale: PropTypes.string,
};

SearchForm.defaultProps = {
    locale: 'en',
};

export default SearchForm;
