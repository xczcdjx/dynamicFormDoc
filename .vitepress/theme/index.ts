// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import BaseBlock from "./components/BaseBlock.vue";
import NaiBlock from "./components/NaiBlock.vue";
import NSimpleDyForm from "./components/naiveui/nSimpleDyForm.vue";
import NCustomDyForm from "./components/naiveui/nCustomDyForm.vue";
import NDecorateDyForm from "./components/naiveui/nDecorateDyForm.vue";
import NDyForm from "./components/naiveui/nDyForm.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('DemoBlock', BaseBlock)
    app.component('NaiBlock', NaiBlock)
    app.component('NSimpleDyForm', NSimpleDyForm)
    app.component('NCustomDyForm', NCustomDyForm)
    app.component('NDecorateDyForm', NDecorateDyForm)
    app.component('NDyForm', NDyForm)
  }
} satisfies Theme
