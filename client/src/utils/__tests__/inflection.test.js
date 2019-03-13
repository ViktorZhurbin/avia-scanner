import { inflectStopsRu, inflectStopsEn } from '../inflection';

describe('Render English inflect util', () => {
    it('with 0', () => {
        const value = inflectStopsEn(0);
        expect(value).toEqual('Direct');
    });

    it('with 1', () => {
        const value = inflectStopsEn(1);
        expect(value).toEqual('1 stop');
    });

    it('with 12', () => {
        const value = inflectStopsEn(12);
        expect(value).toEqual('12 stops');
    });
});

describe('Render Russian inflect util', () => {
    it('with 0', () => {
        const value = inflectStopsRu(0);
        expect(value).toEqual('Без пересадок');
    });

    it('with 1', () => {
        const value = inflectStopsRu(1);
        expect(value).toEqual('1 пересадка');
    });

    it('with 3', () => {
        const value = inflectStopsRu(3);
        expect(value).toEqual('3 пересадки');
    });

    it('with 12', () => {
        const value = inflectStopsRu(12);
        expect(value).toEqual('12 пересадок');
    });
});
