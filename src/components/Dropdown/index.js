import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import cl from 'classnames/bind';

import styles from './index.css';

const cx = cl.bind(styles);

class Dropdown extends React.Component {
    static propTypes = {
        trigger: PropTypes.node.isRequired,
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

    renderDropdown = () => {
        const { isOpen } = this.state;
        const { children } = this.props;

        return (
            <CSSTransition
                in={isOpen}
                timeout={100}
                classNames="message"
                unmountOnExit
            >
                <div className={cx('dropdown')}>
                    {children}
                </div>
            </CSSTransition>
        );
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onToggle();
        }
    }

    render() {
        const { trigger } = this.props;

        return (
            <div
                className={cx('container')}
                role="button"
                data-toggle="dropdown"
                tabIndex="0"
                onClick={this.onToggle}
                onKeyPress={this.handleKeyPress}
            >
                <div
                    className={cx('trigger')}
                    role="button"
                    data-toggle="dropdown"
                    tabIndex="0"
                    onClick={this.onToggle}
                    onKeyPress={this.handleKeyPress}
                >
                    {trigger}
                </div>
                {this.renderDropdown()}
            </div>
        );
    }
}

export default Dropdown;
