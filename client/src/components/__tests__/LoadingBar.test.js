import React from 'react';
import renderer from 'react-test-renderer';

import LoadingBar from '../LoadingBar';

describe('Render LoadingBar', () => {
    it('render correctly', () => {
        const component = renderer.create(
            <LoadingBar isLoading />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
