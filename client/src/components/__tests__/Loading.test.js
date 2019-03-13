import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../Loading';

describe('Render Loading', () => {
    it('render correctly', () => {
        const component = renderer.create(
            <Loading />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
