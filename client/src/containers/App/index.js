import React from 'react';
import cl from 'classnames/bind';
import localeCurrency from 'locale-currency';
import axios from 'axios';

import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';

import { fetchTickets } from '../../utils/api';
import getBrowserLocale from '../../utils/getBrowserLocale';

import styles from './index.css';

const cx = cl.bind(styles);

const source = axios.CancelToken.source();

class App extends React.PureComponent {
    state = {
        ticketData: {},
        locale: null,
        currency: null,
    }

    componentDidMount() {
        const locale = getBrowserLocale();
        const currency = localeCurrency.getCurrency(locale);
        this.setState({
            locale,
            currency,
        });
    }

    onResetState = () => {
        window.history.pushState('', '', '/');
        source.cancel();
        this.setState({
            isLoading: false,
            ticketData: {},
        });
    }

    fetchTickets = async (query = '') => {
        this.setState({ isLoading: true });
        const ticketData = await fetchTickets(query, source.token);

        this.setState({
            ticketData,
            isLoading: false,
        });
    }

    render() {
        const {
            locale,
            isLoading,
            currency,
            ticketData,
        } = this.state;

        const hasResults = ticketData && ticketData.allTickets && ticketData.allTickets.length > 0;

        return (
            <div className={cx('container')}>
                <div
                    className={cx({
                        form: true,
                        formOnly: !hasResults,
                    })}
                >
                    <SearchForm
                        locale={locale}
                        currency={currency}
                        isLoading={isLoading}
                        fullScreen={!hasResults}
                        fetchTickets={this.fetchTickets}
                        onResetState={this.onResetState}
                    />
                </div>
                {hasResults
                    ? (
                        <div className={cx('results')}>
                            <SearchResults
                                ticketData={ticketData}
                                locale={locale}
                                currency={currency}
                            />
                        </div>
                    )
                    : null}
            </div>
        );
    }
}

export default App;
