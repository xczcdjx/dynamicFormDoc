import {createI18n} from 'vue-i18n'
import zhLang from './lang/zh'
import enLang from './lang/en'

const messages = {
    'zh-CN': zhLang,
    'en-US': enLang
}
export const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    messages
})
