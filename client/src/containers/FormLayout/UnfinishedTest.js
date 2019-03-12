import React from 'react';
import { shallow } from 'enzyme';

import FormLayout from './index';

describe('FormLayout', () => {
    describe('hasTickets prop on componentDidMount', () => {
        it('should be true if there is search', async () => {
            const renderedComponent = await shallow(<FormLayout />);
            await renderedComponent.update();
            expect(renderedComponent.props('hasTickets')).toBe(true);
        });

        it('should be false if there is no search', async () => {
            const renderedComponent = await shallow(<FormLayout />);
            await renderedComponent.update();
            expect(renderedComponent.props('hasTickets')).toBe(false);
        });
    });
});
