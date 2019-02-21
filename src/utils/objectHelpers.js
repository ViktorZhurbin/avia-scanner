import uniq from 'lodash/uniq';

export default (arr, key) => {
    const keyValues = arr.map(item => item[key]);

    return uniq(keyValues).sort();
};
