export default () => {
    let lang;

    if (navigator.languages && navigator.languages.length) {
        // latest versions of Chrome and Firefox set this correctly
        const [language] = navigator.languages;
        lang = language;
    } else if (navigator.userLanguage) {
        // IE only
        lang = navigator.userLanguage;
    } else {
        // latest versions of Chrome, Firefox, and Safari set this correctly
        lang = navigator.language;
    }

    const [language, country] = lang.split('-');

    return `${language}-${country.toUpperCase()}`;
};
