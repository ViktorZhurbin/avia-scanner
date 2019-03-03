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

    const localeData = lang.split('-');
    const language = localeData[0];
    const country = localeData.length > 1 ? localeData[1] : localeData[0].toUpperCase();

    return `${language}-${country}`;
};
