import React from 'react';
import { shallow } from 'enzyme';

import NoResults from '../NoResults';

const props = {
    ticketsCount: 10,
    onFilterReset: () => null,
};

describe('Render NoResults', () => {
    it('render correctly', () => {
        const component = shallow(
            <NoResults {...props} />,
        );
        expect(component).toMatchSnapshot();
    });
});
