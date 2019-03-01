import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import ReactOutsideEvent from 'react-outside-event';

import Calendar from '../../components/Calendar';

import styles from './index.css';

const cx = cl.bind(styles);

class DatePicker extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    state = {
        isOpen: false,
    }

    onToggle = () => {
        const { isOpen } = this.state;

        this.setState(() => ({
            isOpen: !isOpen,
        }));
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onToggle();
        }
    }

    onOutsideEvent = () => {
        this.setState(() => ({
            isOpen: false,
        }));
    }

    render() {
        const { children } = this.props;

        return (
            <div className={cx('container')}>
                <div
                    className={cx('trigger')}
                    role="button"
                    data-toggle="dropdown"
                    tabIndex="0"
                    onClick={this.onToggle}
                    onKeyPress={this.handleKeyPress}
                >
                    {children}
                </div>
                <div className={cx('calendar')}>
                    <Calendar />
                </div>
            </div>
        );
    }
}

export default ReactOutsideEvent(DatePicker, ['click']);
