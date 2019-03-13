import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../Dropdown';
import RowItem from './RowItem';
import { classNamesPropType, codeNamePropType } from '../../entities/propTypes';
import styles from './index.css';

const cx = cl.bind(styles);

class Select extends React.PureComponent {
    static propTypes = {
        trigger: PropTypes.node.isRequired,
        itemList: PropTypes.arrayOf(codeNamePropType).isRequired,
        renderItem: PropTypes.func.isRequired,
        selectedItem: codeNamePropType,
        disabledItem: codeNamePropType,
        onSelect: PropTypes.func.isRequired,
        classNames: classNamesPropType,
    }

    static defaultProps = {
        classNames: null,
        disabledItem: null,
        selectedItem: null,
    }

    renderDropdown = () => {
        const {
            selectedItem,
            disabledItem,
            onSelect,
            itemList,
            renderItem,
            classNames,
        } = this.props;

        return (
            <div
                className={cx('itemList', ...classNames)}
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
                            onSelect={onSelect}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                        >
                            {renderItem(item)}
                        </RowItem>
                    );
                })}
            </div>
        );
    };

    render() {
        const { trigger, classNames } = this.props;
        return (
            <Dropdown
                classNames={classNames}
                trigger={trigger}
            >
                {this.renderDropdown()}
            </Dropdown>
        );
    }
}

export default Select;
