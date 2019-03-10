import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import DateSelect from './DateSelect';
import PlaceSelect from './PlaceSelect';
import { searchPropType } from '../../entities/propTypes';

import styles from './index.css';

export const cx = cl.bind(styles);

class MainForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        hasTickets: PropTypes.bool,
        search: searchPropType,
    };

    static defaultProps = {
        hasTickets: false,
        search: {},
    };

    getSearchQuery = () => {
        const {
            origin,
            destination,
            currency,
            ...rest
        } = this.props.search;

        const queryObject = {
            origin: origin.code,
            destination: destination.code,
            currency: currency.code,
            ...rest,
        };
        const queryString = `?${qs.stringify(queryObject)}`;

        return {
            queryObject,
            queryString,
        };
    };

    onSubmit = (event) => {
        event.preventDefault();
        const searchQuery = this.getSearchQuery();
        this.props.onSubmit(searchQuery);
    };

    render() {
        const {
            hasTickets,
            isLoading,
            search,
        } = this.props;

        return (
            <form
                className={cx('form', { hasTickets })}
                target="_self"
                onSubmit={this.onSubmit}
            >
                <div className={cx('header', { hasTickets })}>
                    {isLoading
                        ? 'Fetching tickets...'
                        : 'Flights and airline tickets'}
                </div>
                <div className={cx('input', { hasTickets })}>
                    <PlaceSelect
                        isFirst
                        id="origin"
                        value={search.origin}
                        placeholder="From"
                    />
                    <PlaceSelect
                        id="destination"
                        value={search.destination}
                        placeholder="To"
                    />
                    <DateSelect
                        isLast
                        id="departure"
                        value={search.departure}
                        placeholder="Depart"
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
    }
}

const mapStateToProps = ({ search }) => ({
    search,
});

export default connect(mapStateToProps)(MainForm);
