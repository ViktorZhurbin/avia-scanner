import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Button from '../Button';

import styles from './NoResults.css';

const cx = cl.bind(styles);

class NoResults extends React.PureComponent {
    static propTypes = {
        resetFilter: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
    }

    render() {
        const { count, resetFilter } = this.props;

        return (
            <div className={cx('container')}>
                <div className={cx('text')}>
                    {`We found ${count} tickets
            but none of them matches current filter settings`}
                </div>
                <div className={cx('resetButton')}>
                    <Button
                        onClick={resetFilter}
                    >
                        <span className={cx('buttonText')}>
                            Reset Filters
                        </span>
                    </Button>
                </div>
            </div>
        );
    }
}

export default NoResults;
