import React from 'react';
import renderer from 'react-test-renderer';

import Checkbox from './index';

it('Checkbox renders correctly', () => {
    const component = renderer.create(
        <Checkbox
            id={0}
            checked
            name="checkbox"
            selectedStops={{ 0: true, 1: false }}
        />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
