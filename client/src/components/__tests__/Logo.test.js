import React from 'react';
import { shallow } from 'enzyme';

import Logo from '../Logo';

describe('Render Logo', () => {
    it('render correctly', () => {
        const component = shallow(
            <Logo />,
        );
        expect(component).toMatchSnapshot();
    });
});
