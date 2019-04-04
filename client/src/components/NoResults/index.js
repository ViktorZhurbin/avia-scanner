import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { setStops } from '../../store/ticketData/actions';
import Button from '../Button';

import styles from './index.css';

const cx = cl.bind(styles);

class NoResuts extends React.PureComponent {
    static propTypes = {
        stopOptions: PropTypes.arrayOf(
            PropTypes.number,
        ).isRequired,
        setUpStops: PropTypes.func.isRequired,
        ticketsCount: PropTypes.number.isRequired,
    }

    onFilterReset = () => {
        const { stopOptions, setUpStops } = this.props;
        const resetFilterState = {
            [stopOptions[0]]: true,
        };

        setUpStops(resetFilterState);
    }

    render() {
        const { ticketsCount } = this.props;

        return (
            <div className={cx('container')}>
                <div className={cx('text')}>
                    {`We found ${ticketsCount} tickets
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

const mapStateToProps = ({ tickets }) => ({
    stopOptions: tickets.ticketData.stopOptions,
});

const mapDispatchToProps = dispatch => ({
    setUpStops: value => dispatch(setStops(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NoResuts);
