import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from '../DatePicker';

describe('Render DatePicker', () => {
    it('render correctly date component', () => {
        const component = shallow(
            <DatePicker
                onSelect={() => null}
                trigger={<div />}
            />,
        );
        component.setState({ date: '2030-03-24T12:00:00.000Z' });
        expect(component).toMatchSnapshot();
    });
});
