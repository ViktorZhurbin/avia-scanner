import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Dropdown from '../Dropdown';
import RowItem from './RowItem';
import { classNamesPropType } from '../../entities/propTypes';
import styles from './index.css';

const cx = cl.bind(styles);

class DropdownSelect extends React.PureComponent {
    static propTypes = {
        trigger: PropTypes.node.isRequired,
        itemList: PropTypes.array, // eslint-disable-line
        renderItem: PropTypes.func.isRequired,
        selectedItem: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        }),
        disabledItem: PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        }),
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
                            item={item}
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

export default DropdownSelect;
