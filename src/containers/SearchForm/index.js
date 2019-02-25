import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import moment from 'moment';

import PlaceSelector from '../PlaceSelector';
import DatePicker from '../../components/DatePicker';
import NavBar from '../NavBar';

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
    } = props;

    moment.locale(locale);

    return (
        <div className={cx('container')}>
            <NavBar />
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
                            {[origin, destination].map((item, index) => (
                                <PlaceSelector
                                    key={item}
                                    isFirst={index === 0}
                                    id={item}
                                    itemList={places}
                                    iataCode={item}
                                    onSelect={onPlaceSelect}
                                />
                            ))}
                        </div>
                        <div className={cx('dates')}>
                            <DatePicker
                                handleChange={onDateChange}
                            />
                        </div>
                    </div>
                    <div className={cx('buttonWrapper')}>
                        <button
                            className={cx('submitButton')}
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </form>
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
    locale: PropTypes.string,
};

SearchForm.defaultProps = {
    locale: 'en',
};

export default SearchForm;
