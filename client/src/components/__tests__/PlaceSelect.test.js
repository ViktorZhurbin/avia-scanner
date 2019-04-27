import React from 'react';
import { mount } from 'enzyme';

import PlaceSelect from '../MainForm/PlaceSelect';

const props = {
    onSelect: () => null,
    placeholder: 'From',
};

describe('Render PlaceSelect', () => {
    it('Dropdown opens on click', () => {
        const component = mount(
            <PlaceSelect {...props} />,
        );

        expect(component.find('.itemList')).toHaveLength(0);

        component.find('.triggerContainer').simulate('click');

        expect(component.find('.itemList')).toHaveLength(1);

        component.unmount();
    });
});
