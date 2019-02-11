import React from 'react';

import styles from './FilterPanel.module.css';

class FilterPanel extends React.Component {
    state = {
        selectedCurrency: 'RUB',
        // stops: [],
    }


    // _onCurrencySelect = (event) => {
    //     this.setState({
    //         selectedCurrency: event.target.value,
    //     });
    // }

    render() {
        const { selectedCurrency } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.currency}>
                    <div className={styles.title}>{selectedCurrency}</div>
                </div>
            </div>
        );
    }
}

export default FilterPanel;
