import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Checkbox from '../../components/Checkbox';
import inflectStops from '../../utils/inflection';
import { setStops } from '../../store/ticketData/actions';

import styles from './index.css';

const cx = cl.bind(styles);

class Filters extends React.PureComponent {
    static propTypes = {
        stopOptions: PropTypes.arrayOf(
            PropTypes.number,
        ).isRequired,
        selectedStops: PropTypes.objectOf(
            PropTypes.bool,
        ).isRequired,
        setUpStops: PropTypes.func.isRequired,
    }

    onToggleFilter = (key) => {
        const { selectedStops, setUpStops } = this.props;

        const selectedFilters = {
            ...selectedStops,
            [key]: !selectedStops[key],
        };
        setUpStops(selectedFilters);
    }

    onToggleAll = () => {
        const {
            stopOptions,
            selectedStops,
            setUpStops,
        } = this.props;

        const selectedCount = Object.values(selectedStops).filter(item => Boolean(item));
        const isAllChecked = selectedCount.length === stopOptions.length;

        const selectedFilters = {};
        stopOptions.forEach(
            (key) => { selectedFilters[key] = !isAllChecked; },
        );
        setUpStops(selectedFilters);
    }

    render() {
        const { stopOptions, selectedStops } = this.props;

        const selectedCount = Object.values(selectedStops).filter(item => Boolean(item));
        const isAllChecked = selectedCount.length === stopOptions.length;

        return (
            stopOptions
                ? (
                    <div className={cx('container')}>
                        <div className={cx('title')}>Number of stops</div>
                        <div className={cx('filters')}>
                            <div className={cx('filterItem')}>
                                <Checkbox
                                    id="all"
                                    checked={isAllChecked}
                                    name="All"
                                    selectedStops={selectedStops}
                                    onChange={this.onToggleAll}
                                />
                            </div>
                            {stopOptions.map((item) => {
                                const isChecked = Boolean(selectedStops[item]);
                                const name = inflectStops(item);

                                return (
                                    <div
                                        className={cx('filterItem')}
                                        key={item}
                                    >
                                        <Checkbox
                                            id={item}
                                            checked={isChecked}
                                            name={name}
                                            selectedStops={selectedStops}
                                            onChange={this.onToggleFilter}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
                : null
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setUpStops: value => dispatch(setStops(value)),
});

const mapStateToProps = ({ tickets }) => ({
    selectedStops: tickets.selectedStops,
    stopOptions: tickets.ticketData.stopOptions,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Filters);
