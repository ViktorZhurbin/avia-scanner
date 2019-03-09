import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Loader from '../Loader';
import Dropdown from '../Dropdown';
import { classNamesPropType } from '../../entities/propTypes';

import styles from './index.css';

const Calendar = React.lazy(() => import('react-calendar'));
const cx = cl.bind(styles);

class DatePicker extends React.PureComponent {
    static propTypes = {
        trigger: PropTypes.node.isRequired,
        onSelect: PropTypes.func.isRequired,
        classNames: classNamesPropType,
    }

    static defaultProps = {
        classNames: null,
    }

    state = {
        date: new Date(),
    }

    handleDateSelect = (date) => {
        const { onSelect } = this.props;

        this.setState({
            date,
        }, () => onSelect(date));
    }

    render() {
        const {
            trigger,
            classNames,
        } = this.props;

        return (
            <Dropdown
                classNames={classNames}
                trigger={trigger}
            >
                <React.Suspense fallback={<Loader />}>
                    <React.Fragment>
                        <div className={cx('calendarModal')}>
                            <Calendar
                                value={this.state.date}
                                onChange={this.handleDateSelect}
                            />
                        </div>
                        <div className={cx('modalOverlay')} />
                    </React.Fragment>
                </React.Suspense>
            </Dropdown>

        );
    }
}

export default DatePicker;