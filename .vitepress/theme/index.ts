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
import PreviewBlock from "./components/PreviewBlock.vue";
import SimpleInput from "./components/input/simpleInput.vue";
import SimpleSlotInput from "./components/input/simpleSlotInput.vue";
import NCommonZeal from "./components/naiveui/nCommonZeal.vue";
import ECommonZeal from "./components/elementPlus/eCommonZeal.vue";
import CascadeInput from "./components/input/cascadeInput.vue";
import CascadeSlotInput from "./components/input/cascadeSlotInput.vue";
import NZealTemplate from "./components/naiveui/nZealTemplate.vue";
import EZealTemplate from "./components/elementPlus/eZealTemplate.vue";
import {ElLoading} from "element-plus";
import PopupModal from "./components/toolTest/popupModal.vue";
import ZealCard from "./components/toolTest/zealCard.vue";
import ZealTableSearch from "./components/toolTest/zealTableSearch.vue";
import ZealPagination from "./components/toolTest/zealPagination.vue";
import EleZealTableTest from "./components/toolTest/eleZealTableTest.vue";

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp({app, router, siteData}) {
        // i18n
        app.use(i18n)
        app.directive('loading',ElLoading.directive)
        // ...
        app.component('DemoBlock', BaseBlock)
        app.component('NaiBlock', NaiBlock)
        app.component('EleBlock', EleBlock)
        app.component('PreviewBlock', PreviewBlock)
        app.component('NSimpleDyForm', NSimpleDyForm)
        app.component('NCustomDyForm', NCustomDyForm)
        app.component('NDecorateDyForm', NDecorateDyForm)
        app.component('NDyForm', NDyForm)
        app.component('ESimpleDyForm', ESimpleDyForm)
        app.component('ECustomDyForm', ECustomDyForm)
        app.component('EDecorateDyForm', EDecorateDyForm)
        app.component('EDyForm', EDyForm)
        app.component('SimpleInput', SimpleInput)
        app.component('SimpleSlotInput', SimpleSlotInput)
        app.component('NCommonZeal', NCommonZeal)
        app.component('ECommonZeal', ECommonZeal)
        app.component('CascadeInput', CascadeInput)
        app.component('CascadeSlotInput', CascadeSlotInput)
        app.component('NZealTemplate', NZealTemplate)
        app.component('EZealTemplate', EZealTemplate)
        app.component('PopupModal', PopupModal)
        app.component('ZealCard', ZealCard)
        app.component('ZealTableSearch', ZealTableSearch)
        app.component('ZealPagination', ZealPagination)
        app.component('EleZealTableTest', EleZealTableTest)
    }
} satisfies Theme
