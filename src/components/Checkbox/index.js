import React from 'react';
import PropTypes from 'prop-types';

import styles from './Checkbox.module.css';

const Checkbox = (props) => {
    const {
        id,
        checked,
        name,
        onChange,
    } = props;

    return (
        <span
            className={styles.checkbox}
        >
            <label
                className={styles.name}
                htmlFor={id}
            >
                <input
                    className={styles.input}
                    id={id}
                    checked={checked}
                    name={name}
                    type="checkbox"
                    onChange={onChange}
                />
                {name}
            </label>
        </span>
    );
};

Checkbox.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

Checkbox.defaultProps = {
    onChange: null,
};

export default Checkbox;
