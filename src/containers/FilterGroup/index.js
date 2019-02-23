import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../../components/Checkbox';
import { inflectStopsEn } from '../../utils/inflection';

import styles from './FilterGroup.module.css';

class FilterGroup extends React.Component {
    static propTypes = {
        stops: PropTypes.arrayOf(PropTypes.number).isRequired,
        onFilter: PropTypes.func.isRequired,
    }

    state = {
        checked: {
            0: true,
        },
    }

    onToggleFilter = (key) => {
        const { checked } = this.state;
        const { onFilter } = this.props;

        this.setState(() => ({
            checked: {
                ...checked,
                [key]: !checked[key],
            },
        }), () => onFilter(this.state.checked));
    }

    onToggleAll = (isAllChecked) => {
        const { onFilter, stops } = this.props;

        const filters = {};
        stops.forEach(
            (key) => { filters[key] = !isAllChecked; },
        );
        this.setState({
            checked: filters,
        }, () => onFilter(this.state.checked));
    }

    render() {
        const { checked } = this.state;
        const { stops } = this.props;

        const checkedCount = Object.values(checked).filter(item => Boolean(item));
        const isAllChecked = checkedCount.length === stops.length;

        return (
            stops
                ? (
                    <div className={styles.container}>
                        <div className={styles.title}>Number of stops</div>
                        <div className={styles.filters}>
                            <Checkbox
                                className={styles.filterItem}
                                id="all"
                                checked={isAllChecked}
                                name="All"
                                onChange={() => this.onToggleAll(isAllChecked)}
                            />
                            {stops.map((item) => {
                                const isChecked = Boolean(checked[item]);
                                const name = inflectStopsEn(item);

                                return (
                                    <Checkbox
                                        key={item}
                                        className={styles.filterItem}
                                        id={item}
                                        checked={isChecked}
                                        name={name}
                                        onChange={() => this.onToggleFilter(item)}
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

export default FilterGroup;
