import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';
import Preloader from '../Preloader';

describe('Render Button', () => {
    it('render correctly with text children', () => {
        const component = renderer.create(
            <Button>
                Find
            </Button>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('render correctly with node children', () => {
        const component = renderer.create(
            <Button>
                <div>Book</div>
                <div>$156</div>
            </Button>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('render correctly with Preloader', () => {
        const component = renderer.create(
            <Button isLoading>
                <Preloader />
            </Button>,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
