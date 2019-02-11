import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';
import sortBy from 'lodash/sortBy';
import uuidv4 from 'uuid/v4';

export default (data) => {
    const formatted = data.map((item) => {
        const camelCased = mapKeys(item, (value, key) => camelCase(key));
        camelCased.id = uuidv4();

        return camelCased;
    });

    return sortBy(formatted, ['price']);
};
