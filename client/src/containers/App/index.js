import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import SearchForm from '../SearchForm';
import Loader from '../../components/Loader';

import styles from './index.css';

const SearchResults = React.lazy(() => import('../SearchResults'));
const cx = cl.bind(styles);

class App extends React.PureComponent {
    static propTypes = {
        hasTickets: PropTypes.bool.isRequired,
    }

    render() {
        const { hasTickets } = this.props;

        return (
            <div className={cx('container')}>
                <div
                    className={cx({
                        form: true,
                        formOnly: !hasTickets,
                    })}
                >
                    <SearchForm
                        fullScreen={!hasTickets}
                    />
                </div>
                {hasTickets
                    ? (
                        <React.Suspense fallback={<Loader />}>
                            <div className={cx('results')}>
                                <SearchResults />
                            </div>
                        </React.Suspense>
                    )
                    : null}
            </div>
        );
    }
}

const mapStateToProps = ({ tickets }) => ({
    hasTickets: tickets.hasTickets,
});

export default connect(mapStateToProps)(App);
