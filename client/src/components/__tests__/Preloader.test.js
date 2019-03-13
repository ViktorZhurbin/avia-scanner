import React from 'react';
import renderer from 'react-test-renderer';

import Preloader from '../Preloader';

describe('Render Preloader', () => {
    it('render correctly', () => {
        const component = renderer.create(
            <Preloader />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
