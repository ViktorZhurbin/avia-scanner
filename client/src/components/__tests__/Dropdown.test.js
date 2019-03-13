import React from 'react';
import { shallow } from 'enzyme';

import Dropdown from '../Dropdown';

const props = {
    onSelect: () => null,
};

describe('Render Dropdown', () => {
    it('render correctly dropdown component', () => {
        const component = shallow(
            <Dropdown
                {...props}
                trigger={<div />}
            >
                <ul>
                    <li>One</li>
                    <li>Two</li>
                </ul>
            </Dropdown>,
        );
        expect(component).toMatchSnapshot();
    });
});
