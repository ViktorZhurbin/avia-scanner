import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { reset, request, requestCancel } from '../../store/ticketData/actions';
import { resetSearch, setFormInput } from '../../store/searchQuery/actions';

import LoadingBar from '../../components/LoadingBar';
import NavBar from '../NavBar';
import MainForm from '../MainForm';
import { setLastSearchCookie, getLastSearchCookie } from '../../utils/cookie';

import styles from './index.css';

export const cx = cl.bind(styles);

class FormLayout extends React.PureComponent {
    static propTypes = {
        getTickets: PropTypes.func.isRequired,
        getTicketsCancel: PropTypes.func.isRequired,
        resetSearchQuery: PropTypes.func.isRequired,
        resetTickets: PropTypes.func.isRequired,
        setUpFormInput: PropTypes.func.isRequired,
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
        const { getTickets, setUpFormInput } = this.props;
        const { search } = window.location;
        if (search.length > 0) {
            getTickets(search);
            setUpFormInput(search);
        } else {
            this.onResetState();
        }
    }

    onResetState = () => {
        const {
            isLoading,
            getTicketsCancel,
            resetTickets,
            setUpFormInput,
            resetSearchQuery,
        } = this.props;
        window.history.pushState('', '', '/');
        if (isLoading) {
            getTicketsCancel();
        }
        resetTickets();
        const lastSearchQuery = getLastSearchCookie();
        if (lastSearchQuery) {
            setUpFormInput(lastSearchQuery);
        } else {
            resetSearchQuery();
        }
    }

    onSubmit = (searchQuery) => {
        const { getTickets } = this.props;
        setLastSearchCookie(searchQuery);
        getTickets(searchQuery);
        window.history.pushState({ searchQuery }, '', searchQuery);
    };

    render() {
        const {
            isLoading,
            hasTickets,
        } = this.props;

        return (
            <div className={cx('container', { hasTickets })}>
                <div className={cx('innerContainer', { hasTickets })}>
                    <LoadingBar
                        isLoading={isLoading}
                    />
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
    getTickets: query => dispatch(request(query)),
    getTicketsCancel: () => dispatch(requestCancel()),
    resetTickets: () => dispatch(reset()),
    resetSearchQuery: () => dispatch(resetSearch()),
    setUpFormInput: search => dispatch(setFormInput(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLayout);
