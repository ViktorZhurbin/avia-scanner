import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './Input.css';

const cx = cl.bind(styles);

const Input = (props) => {
    const {
        id,
        placeholder,
        label,
        onInputChange,
        inputValue,
    } = props;

    return (
        <div className={cx('container')}>
            <label htmlFor={id}>
                {label}
                <input
                    type="text"
                    id={id}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={onInputChange}
                />
            </label>
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
    inputValue: '',
    label: '',
};

export default React.memo(Input);
