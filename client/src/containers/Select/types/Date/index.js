import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import { getISODateString } from '../../../../utils/string';
import Loader from '../../../../components/Loader';
import styles from './index.css';

const Calendar = React.lazy(() => import('../../../../components/Calendar'));
const cx = cl.bind(styles);

class DateSelect extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        value: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
    }

    static defaultProps = {
        value: null,
    }

    handleSelect = (date) => {
        const { onSelect, id } = this.props;

        onSelect(id, getISODateString(date));
    }

    render() {
        const { value } = this.props;

        return (
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
        );
    }
}

export default DateSelect;
