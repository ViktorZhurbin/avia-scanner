import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from '../DatePicker';

const props = {
    onSelect: () => null,
};

describe('Render DatePicker', () => {
    it('render correctly date component', () => {
        const component = shallow(
            <DatePicker
                {...props}
                trigger={<div />}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
