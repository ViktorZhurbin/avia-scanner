import React from 'react';
import renderer from 'react-test-renderer';

import Checkbox from '../Checkbox';

const props = {
    id: 0,
    checked: false,
    name: 'checkbox',
    selectedStops: [0],
};

describe('Render Checkbox', () => {
    it('render correctly with required and default props', () => {
        const component = renderer.create(
            <Checkbox {...props} />,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
