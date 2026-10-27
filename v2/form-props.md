---
outline: deep
---

# DynamicForm 参数说明

以下 API 对应 Vue2 `EleDynamicForm`，从 `dynamicformdjx-vue2/elementUi` 导入。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| items | `DyFormItem[]` | 必传 | 字段配置与值 |
| preset | `'fullRow' \| 'grid'` | `'fullRow'` | 单行或栅格布局 |
| formConfig | `object` | `{ labelPosition: 'left' }` | Element UI Form 属性；model 和 rules 由组件管理 |
| rowConfig | `object` | `{ gutter: 10 }` | grid 布局的 Row 属性 |
| rules | `object` | `{}` | 按字段名提供规则，覆盖字段内同名规则 |

## 实例方法

通过 `this.$refs.form` 调用。

| 方法 | 返回值 | 行为 |
| --- | --- | --- |
| getResult() | `object` | 可见字段的键值对象 |
| getResult('ori') | `DyFormItem[]` | 排序后的可见字段对象，非深拷贝 |
| validator() | `Promise<object>` | 成功返回可见字段值，失败拒绝 Promise |
| reset(value = null) | `void` | 设置所有可见字段的值，并清除校验提示 |

## 插槽

`header`、`footer` 是表单前后的作用域插槽，不提供字段参数。

```vue
<EleDynamicForm :items="items">
  <template #header><h3>用户资料</h3></template>
  <template #footer><el-button @click="save">保存</el-button></template>
</EleDynamicForm>
```
