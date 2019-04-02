import inflectStops from '../inflection';

describe('Render English inflect util', () => {
    it('with 0', () => {
        const value = inflectStops(0);
        expect(value).toEqual('Direct');
    });

    it('with 1', () => {
        const value = inflectStops(1);
        expect(value).toEqual('1 stop');
    });

    it('with 12', () => {
        const value = inflectStops(12);
        expect(value).toEqual('12 stops');
    });
});
