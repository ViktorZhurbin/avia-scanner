import {
    camelCase,
    mapKeys,
    sortBy,
    uniqueId,
} from 'lodash';

export default (data) => {
    const formatted = data.map((item) => {
        const camelCased = mapKeys(item, (value, key) => camelCase(key));
        camelCased.id = uniqueId();

        return camelCased;
    });

    return sortBy(formatted, ['price']);
};
