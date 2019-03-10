import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import Select from '../../../components/Select';
import { places } from '../../../constants/mockData';
import { setOrigin, setDestination } from '../../../store/search';
import { codeNamePropType } from '../../../entities/propTypes';

import styles from '../index.css';

const cx = cl.bind(styles);

class PlaceSelect extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        value: codeNamePropType,
        onSelect: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        disabledItem: PropTypes.shape({
            value: codeNamePropType,
            onSelect: PropTypes.func,
        }),
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
    }

    static defaultProps = {
        disabledItem: {},
        value: null,
        isFirst: false,
        isLast: false,
    }

    renderTrigger = () => {
        const {
            value,
            placeholder,
            isFirst,
            isLast,
        } = this.props;

        return (
            <div
                className={cx('triggerContainer', {
                    isFirst,
                    isLast,
                })}
            >
                <div
                    className={cx('triggerText', {
                        placeholder: !value,
                    })}
                >
                    {value.name || placeholder}
                </div>
            </div>
        );
    }

    renderItem = item => (
        <div className={cx('placeItem')}>
            <span className={cx('name')}>{item.name}</span>
            <strong className={cx('code')}>{item.code}</strong>
        </div>
    );

    render() {
        const {
            value,
            onSelect,
            disabledItem,
        } = this.props;

        return (
            <Select
                trigger={this.renderTrigger()}
                itemList={places}
                renderItem={this.renderItem}
                selectedItem={value}
                disabledItem={disabledItem}
                onSelect={onSelect}
                classNames={['formSelect']}
            />
        );
    }
}

const mapStateToProps = ({ search }, ownProps) => ({
    disabledItem: ownProps.id === 'origin'
        ? search.destination
        : search.origin,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const action = ownProps.id === 'origin'
        ? setOrigin
        : setDestination;

    return {
        onSelect: value => dispatch(action(value)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlaceSelect);
