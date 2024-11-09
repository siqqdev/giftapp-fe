import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        cache: {
            enabled: false,
        },
        backend: {
            loadPath: '/src/assets/locales/{{lng}}/{{ns}}.json?v=2',
        },
    })

export default i18n
