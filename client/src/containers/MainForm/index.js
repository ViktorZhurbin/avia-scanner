import React from 'react';
import PropTypes from 'prop-types';
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
import { validateQueryString, getQueryStringFromSearch } from '../../utils/string';

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

    state = {
        highlightedFields: [],
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { search, onSubmit } = this.props;
        const queryString = getQueryStringFromSearch(search);
        const { isValid, missingValues } = validateQueryString(queryString);
        if (isValid) {
            onSubmit(queryString);
        } else {
            this.setState({
                highlightedFields: missingValues,
            }, () => setTimeout(() => {
                this.setState({ highlightedFields: [] });
            }, 1000));
        }
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
        const { highlightedFields } = this.state;

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
