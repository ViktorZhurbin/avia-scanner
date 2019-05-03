import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './Checkbox.css';

const cx = cl.bind(styles);

const Checkbox = ({
    id,
    name,
    checked,
    onChange,
}) => {
    const onToggleFilter = () => onChange(id);

    return (
        /* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
        <label className={cx('row')}>
            <input
                className={cx('input')}
                id={id}
                checked={checked}
                name={name}
                type="checkbox"
                onChange={onToggleFilter}
            />
            <span className={cx('checkmark')} />
            {name}
        </label>
        /* eslint-enable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
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

export default React.memo(Checkbox);
