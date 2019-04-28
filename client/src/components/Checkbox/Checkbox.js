import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import styles from './Checkbox.css';

const cx = cl.bind(styles);

class Checkbox extends React.PureComponent {
    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        checked: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        onChange: null,
    };

    onToggleFilter = () => {
        const { onChange, id } = this.props;
        onChange(id);
    }

    render() {
        const {
            id,
            checked,
            name,
        } = this.props;

        return (
            /* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
            <label className={cx('row')}>
                <input
                    className={cx('input')}
                    id={id}
                    checked={checked}
                    name={name}
                    type="checkbox"
                    onChange={this.onToggleFilter}
                />
                <span className={cx('checkmark')} />
                {name}
            </label>
            /* eslint-enable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
        );
    }
}

export default Checkbox;
