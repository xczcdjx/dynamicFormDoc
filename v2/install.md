---
outline: deep
---

# dynamicformdjx-vue2

## 安装

本文表单 API 对应本地 `0.0.7` 包。表单辅助函数使用 `Vue.observable`，需要 Vue 2.6+；当前 Element UI 子入口还包含使用内置 Composition API 的组件，因此请使用 Vue 2.7.x。示例实际安装 Vue 2.7.16 与 Element UI 2.15.14。

```bash
npm install vue@^2.7.16 dynamicformdjx-vue2 element-ui@^2.15.14
```

仅使用 `DynamicInput`、`DynamicCascadeInput` 时从主入口导入；使用 Element UI 表单时从 `/elementUi` 子入口导入。

## 入口与样式

在 `main.js` 中注册 Element UI，并加载样式：

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'dynamicformdjx-vue2/dist/index.css'

Vue.use(ElementUI)
```

上面的 CSS 路径适用于当前 Webpack 3 示例项目。遵循 package exports 的构建器使用公开入口 `dynamicformdjx-vue2/style.css`。

```js
import { DynamicInput, DynamicCascadeInput } from 'dynamicformdjx-vue2'
import { EleDynamicForm, useReactiveForm, useDyForm } from 'dynamicformdjx-vue2/elementUi'
```

`EleDynamicForm` 可以局部注册到 `components`。也可通过 Element UI 子入口默认导出的插件全局注册库内组件：

```js
import DynamicFormPlugin from 'dynamicformdjx-vue2/elementUi'
Vue.use(DynamicFormPlugin)
```

下一步：[表单示例](./dy-elementUi-form)、[综合使用](./optimize/zeal)。


## 本地示例

外部示例位于 `PackageTest/dynamicForm-Vue2-old`。在该目录运行 `npm ci`、`npm run dev`，访问 `http://localhost:6004/#/form`；构建执行 `npm run build`。

项目使用 `file:../package/dynamicformdjx-vue2-0.0.7.tgz`，安装前确认压缩包存在。文档开发模式默认连接本地 Vue2（6004）和 React（6003）示例；生产构建使用已部署的 PackageTest。可在 `BlockOther` 上用 `:is-local="false"` 强制预览线上示例，或用 `isLocal` 强制连接本地。
