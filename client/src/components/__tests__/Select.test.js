import React from 'react';
import { shallow } from 'enzyme';

import Select from '../Select';
import { places } from '../../constants/mockData';

const props = {
    itemList: places,
    selectedItem: places[0],
    disabledItem: places[1],
    onSelect: () => null,
};

describe('Render Select', () => {
    it('render correctly', () => {
        const component = shallow(
            <Select
                {...props}
                trigger={<div />}
                renderItem={() => <div />}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
