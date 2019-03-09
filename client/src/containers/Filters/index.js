import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Checkbox from '../../components/Checkbox';
import { inflectStopsEn } from '../../utils/inflection';

import styles from './index.css';

const cx = cl.bind(styles);

class Filters extends React.PureComponent {
    static propTypes = {
        stopOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
        selectedStops: PropTypes.objectOf(
            PropTypes.bool,
        ).isRequired,
        onFilter: PropTypes.func.isRequired,
    }

    onToggleFilter = (key) => {
        const { onFilter, selectedStops } = this.props;

        const selectedFilters = {
            ...selectedStops,
            [key]: !selectedStops[key],
        };
        onFilter(selectedFilters);
    }

    onToggleAll = () => {
        const { onFilter, stopOptions, selectedStops } = this.props;

        const selectedCount = Object.values(selectedStops).filter(item => Boolean(item));
        const isAllChecked = selectedCount.length === stopOptions.length;

        const selectedFilters = {};
        stopOptions.forEach(
            (key) => { selectedFilters[key] = !isAllChecked; },
        );
        onFilter(selectedFilters);
    }

    render() {
        const { stopOptions, selectedStops, onFilter } = this.props;

        const selectedCount = Object.values(selectedStops).filter(item => Boolean(item));
        const isAllChecked = selectedCount.length === stopOptions.length;

        return (
            stopOptions
                ? (
                    <div className={cx('container')}>
                        <div className={cx('title')}>Number of stops</div>
                        <div className={cx('filters')}>
                            <Checkbox
                                className={cx('filterItem')}
                                id="all"
                                checked={isAllChecked}
                                name="All"
                                selectedStops={selectedStops}
                                onChange={this.onToggleAll}
                            />
                            {stopOptions.map((item) => {
                                const isChecked = Boolean(selectedStops[item]);
                                const name = inflectStopsEn(item);

                                return (
                                    <Checkbox
                                        key={item}
                                        id={item}
                                        className={cx('filterItem')}
                                        checked={isChecked}
                                        name={name}
                                        selectedStops={selectedStops}
                                        onChange={onFilter}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )
                : null
        );
    }
}

export default Filters;
