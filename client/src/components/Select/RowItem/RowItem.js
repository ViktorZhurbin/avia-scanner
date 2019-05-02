import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { codeNamePropType } from '../../../entities/propTypes';
import styles from './RowItem.css';

const cx = cl.bind(styles);

const RowItem = ({
    value,
    handleSelect,
    index,
    children,
    isSelected,
    isDisabled,
}) => {
    const onSelect = () => {
        handleSelect(value);
    };

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSelect();
        }
    };

    return (
        <div
            key={value.code}
            className={cx('item', {
                isSelected,
                isDisabled,
            })}
            role="button"
            tabIndex={index + 1}
            onKeyPress={onKeyPress}
            onClick={onSelect}
        >
            {children}
        </div>
    );
};

RowItem.propTypes = {
    value: codeNamePropType.isRequired,
    index: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
};

RowItem.defaultProps = {
    isSelected: false,
    isDisabled: false,
};

export default RowItem;
