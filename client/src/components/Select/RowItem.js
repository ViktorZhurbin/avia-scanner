import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { codeNamePropType } from '../../entities/propTypes';
import styles from './index.css';

const cx = cl.bind(styles);

class RowItem extends React.Component {
    static propTypes = {
        value: codeNamePropType.isRequired,
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
        const { value, onSelect } = this.props;

        onSelect(value);
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSelect();
        }
    }

    render() {
        const {
            value,
            index,
            children,
            isSelected,
            isDisabled,
        } = this.props;

        return (
            <div
                key={value.code}
                className={cx('item', {
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
