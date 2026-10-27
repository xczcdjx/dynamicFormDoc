---
outline: deep
---

# EleDynamicForm

动态表单。请先安装 Element UI，所有示例从 `dynamicformdjx-vue2/elementUi` 导入，运行在 PackageTest 的 Vue2 应用中。

## 1.简单使用

通过 `useReactiveForm` 创建字段，`useDyForm` 设置和读取数据，`render2` 返回输入组件。切换单行和栅格布局，点击设置数据、获取数据、校验与重置查看效果。

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/form" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="520px"/>
</template>
<template #code>

```vue
<script>
import { EleDynamicForm, useReactiveForm, useDyForm, renderInput, renderSelect } from 'dynamicformdjx-vue2/elementUi'

export default {
  name: 'SimpleForm',
  components: { EleDynamicForm },
  data () {
    const items = useReactiveForm([
      { key: 'name', label: '姓名', value: '', required: true, span: 12,
        render2: item => renderInput(item.value, { clearable: true }, item) },
      { key: 'role', label: '角色', value: null, span: 12,
        options: [{ label: '管理员', value: 'admin' }, { label: '访客', value: 'guest' }],
        render2: item => renderSelect(item.value, item.options, {}, item) }
    ])
    return { items, ops: useDyForm(items), result: '', preset: 'fullRow' }
  },
  methods: {
    read () { this.result = JSON.stringify(this.ops.getValues(), null, 2) },
    validate () {
      this.$refs.form.validator().then(value => {
        this.result = JSON.stringify(value, null, 2)
      }).catch(() => { this.result = '请填写必填字段' })
    }
  }
}
</script>
<template>
  <section style="padding: 20px">
    <el-radio-group v-model="preset">
      <el-radio-button label="fullRow">单行</el-radio-button>
      <el-radio-button label="grid">栅格</el-radio-button>
    </el-radio-group>
    <EleDynamicForm ref="form" :items="items" :preset="preset" :form-config="{ labelWidth: '80px' }" />
    <el-button @click="read">获取数据</el-button>
    <el-button @click="ops.setValues({ name: '张三', role: 'admin' })">设置数据</el-button>
    <el-button @click="validate">校验</el-button>
    <el-button @click="$refs.form.reset()">重置</el-button>
    <pre>{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

## 2.自定义使用

`render2(item, setValue)` 可返回自定义 VNode，通过 `setValue` 回写。示例同时演示禁用、隐藏与必填校验；自定义控件需要自行绑定 `item.disabled`。

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/form/customForm" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="520px"/>
</template>
<template #code>

```vue
<script>
import { EleDynamicForm, useReactiveForm, useDyForm } from 'dynamicformdjx-vue2/elementUi'

export default {
  name: 'CustomForm',
  components: { EleDynamicForm },
  data () {
    const items = useReactiveForm([
      { key: 'name', label: '姓名', value: '', required: true, span: 12 },
      { key: 'role', label: '角色', value: 'guest', renderType: 'renderSelect', span: 12,
        options: [{ label: '管理员', value: 'admin' }, { label: '访客', value: 'guest' }] },
      { key: 'age', label: '年龄', value: 18, renderType: 'renderInputNumber', span: 12 },
      { key: 'enabled', label: '启用', value: false, renderType: 'renderSwitch', span: 12 },
      { key: 'note', label: '自定义输入', value: '',
        render2: (item, setValue) => this.$createElement('el-input', {
          props: { value: item.value, disabled: item.disabled, placeholder: '通过 setValue 回写' },
          on: { input: setValue }
        }) }
    ])
    return { items, ops: useDyForm(items), disabled: false, hidden: false, result: '' }
  },
  methods: {
    fill () { this.ops.setValues({ name: '张三', role: 'admin', age: 20, enabled: true, note: '已回填' }) },
    read () { this.result = JSON.stringify(this.ops.getValues(), null, 2) },
    toggleDisabled () { this.disabled = !this.disabled; this.ops.setDisabled(this.disabled, ['name']) },
    toggleHidden () { this.hidden = !this.hidden; this.ops.setHidden(this.hidden, ['age']) },
    validate () {
      this.$refs.form.validator().then(value => {
        this.result = '校验成功\n' + JSON.stringify(value, null, 2)
      }).catch(() => { this.result = '校验失败：请输入姓名' })
    },
    reset () { this.$refs.form.reset(); this.read() }
  }
}
</script>

<template>
  <section style="padding: 20px">
    <EleDynamicForm ref="form" :items="items" preset="grid" :form-config="{ labelWidth: '100px' }" />
    <el-button @click="fill">回填</el-button>
    <el-button @click="read">读取</el-button>
    <el-button @click="toggleDisabled">切换姓名禁用</el-button>
    <el-button @click="toggleHidden">切换年龄隐藏</el-button>
    <el-button @click="validate">校验</el-button>
    <el-button @click="reset">重置</el-button>
    <pre aria-live="polite">{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

## 3.装饰表单

`useDecorateForm` 根据 `renderType` 生成 `render2`，省去逐个调用渲染函数；已有的 `render2` 会保留。

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/form/decorateForm" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="520px"/>
</template>
<template #code>

```vue
<script>
import { EleDynamicForm, useDecorateForm, useDyForm } from 'dynamicformdjx-vue2/elementUi'

export default {
  name: 'DecorateForm',
  components: { EleDynamicForm },
  data () {
    const items = useDecorateForm([
      { key: 'name', label: '姓名', value: '', required: true, span: 12,
        renderType: 'renderInput', renderProps: { clearable: true } },
      { key: 'role', label: '角色', value: null, span: 12,
        options: [{ label: '管理员', value: 'admin' }, { label: '访客', value: 'guest' }],
        renderType: 'renderSelect' }
    ])
    return { items, ops: useDyForm(items), result: '', preset: 'fullRow' }
  },
  methods: {
    read () { this.result = JSON.stringify(this.ops.getValues(), null, 2) },
    validate () {
      this.$refs.form.validator().then(value => {
        this.result = JSON.stringify(value, null, 2)
      }).catch(() => { this.result = '请填写必填字段' })
    }
  }
}
</script>
<template>
  <section style="padding: 20px">
    <el-radio-group v-model="preset">
      <el-radio-button label="fullRow">单行</el-radio-button>
      <el-radio-button label="grid">栅格</el-radio-button>
    </el-radio-group>
    <EleDynamicForm ref="form" :items="items" :preset="preset" :form-config="{ labelWidth: '80px' }" />
    <el-button @click="read">获取数据</el-button>
    <el-button @click="ops.setValues({ name: '张三', role: 'admin' })">设置数据</el-button>
    <el-button @click="validate">校验</el-button>
    <el-button @click="$refs.form.reset()">重置</el-button>
    <pre>{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

## 4.总表单

集中展示内置输入、选择、日期、时间、开关、滑块和标签组件。各控件修改后点击获取数据，检查对应值及类型。

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/form/allForm" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="700px"/>
</template>
<template #code>

```vue
<script>
import { EleDynamicForm, useDecorateForm, useDyForm } from 'dynamicformdjx-vue2/elementUi'

export default {
  name: 'AllForm',
  components: { EleDynamicForm },
  data () {
    const choices = [{ label: '选项 A', value: 'a' }, { label: '选项 B', value: 'b' }]
    const items = useDecorateForm([
      { key: 'text', label: '文本', value: '', span: 12, renderType: 'renderInput' },
      { key: 'number', label: '数字', value: 18, span: 12, renderType: 'renderInputNumber' },
      { key: 'select', label: '选择', value: null, span: 12, renderType: 'renderSelect', options: choices },
      { key: 'radio', label: '单选', value: 'a', span: 12, renderType: 'renderRadioGroup', options: choices },
      { key: 'radioButton', label: '按钮单选', value: 'a', span: 12, renderType: 'renderRadioButtonGroup', options: choices },
      { key: 'checkboxGroup', label: '多选', value: [], span: 12, renderType: 'renderCheckboxGroup', options: choices },
      { key: 'enabled', label: '开关', value: false, span: 12, renderType: 'renderSwitch' },
      { key: 'checkbox', label: '复选框', value: false, span: 12, renderType: 'renderCheckbox' },
      { key: 'date', label: '日期', value: null, span: 12, renderType: 'renderDatePicker' },
      { key: 'time', label: '时间', value: null, span: 12, renderType: 'renderTimePicker' },
      { key: 'slider', label: '滑块', value: 10, span: 12, renderType: 'renderSlider' },
      { key: 'pop', label: '弹出选择', value: null, span: 12, renderType: 'renderPopSelect', options: choices },
      { key: 'tree', label: '树选择', value: null, span: 12, renderType: 'renderTreeSelect', options: choices },
      { key: 'tags', label: '标签', value: [], span: 12, renderType: 'renderDynamicTags' }
    ])
    return { items, ops: useDyForm(items), result: '', preset: 'grid' }
  },
  methods: {
    read () { this.result = JSON.stringify(this.ops.getValues(), null, 2) },
    validate () {
      this.$refs.form.validator().then(value => {
        this.result = JSON.stringify(value, null, 2)
      }).catch(() => { this.result = '请填写必填字段' })
    }
  }
}
</script>
<template>
  <section style="padding: 20px">
    <el-radio-group v-model="preset">
      <el-radio-button label="fullRow">单行</el-radio-button>
      <el-radio-button label="grid">栅格</el-radio-button>
    </el-radio-group>
    <EleDynamicForm ref="form" :items="items" :preset="preset" :form-config="{ labelWidth: '80px' }" />
    <el-button @click="read">获取数据</el-button>
    <el-button @click="ops.setValues({ text: '示例', number: 20, select: 'a', enabled: true, tags: ['Vue2'] })">设置数据</el-button>
    <el-button @click="validate">校验</el-button>
    <el-button @click="$refs.form.reset()">重置</el-button>
    <pre>{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

## 数据与重置

::: tip
组件 `getResult()` 和 `validator()` 只收集可见字段；`useDyForm().getValues()` 包含隐藏字段。组件 `reset()` 将可见字段设为 null 并清除校验提示，操作器 `onReset()` 则设置全部字段，均不恢复初始值。
:::

[Props](./form-props) · [Types](./types) · [Hooks](./hooks) · [Render2](./render2)
