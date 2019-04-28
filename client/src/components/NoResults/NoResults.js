import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Button from '../Button';

import styles from './NoResults.css';

const cx = cl.bind(styles);

class NoResults extends React.PureComponent {
    static propTypes = {
        stopOptions: PropTypes.arrayOf(
            PropTypes.number,
        ).isRequired,
        setUpStops: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
    }

    onFilterReset = () => {
        const { stopOptions, setUpStops } = this.props;
        const resetFilterState = {
            [stopOptions[0]]: true,
        };

        setUpStops(resetFilterState);
    }

    render() {
        const { count } = this.props;

        return (
            <div className={cx('container')}>
                <div className={cx('text')}>
                    {`We found ${count} tickets
            but none of them matches current filter settings`}
                </div>
                <div className={cx('resetButton')}>
                    <Button
                        onClick={this.onFilterReset}
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
