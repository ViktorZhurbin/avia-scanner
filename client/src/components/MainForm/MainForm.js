import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Button from '../Button';
import DateSelect from './DateSelect';
import PlaceSelect from './PlaceSelect';
import { searchPropType } from '../../entities/propTypes';
import { validateQueryString, getQueryStringFromSearch } from '../../utils/string';

import styles from './MainForm.css';

const cx = cl.bind(styles);

const MainForm = ({
    onSubmit,
    isLoading,
    hasTickets,
    search,
    setUpOrigin,
    setUpDestination,
    setUpDeparture
}) => {
    const [highlightedFields, setHighlightedFields] = useState([]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const queryString = getQueryStringFromSearch(search);
        const { isValid, missingValues } = validateQueryString(queryString);
        if (isValid) {
            onSubmit(queryString);
        } else {
            setHighlightedFields(missingValues);
            setTimeout(() => {
                setHighlightedFields([]);
            }, 1000);
        }
    };

    return (
        <form
            className={cx('form', { hasTickets })}
            target="_self"
            onSubmit={onFormSubmit}
        >
            <div className={cx('header', { hasTickets })}>
                {isLoading
                    ? 'Fetching tickets...'
                    : 'Flights and airline tickets'}
            </div>
            <div className={cx('input', { hasTickets })}>
                <PlaceSelect
                    placeholder="From"
                    value={search.origin}
                    onSelect={setUpOrigin}
                    disabledItem={search.destination}
                    isFirst
                    isHighlighted={highlightedFields.includes('origin')}
                />
                <PlaceSelect
                    placeholder="To"
                    value={search.destination}
                    onSelect={setUpDestination}
                    disabledItem={search.origin}
                    isHighlighted={highlightedFields.includes('destination')}
                />
                <DateSelect
                    placeholder="Depart"
                    value={search.departure}
                    onSelect={setUpDeparture}
                    isLast
                    isHighlighted={highlightedFields.includes('departure')}
                />
            </div>
            <div className={cx('button')}>
                <Button isLoading={isLoading}>
                    <div className={cx('buttonText')}>
                        {hasTickets
                            ? 'Find'
                            : 'Find tickets'}
                    </div>
                </Button>
            </div>
        </form>
    );
};

MainForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasTickets: PropTypes.bool,
    search: searchPropType,
    setUpOrigin: PropTypes.func.isRequired,
    setUpDestination: PropTypes.func.isRequired,
    setUpDeparture: PropTypes.func.isRequired
};

MainForm.defaultProps = {
    hasTickets: false,
    search: {}
};

export default MainForm;
