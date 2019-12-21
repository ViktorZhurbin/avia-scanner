import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Checkbox from '../Checkbox';
import inflectStops from '../../utils/inflection';

import styles from './Filters.css';

const cx = cl.bind(styles);

const Filters = ({
    allFilters,
    selectedFilters,
    onChange
}) => {
    const onToggleFilter = (key) => {
        const filters = selectedFilters.includes(key)
            ? selectedFilters.filter(item => item !== key)
            : selectedFilters.concat(key);

        onChange(filters);
    };

    const isAllChecked = selectedFilters.length === allFilters.length;

    const onToggleAll = () => {
        const filters = isAllChecked ? [] : allFilters;

        onChange(filters);
    };

    return (
        allFilters.length > 0
            ? (
                <div className={cx('container')}>
                    <div className={cx('title')}>
                        Number of stops
                    </div>
                    <div className={cx('filters')}>
                        <div className={cx('filterItem')}>
                            <Checkbox
                                id="all"
                                checked={isAllChecked}
                                name="All"
                                onChange={onToggleAll}
                            />
                        </div>
                        {allFilters.map((item) => {
                            const isChecked = selectedFilters.includes(item);
                            const name = inflectStops(item);

                            return (
                                <div
                                    key={item}
                                    className={cx('filterItem')}
                                >
                                    <Checkbox
                                        id={item}
                                        checked={isChecked}
                                        name={name}
                                        onChange={onToggleFilter}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
            : null
    );
};

Filters.propTypes = {
    allFilters: PropTypes.arrayOf(
        PropTypes.number,
    ).isRequired,
    selectedFilters: PropTypes.arrayOf(
        PropTypes.number,
    ).isRequired,
    onChange: PropTypes.func.isRequired
};

export default Filters;
