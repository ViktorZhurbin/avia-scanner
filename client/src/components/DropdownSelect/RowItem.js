import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

class RowItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        index: PropTypes.number.isRequired,
        onSelect: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
        isSelected: PropTypes.bool,
        isDisabled: PropTypes.bool,
    }

    static defaultProps = {
        isSelected: false,
        isDisabled: false,
    }

    onSelect = () => {
        const { item, onSelect } = this.props;

        onSelect(item);
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
            isSelected,
            isDisabled,
        } = this.props;

        return (
            <div
                key={item.code}
                className={cx({
                    item: true,
                    isSelected,
                    isDisabled,
                })}
                role="button"
                tabIndex={index + 1}
                onKeyPress={this.onKeyPress}
                onClick={this.onSelect}
            >
                {children}
            </div>
        );
    }
}

export default RowItem;
