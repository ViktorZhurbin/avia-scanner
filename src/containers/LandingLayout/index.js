import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

// import Input from '../../components/Input';
import PlaceSelector from '../PlaceSelector';

import styles from './index.css';

const cx = classNames.bind(styles);

const places = [
    {
        code: 'LHR',
        name: 'London',
    },
    {
        code: 'CDG',
        name: 'Paris',
    },
    {
        code: 'SVO',
        name: 'Moscow',
    },
];

class LandingLayout extends React.Component {
    state = {
        origin: places[0],
        destination: places[1],
    }

    onSubmit = () => null;

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    onSelect = (code, id) => {
        this.setState({
            [id]: code,
        });
    }

    getId = () => {
        const {
            origin,
            destination,
        } = this.state;

        return [origin.code, destination.code].join('');
    };

    render() {
        const { origin, destination } = this.state;

        const searchId = this.getId();

        return (
            <div className={cx('container')}>
                <div className={cx('header')}>
                    Flights and airline tickets
                </div>
                <form
                    className={cx('form')}
                    onSubmit={this.onSubmit}
                    target="_self"
                >
                    <div className={cx('mainFormContent')}>
                        <div className={cx('places')}>
                            <div className={cx('placeItem')}>
                                <PlaceSelector
                                    id="origin"
                                    itemList={places}
                                    selectedItem={origin}
                                    onSelect={this.onSelect}
                                />
                            </div>
                            <div className={cx('placeItem')}>
                                <PlaceSelector
                                    id="destination"
                                    itemList={places}
                                    selectedItem={destination}
                                    onSelect={this.onSelect}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('buttonWrapper')}>
                        <Link to={`/search/${searchId}`}>
                            <button
                                className={cx('submitButton')}
                                type="submit"
                            >
                                Search
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default LandingLayout;
