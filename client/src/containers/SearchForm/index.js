import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { resetTickets, fetchTicketData } from '../../store/tickets';
import { resetSearch } from '../../store/search';

import NavBar from '../NavBar';
import MainForm from '../MainForm';

import styles from './index.css';

export const cx = cl.bind(styles);


class SearchForm extends React.PureComponent {
    static propTypes = {
        getTickets: PropTypes.func.isRequired,
        setInitialSearch: PropTypes.func.isRequired,
        resetTicketData: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        hasTickets: PropTypes.bool,
    };

    static defaultProps = {
        hasTickets: false,
    };

    componentDidMount() {
        window.onpopstate = () => this.onUpdateState();
        this.onUpdateState();
    }

    onUpdateState = () => {
        const { search } = window.location;
        if (search.length > 0) {
            this.props.getTickets();
        } else {
            this.onResetState();
        }
    }

    onResetState = () => {
        window.history.pushState('', '', '/');
        this.props.setInitialSearch();
        this.props.resetTicketData();
    }

    onSubmit = ({ queryObject, queryString }) => {
        window.history.pushState(queryObject, '', queryString);
        this.props.getTickets(queryString);
    };

    render() {
        const {
            isLoading,
            hasTickets,
        } = this.props;

        return (
            <div className={cx('container', { hasTickets })}>
                <div className={cx('innerContainer', { hasTickets })}>
                    <div className={cx({ isLoading })} />
                    <NavBar
                        onResetState={this.onResetState}
                    />
                    <MainForm
                        onSubmit={this.onSubmit}
                        isLoading={isLoading}
                        hasTickets={hasTickets}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ tickets }) => ({
    isLoading: tickets.isLoading,
    hasTickets: tickets.hasTickets,
});

const mapDispatchToProps = dispatch => ({
    getTickets: query => dispatch(fetchTicketData(query)),
    resetTicketData: () => dispatch(resetTickets()),
    setInitialSearch: () => dispatch(resetSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
