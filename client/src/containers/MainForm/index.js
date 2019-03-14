import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import {
    setOrigin,
    setDestination,
    setDeparture,
} from '../../store/searchQuery/actions';
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
        setUpOrigin: PropTypes.func.isRequired,
        setUpDestination: PropTypes.func.isRequired,
        setUpDeparture: PropTypes.func.isRequired,
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

        const searchObject = {
            origin: origin.code,
            destination: destination.code,
            currency: currency.code,
            ...rest,
        };
        const searchString = `?${qs.stringify(searchObject, { sort: false })}`;

        return searchString;
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
            setUpOrigin,
            setUpDestination,
            setUpDeparture,
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
                        placeholder="From"
                        value={search.origin}
                        onSelect={setUpOrigin}
                        disabledItem={search.destination}
                        isFirst
                    />
                    <PlaceSelect
                        placeholder="To"
                        value={search.destination}
                        onSelect={setUpDestination}
                        disabledItem={search.origin}
                    />
                    <DateSelect
                        placeholder="Depart"
                        value={search.departure}
                        onSelect={setUpDeparture}
                        isLast
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

const mapDispatchToProps = dispatch => ({
    setUpOrigin: value => dispatch(setOrigin(value)),
    setUpDestination: value => dispatch(setDestination(value)),
    setUpDeparture: value => dispatch(setDeparture(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainForm);
