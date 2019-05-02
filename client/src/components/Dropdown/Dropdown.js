import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import OutsideClickHandler from 'react-outside-click-handler';
import cl from 'classnames/bind';

import { classNamesPropType } from '../../entities/propTypes';

import styles from './Dropdown.css';

const cx = cl.bind(styles);

const Dropdown = ({
    trigger,
    children,
    classNames,
}) => {
    const [isOpen, setDropdownState] = useState(false);

    const toggleDropdown = () => setDropdownState(!isOpen);

    const onOutsideClick = () => setDropdownState(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            toggleDropdown();
        }
    };

    return (
        <div
            className={cx({
                container: true,
                ...classNames,
            })}
            role="button"
            tabIndex="0"
            onClick={toggleDropdown}
            onKeyPress={handleKeyPress}
        >
            <OutsideClickHandler
                onOutsideClick={onOutsideClick}
            >
                <div
                    className={cx('trigger')}
                    role="button"
                    tabIndex="0"
                    onClick={toggleDropdown}
                    onKeyPress={handleKeyPress}
                >
                    {trigger}
                </div>
                <CSSTransition
                    in={isOpen}
                    timeout={10}
                    classNames="message"
                    unmountOnExit
                >
                    <div className={cx('dropdown')}>
                        {children}
                    </div>
                </CSSTransition>
            </OutsideClickHandler>
        </div>
    );
};

Dropdown.propTypes = {
    trigger: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    classNames: classNamesPropType,
};

Dropdown.defaultProps = {
    classNames: null,
};

export default Dropdown;
