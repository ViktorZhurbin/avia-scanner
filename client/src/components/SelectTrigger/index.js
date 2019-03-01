import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './index.css';
import { classNamesPropType } from '../../entities/propTypes';

const cx = cl.bind(styles);

const SelectTrigger = (props) => {
    const {
        placeholder,
        selectedItem,
        classNames,
    } = props;

    const text = selectedItem || placeholder;

    return (
        <div
            className={cx({
                ...classNames,
                text: true,
                placeholder: text.length === 0,
            })}
        >
            {text}
        </div>
    );
};

SelectTrigger.propTypes = {
    placeholder: PropTypes.string,
    selectedItem: PropTypes.string,
    classNames: classNamesPropType,
};

SelectTrigger.defaultProps = {
    placeholder: '',
    selectedItem: '',
    classNames: null,
};

export default SelectTrigger;
