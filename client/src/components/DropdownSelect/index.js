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
        selectedItem: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        renderItem: PropTypes.func.isRequired,
        classNames: classNamesPropType,
        itemList: PropTypes.array, // eslint-disable-line
        trigger: PropTypes.node.isRequired,
    }

    static defaultProps = {
        classNames: null,
    }

    renderDropdown = () => {
        const {
            selectedItem,
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
                {itemList.map((item, index) => (
                    <RowItem
                        key={item.code}
                        item={item}
                        index={index}
                        onSelect={onSelect}
                        selectedItem={selectedItem}
                    >
                        {renderItem(item)}
                    </RowItem>
                ))}
            </div>
        );
    };

    render() {
        const { trigger } = this.props;
        return (
            <Dropdown
                trigger={trigger}
            >
                {this.renderDropdown()}
            </Dropdown>
        );
    }
}

export default DropdownSelect;
