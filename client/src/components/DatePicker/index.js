import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { getISODateString } from '../../utils/string';
import Loader from '../Loader';
import Dropdown from '../Dropdown';
import { classNamesPropType } from '../../entities/propTypes';

import styles from './index.css';

const Calendar = React.lazy(() => import('react-calendar'));
const cx = cl.bind(styles);

class DatePicker extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string,
        trigger: PropTypes.node.isRequired,
        onSelect: PropTypes.func.isRequired,
        classNames: classNamesPropType,
    }

    static defaultProps = {
        value: null,
        classNames: null,
    }

    handleSelect = (date) => {
        const { onSelect } = this.props;

        onSelect(getISODateString(date));
    }

    render() {
        const { value, trigger, classNames } = this.props;

        return (
            <Dropdown
                classNames={classNames}
                trigger={trigger}
            >
                <React.Suspense fallback={<Loader />}>
                    <React.Fragment>
                        <div className={cx('calendarModal')}>
                            <Calendar
                                onDateSelect={this.handleSelect}
                                date={value}
                            />
                        </div>
                        <div className={cx('modalOverlay')} />
                    </React.Fragment>
                </React.Suspense>
            </Dropdown>

        );
    }
}

// const mapDispatchToProps = dispatch => ({
//     setUpDeparture: departure => dispatch(setDeparture(departure)),
// });

export default DatePicker;
