import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../../components/Checkbox';
import inflectStops from '../../utils/inflection';

import styles from './FilterGroup.module.css';

class FilterGroup extends React.Component {
    static propTypes = {
        stops: PropTypes.arrayOf(PropTypes.number).isRequired,
    }

    state = {
        checked: {
            0: true,
        },
    }

    onToggleFilter = (key) => {
        const { checked } = this.state;

        this.setState(() => ({
            checked: {
                ...checked,
                [key]: !checked[key],
            },
        }));
    }

    onToggleAll = (isAllChecked) => {
        const { stops } = this.props;

        const newStatus = {};
        stops.forEach(
            (key) => { newStatus[key] = !isAllChecked; },
        );
        this.setState({
            checked: newStatus,
        });
    }

    render() {
        const { checked } = this.state;
        const { stops } = this.props;

        const checkedCount = Object.values(checked).filter(item => Boolean(item));

        const isAllChecked = checkedCount.length === stops.length;

        return (
            <div className={styles.container}>
                <div className={styles.title}>Количество пересадок</div>
                <div className={styles.filters}>
                    <Checkbox
                        className={styles.filterItem}
                        id="all"
                        checked={isAllChecked}
                        name="Все"
                        onChange={() => this.onToggleAll(isAllChecked)}
                    />
                    {stops.map(item => (
                        <Checkbox
                            key={item}
                            className={styles.filterItem}
                            id={item}
                            checked={Boolean(checked[item])}
                            name={`${item} ${inflectStops(item)}`}
                            onChange={() => this.onToggleFilter(item)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default FilterGroup;
