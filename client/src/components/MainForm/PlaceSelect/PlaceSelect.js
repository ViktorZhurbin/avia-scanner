import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Select from '../../Select';
import { places } from '../../../constants/mockData';
import { codeNamePropType } from '../../../entities/propTypes';

import styles from '../MainForm.css';

const cx = cl.bind(styles);

const PlaceSelect = ({
    value,
    onSelect,
    placeholder,
    disabledItem,
    isFirst,
    isLast,
    isHighlighted
}) => {
    const renderTrigger = () => (
        <div
            className={cx('triggerContainer', {
                isFirst,
                isLast,
                isHighlighted
            })}
        >
            <div
                className={cx('triggerText', {
                    placeholder: !(value && value.name)
                })}
            >
                {(value && value.name) || placeholder}
            </div>
        </div>
    );

    const renderItem = item => (
        <div className={cx('placeItem')}>
            <span className={cx('name')}>{item.name}</span>
            <strong className={cx('code')}>{item.code}</strong>
        </div>
    );

    return (
        <Select
            trigger={renderTrigger()}
            itemList={places}
            renderItem={renderItem}
            selectedItem={value}
            disabledItem={disabledItem}
            onSelect={onSelect}
            classNames={{ formSelect: true }}
        />
    );
};

PlaceSelect.propTypes = {
    value: codeNamePropType,
    onSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabledItem: codeNamePropType,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    isHighlighted: PropTypes.bool
};

PlaceSelect.defaultProps = {
    disabledItem: {},
    value: null,
    isFirst: false,
    isLast: false,
    isHighlighted: false
};

export default PlaceSelect;
