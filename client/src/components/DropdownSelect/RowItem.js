import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

class CurrencyRowItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        index: PropTypes.number.isRequired,
        onSelect: PropTypes.func.isRequired,
        selectedItem: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    }

    onSelect = () => {
        const { item } = this.props;
        this.props.onSelect(item.code);
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSelect();
        }
    }

    render() {
        const {
            item,
            index,
            children,
            selectedItem,
        } = this.props;
        return (
            <div
                key={item.code}
                className={cx({
                    item: true,
                    isSelected: item.code === selectedItem,
                })}
                role="button"
                tabIndex={index + 1}
                onKeyPress={this.onKeyPress}
                onClick={this.onSelect}
            >
                {children}
                {/* <strong className={cx('code')}>
                    {item.code}
                </strong>
                <span className={cx('name')}>
                    {item.name}
                </span> */}
            </div>
        );
    }
}

export default CurrencyRowItem;
