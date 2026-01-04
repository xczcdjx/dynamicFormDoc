// https://vitepress.dev/guide/custom-theme
import {h, watch} from 'vue'
import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import BaseBlock from "./components/BaseBlock.vue";
import NaiBlock from "./components/NaiBlock.vue";
import NSimpleDyForm from "./components/naiveui/nSimpleDyForm.vue";
import NCustomDyForm from "./components/naiveui/nCustomDyForm.vue";
import NDecorateDyForm from "./components/naiveui/nDecorateDyForm.vue";
import NDyForm from "./components/naiveui/nDyForm.vue";
import EleBlock from "./components/EleBlock.vue";
import ESimpleDyForm from "./components/elementPlus/eSimpleDyForm.vue";
import ECustomDyForm from "./components/elementPlus/eCustomDyForm.vue";
import EDecorateDyForm from "./components/elementPlus/eDecorateDyForm.vue";
import EDyForm from "./components/elementPlus/eDyForm.vue";
import Layout from "./Layout.vue";
import {i18n} from "./i18n";

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp({app, router, siteData}) {
        // i18n
        app.use(i18n)
        // ...
        app.component('DemoBlock', BaseBlock)
        app.component('NaiBlock', NaiBlock)
        app.component('EleBlock', EleBlock)
        app.component('NSimpleDyForm', NSimpleDyForm)
        app.component('NCustomDyForm', NCustomDyForm)
        app.component('NDecorateDyForm', NDecorateDyForm)
        app.component('NDyForm', NDyForm)
        app.component('ESimpleDyForm', ESimpleDyForm)
        app.component('ECustomDyForm', ECustomDyForm)
        app.component('EDecorateDyForm', EDecorateDyForm)
        app.component('EDyForm', EDyForm)
    }
} satisfies Theme
