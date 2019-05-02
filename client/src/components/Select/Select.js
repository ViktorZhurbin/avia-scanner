import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../Dropdown';
import RowItem from './RowItem';
import { classNamesPropType, codeNamePropType } from '../../entities/propTypes';

import styles from './Select.css';

const cx = cl.bind(styles);

const Select = (props) => {
    const {
        trigger,
        classNames,
        selectedItem,
        disabledItem,
        onSelect,
        itemList,
        renderItem,
    } = props;

    return (
        <Dropdown
            classNames={{ ...classNames }}
            trigger={trigger}
        >
            <div
                className={cx({
                    itemList: true,
                    ...classNames,
                })}
            >
                {itemList.map((item, index) => {
                    const isDisabled = (item && item.code) === (disabledItem && disabledItem.code);
                    const isSelected = (item && item.code) === (selectedItem && selectedItem.code);

                    return (
                        <RowItem
                            key={item.code}
                            className={classNames}
                            value={item}
                            index={index}
                            handleSelect={onSelect}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                        >
                            {renderItem(item)}
                        </RowItem>
                    );
                })}
            </div>
        </Dropdown>
    );
};

Select.propTypes = {
    trigger: PropTypes.node.isRequired,
    itemList: PropTypes.arrayOf(codeNamePropType).isRequired,
    renderItem: PropTypes.func.isRequired,
    selectedItem: codeNamePropType,
    disabledItem: codeNamePropType,
    onSelect: PropTypes.func.isRequired,
    classNames: classNamesPropType,
};

Select.defaultProps = {
    classNames: null,
    disabledItem: null,
    selectedItem: null,
};

export default Select;
