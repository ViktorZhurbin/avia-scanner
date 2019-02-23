import React from 'react';
import classNames from 'classnames/bind';

import Input from '../../components/Input';

import styles from './index.css';

const cx = classNames.bind(styles);

class LandingLayout extends React.Component {
    state = {
        origin: '',
        destination: '',
    }

    onSubmit = () => null;

    onInputChange = (event) => {
        const inputValue = event.target.value;
        const stateField = event.target.id;
        this.setState({
            [stateField]: inputValue,
        });
    };

    render() {
        const { origin, destination } = this.state;

        return (
            <div>
                <div className={cx('header')}>
                    Flights and airline tickets
                </div>
                <form
                    onSubmit={this.onSubmit}
                    target="_self"
                >
                    <div className={cx('mainFormContent')}>
                        <div className={cx('places')}>
                            <Input
                                id="origin"
                                label="From"
                                placeholder="From"
                                inputValue={origin}
                                onInputChange={this.onInputChange}
                            />
                            <Input
                                id="destination"
                                label="To"
                                placeholder="To"
                                inputValue={destination}
                                onInputChange={this.onInputChange}
                            />
                        </div>
                    </div>
                    <button
                        className={cx('searchButton')}
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

export default LandingLayout;
