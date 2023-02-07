import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import HttpApi from "i18next-http-backend";

i18n.use(initReactI18next)
    // .use(HttpApi)
    .init({
    fallbackLng: 'en',
    lng: 'zh',
    resources: {
        en: {
            translations: require('./locales/en/translation.json')
        },
        zh: {
            translations: require('./locales/zh/translation.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['en', 'zh'];

export default i18n;
