import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Checkbox.module.css';

const cx = classNames.bind(styles);

const Checkbox = (props) => {
    const {
        id,
        checked,
        name,
        onChange,
    } = props;

    return (
        <label className={styles.row}> {/*eslint-disable-line*/}
            <input
                className={cx('input')}
                id={id}
                checked={checked}
                name={name}
                type="checkbox"
                onChange={onChange}
            />
            <span className={cx('checkmark')} />
            {name}
        </label>
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
