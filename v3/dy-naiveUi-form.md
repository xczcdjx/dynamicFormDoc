# NaiDynamicForm

动态表单
> 请确保已经安装naive-ui,下方所有表单是在原有基础做的一个简化封装

## 1.简单使用
<NaiBlock>
<template #code>

::: code-group

```vue [TypeScript]

<script setup lang="ts">
  import {ref} from "vue";
  import {NButton} from "naive-ui";
  import {useDyForm, useReactiveForm} from "dynamicformdjx";
  import {type naiDynamicFormRef, NaiDynamicForm, renderInput, renderRadioGroup} from "dynamicformdjx/naiveUi";
  import type {PresetType} from "dynamicformdjx/types/index";

  type FormRow = {
    username: string
    password: string
    preset: PresetType
  }
  const naiDynamicFormRef = ref<naiDynamicFormRef | null>(null)
  const presetType = ref<PresetType>('fullRow')
  const formItems = useReactiveForm<FormRow>([
    {
      key: "username",
      label: "姓名",
      value: ref<string | null>(null),
      clearable: true,
      placeholder: '请输入姓名',
      required: true, // 是否必填 (简化rules规则)
      render2: f => renderInput(f.value, {}, f),
      span: 6
    },
    {
      key: "password",
      label: "密码",
      value: ref<string | null>(null),
      clearable: true,
      type: 'password',
      required: true,
      placeholder: '请输入密码',
      render2: f => renderInput(f.value, {showPasswordOn: 'click'}, f),
      span: 8,
      offset: 2,
      requiredHint: l => `${l} is not empty`
    },
    {
      key: "preset",
      label: "表格预设",
      value: ref<PresetType | null>(presetType.value),
      render2: f => renderRadioGroup(f.value, [
        {label: '整行', value: 'fullRow'},
        {label: '表格', value: 'grid'},
      ], {name: 'preset'}, f),
      onChange: (v) => {
        presetType.value = v
      }
    },
  ])
  const useForm = useDyForm<FormRow>(formItems)
  const getData = () => {
    // const res=useForm.getValues() // 或
    const res = naiDynamicFormRef.value?.getResult?.()
    console.log(res)
  }
  const resetData = () => {
    // useForm.onReset() // 或
    naiDynamicFormRef.value?.reset?.()
  }
  const setData = () => {
    // 隐藏username
    // useForm.setHidden(true, ['username'])
    // 设置username 为不可输入
    // useForm.setDisabled(true, ['username'])
    //  直接修改
    useForm.setValues({
      username: 'naive-ui',
      password: '520'
    })
  }
  const validatorData = () => {
    // 校验
    naiDynamicFormRef.value?.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<template>
  <NaiDynamicForm :items="formItems" ref="naiDynamicFormRef" :preset="presetType">
    <template #header>
      <h3>与Naive ui结合简单表单</h3>
    </template>
    <template #footer>
      <div class="control">
        <n-button @click="getData" type="success" size="small">get Data</n-button>
        <n-button @click="setData" type="warning" size="small">set Data</n-button>
        <n-button @click="validatorData" type="default" size="small">validate Data</n-button>
        <n-button @click="resetData" type="error" size="small">reset Data</n-button>
      </div>
    </template>
  </NaiDynamicForm>
</template>

<style scoped>
  h3 {
    text-align: center;
    margin: 0 0 10px 0;
  }

  .control {
    display: flex;
    gap: 5px;
  }
</style>
```

```vue [JavaScript]

<script setup>
  import {ref} from "vue"
  import {NButton} from "naive-ui"
  import {useDyForm, useReactiveForm} from "dynamicformdjx"
  import {NaiDynamicForm, renderInput, renderRadioGroup} from "dynamicformdjx/naiveUi"

  const naiDynamicFormRef = ref(null)
  const presetType = ref("fullRow")
  const formItems = useReactiveForm([
    {
      key: "username",
      label: "姓名",
      value: ref(null),
      clearable: true,
      placeholder: "请输入姓名",
      required: true,
      render2: (f) => renderInput(f.value, {}, f),
      span: 6,
    },
    {
      key: "password",
      label: "密码",
      value: ref(null),
      clearable: true,
      type: "password",
      required: true,
      placeholder: "请输入密码",
      render2: (f) => renderInput(f.value, {showPasswordOn: "click"}, f),
      span: 8,
      offset: 2,
      requiredHint: (l) => `${l} is not empty`,
    },
    {
      key: "preset",
      label: "表格预设",
      value: ref(presetType.value),
      render2: (f) =>
          renderRadioGroup(
              f.value,
              [
                {label: "整行", value: "fullRow"},
                {label: "表格", value: "grid"},
              ],
              {name: "preset"},
              f
          ),
      onChange: (v) => {
        presetType.value = v
      },
    },
  ])
  const useForm = useDyForm(formItems)

  const getData = () => {
    // const res = useForm.getValues() // 或
    const res = naiDynamicFormRef.value?.getResult?.()
    console.log(res)
  }

  const resetData = () => {
    // useForm.onReset() // 或
    naiDynamicFormRef.value?.reset?.()
  }

  const setData = () => {
    useForm.setValues({
      username: "naive-ui",
      password: "520",
    })
  }

  const validatorData = () => {
    naiDynamicFormRef.value
        ?.validator()
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
  }
</script>

<template>
  <NaiDynamicForm :items="formItems" ref="naiDynamicFormRef" :preset="presetType">
    <template #header>
      <h3>与Naive ui结合简单表单</h3>
    </template>

    <template #footer>
      <div class="control">
        <n-button @click="getData" type="success" size="small">get Data</n-button>
        <n-button @click="setData" type="warning" size="small">set Data</n-button>
        <n-button @click="validatorData" type="default" size="small">validate Data</n-button>
        <n-button @click="resetData" type="error" size="small">reset Data</n-button>
      </div>
    </template>
  </NaiDynamicForm>
</template>

<style scoped>
  h3 {
    text-align: center;
    margin: 0 0 10px 0;
  }

  .control {
    display: flex;
    gap: 5px;
  }
</style>
```

:::

  </template>
<NSimpleDyForm/>
</NaiBlock>

## 2.自定义使用
> (所有render2函数使用自定义)
### InputTest.vue
```vue [Typescript]
<script setup lang="ts">
import {NInput} from "naive-ui";
import {useAttrs} from "vue";
const fv=defineModel()
const attrs=useAttrs()
</script>

<template>
<n-input v-model="fv" v-bind="attrs"/>
</template>

<style scoped>

</style>
```
### Render.vue
<NaiBlock>
<template #code>

::: code-group

```vue [TypeScript]
<script setup lang="ts">
  import {h, ref} from "vue";
  import {NButton, NInput} from "naive-ui";
  import {useDyForm, useReactiveForm} from "dynamicformdjx";
  import {type naiDynamicFormRef, NaiDynamicForm, NaiDynamicInput, type naiDynamicInputRef} from "dynamicformdjx/naiveUi";
  import type {FormItemRule, FormRules} from "naive-ui/es/form/src/interface";
  import InputTest from "./InputTest.vue";

  type FormRow = {
    name: string
    desc: string
    json: object
  }
  const naiDynamicFormRef = ref<naiDynamicFormRef | null>(null)
  const naiDynamicInputRef = ref<naiDynamicInputRef | null>(null)
  const formItems = useReactiveForm<FormRow, FormRules | FormItemRule>([
    {
      key: "name",
      label: "姓名",
      value: ref<string | null>(null),
      clearable: true,
      placeholder: '请输入姓名',
      required: true,
      // @ts-ignore
      render2: f => h(NInput, {
        ...f,
        value: f.value.value, "onUpdate:value"(v) {
          f.value.value = v
        }
      }),
    },
    {
      key: "desc",
      label: "描述",
      value: ref<string | null>(null),
      clearable: true,
      placeholder: '请输入描述',
      required: true,
      type: 'textarea',
      render2: f => h(InputTest, {
        ...f,
        value: f.value.value, "onUpdate:value"(v) {
          f.value.value = v
        }
      }),
    },
    {
      key: "json",
      label: "Json",
      value: ref<object>({}),
      rule: {
        required: true,
        validator(_: FormItemRule, value: object) {
          return Object.keys(value).length > 0
        },
        trigger: ['blur', 'change'],
        message: 'json 不能为空'
      },
      render2: f => h(NaiDynamicInput, {
        modelValue: f.value.value, "onUpdate:modelValue"(v) {
          f.value.value = v
        },
        isController: true,
        ref: naiDynamicInputRef
      }),
    },
  ])
  const useForm = useDyForm<FormRow>(formItems)
  const getData = () => {
    console.log(useForm.getValues())
  }
  const resetData = () => {
    useForm.onReset()
    naiDynamicInputRef.value?.onSet?.({})
  }
  const setData = () => {
    useForm.setValues({
      name: 'naive-ui',
      desc:`A Vue 3 Component Library Fairly Complete, Theme Customizable, Uses TypeScript, Fast Kinda Interesting`
    })
    naiDynamicInputRef.value?.onSet?.({
      question: 'how are you?',
      answer: "I'm fine,Thank you"
    })
  }
  const validatorData = () => {
    // 校验
    naiDynamicFormRef.value?.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<template>
  <NaiDynamicForm :items="formItems" ref="naiDynamicFormRef"/>
  <div class="control">
    <n-button @click="getData" type="success" size="small">get Data</n-button>
    <n-button @click="setData" type="warning" size="small">set Data</n-button>
    <n-button @click="validatorData" type="default" size="small">validate Data</n-button>
    <n-button @click="resetData" type="error" size="small">reset Data</n-button>
  </div>
</template>

<style scoped>
  .control {
    display: flex;
    gap: 5px;
  }
</style>
```

```vue [JavaScript]
<script setup>
  import { h, ref } from "vue"
  import { NButton, NInput } from "naive-ui"
  import { useDyForm, useReactiveForm } from "dynamicformdjx"
  import { NaiDynamicForm, NaiDynamicInput } from "dynamicformdjx/naiveUi"
  import InputTest from "./InputTest.vue"

  const naiDynamicFormRef = ref(null)
  const naiDynamicInputRef = ref(null)

  const formItems = useReactiveForm([
    {
      key: "name",
      label: "姓名",
      value: ref(null),
      clearable: true,
      placeholder: "请输入姓名",
      required: true,
      render2: (f) =>
          h(NInput, {
            ...f,
            value: f.value.value,
            "onUpdate:value"(v) {
              f.value.value = v
            },
          }),
    },
    {
      key: "desc",
      label: "描述",
      value: ref(null),
      clearable: true,
      placeholder: "请输入描述",
      required: true,
      type: "textarea",
      render2: (f) =>
          h(InputTest, {
            ...f,
            value: f.value.value,
            "onUpdate:value"(v) {
              f.value.value = v
            },
          }),
    },
    {
      key: "json",
      label: "Json",
      value: ref({}),
      rule: {
        required: true,
        validator(_, value) {
          return Object.keys(value).length > 0
        },
        trigger: ["blur", "change"],
        message: "json 不能为空",
      },
      render2: (f) =>
          h(NaiDynamicInput, {
            modelValue: f.value.value,
            "onUpdate:modelValue"(v) {
              f.value.value = v
            },
            isController: true,
            ref: naiDynamicInputRef,
          }),
    },
  ])

  const useForm = useDyForm(formItems)

  const getData = () => {
    console.log(useForm.getValues())
  }

  const resetData = () => {
    useForm.onReset()
    naiDynamicInputRef.value?.onSet?.({})
  }

  const setData = () => {
    useForm.setValues({
      name: "naive-ui",
      desc: `A Vue 3 Component Library Fairly Complete, Theme Customizable, Uses TypeScript, Fast Kinda Interesting`,
    })
    naiDynamicInputRef.value?.onSet?.({
      question: "how are you?",
      answer: "I'm fine,Thank you",
    })
  }

  const validatorData = () => {
    naiDynamicFormRef.value?.validator().then(console.log).catch(console.log)
  }
</script>

<template>
  <NaiDynamicForm :items="formItems" ref="naiDynamicFormRef" />
  <div class="control">
    <n-button @click="getData" type="success" size="small">get Data</n-button>
    <n-button @click="setData" type="warning" size="small">set Data</n-button>
    <n-button @click="validatorData" type="default" size="small">validate Data</n-button>
    <n-button @click="resetData" type="error" size="small">reset Data</n-button>
  </div>
</template>

<style scoped>
  .control {
    display: flex;
    gap: 5px;
  }
</style>

```

:::

  </template>
<NCustomDyForm/>
</NaiBlock>



## 3.装饰表单
> (可省略render2函数)

<NaiBlock>
<template #code>

::: code-group

```vue [TypeScript]
<script setup lang="ts">
  import { ref} from "vue";
  import {NButton} from "naive-ui";
  import {useDyForm} from "dynamicformdjx";
  import {
    type naiDynamicFormRef,
    NaiDynamicForm,
    useDecorateForm,
    renderDatePicker
  } from "dynamicformdjx/naiveUi";


  type FormRow = {
    password: string
    job: number
    birthday: number
  }
  const naiDynamicFormRef = ref<naiDynamicFormRef | null>(null)
  const formItems = useDecorateForm<FormRow>([
    {
      key: "password",
      label: "密码",
      value: null,
      clearable: true,
      placeholder: '请输入密码',
      required: true,
      type:'password',
      renderType: 'renderInput',
      renderProps:{
        showPasswordOn:'click'
      }
    },
    {
      key: "job",
      label: "职位",
      value: null,
      clearable: true,
      options: ['前端', '后端'].map((label, value) => ({label, value})),
      renderType: 'renderSelect',
    },
    {
      key: "birthday",
      label: "生日",
      value: null,
      render2: f => renderDatePicker(f.value, {type: 'datetime'}, f),
    },
  ])
  const useForm = useDyForm<FormRow>(formItems)
  const getData = () => {
    const res = naiDynamicFormRef.value?.getResult?.()
    console.log(res)
  }
  const resetData = () => {
    naiDynamicFormRef.value?.reset?.()
  }
  const setData = () => {
    useForm.setValues({
      password: 'naive-ui',
      job: 0,
      birthday: Date.now(),
    })
  }
  const validatorData = () => {
    naiDynamicFormRef.value?.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<template>
  <NaiDynamicForm :items="formItems" ref="naiDynamicFormRef"/>
  <div class="control">
    <n-button @click="getData" type="success" size="small">get Data</n-button>
    <n-button @click="setData" type="warning" size="small">set Data</n-button>
    <n-button @click="validatorData" type="default" size="small">validate Data</n-button>
    <n-button @click="resetData" type="error" size="small">reset Data</n-button>
  </div>
</template>

<style scoped>
  .control {
    display: flex;
    gap: 5px;
  }
</style>
```

```vue [JavaScript]
<script setup>
  import { ref } from "vue"
  import { NButton } from "naive-ui"
  import { useDyForm } from "dynamicformdjx"
  import { NaiDynamicForm, useDecorateForm, renderDatePicker } from "dynamicformdjx/naiveUi"

  const naiDynamicFormRef = ref(null)
  const formItems = useDecorateForm([
    {
      key: "password",
      label: "密码",
      value: null,
      clearable: true,
      placeholder: "请输入密码",
      required: true,
      type: "password",
      renderType: "renderInput",
      renderProps: {
        showPasswordOn: "click",
      },
    },
    {
      key: "job",
      label: "职位",
      value: null,
      clearable: true,
      options: ["前端", "后端"].map((label, value) => ({ label, value })),
      renderType: "renderSelect",
    },
    {
      key: "birthday",
      label: "生日",
      value: null,
      render2: (f) => renderDatePicker(f.value, { type: "datetime" }, f),
    },
  ])

  const useForm = useDyForm(formItems)

  const getData = () => {
    const res = naiDynamicFormRef.value?.getResult?.()
    console.log(res)
  }

  const resetData = () => {
    naiDynamicFormRef.value?.reset?.()
  }

  const setData = () => {
    useForm.setValues({
      password: "naive-ui",
      job: 0,
      birthday: Date.now(),
    })
  }

  const validatorData = () => {
    naiDynamicFormRef.value?.validator().then(console.log).catch(console.log)
  }
</script>

<template>
  <NaiDynamicForm :items="formItems" ref="naiDynamicFormRef" />
  <div class="control">
    <n-button @click="getData" type="success" size="small">get Data</n-button>
    <n-button @click="setData" type="warning" size="small">set Data</n-button>
    <n-button @click="validatorData" type="default" size="small">validate Data</n-button>
    <n-button @click="resetData" type="error" size="small">reset Data</n-button>
  </div>
</template>

<style scoped>
  .control {
    display: flex;
    gap: 5px;
  }
</style>

```

:::

</template>
<NDecorateDyForm/>
</NaiBlock>

## 4.总表单
> 所有render2函数从"dynamicformdjx/naiveUi"中导入

<NaiBlock>
<template #code>

::: code-group

```vue [TypeScript]
<script setup lang="ts">
  import {ref} from "vue";
  import {NButton} from "naive-ui";
  import {FormRules, FormItemRule} from "naive-ui/es/form/src/interface";

  import {
    naiDynamicFormRef,
    NaiDynamicForm,
    renderCheckboxGroup, renderDatePicker,
    renderInput, renderPopSelect,
    renderRadioButtonGroup, renderRadioGroup,
    renderSelect, renderSwitch, renderTimePicker, renderTreeSelect
  } from "dynamicformdjx/naiveUi";

  import {useDyForm, useReactiveForm} from "dynamicformdjx";

  type FormRow = {
    username: string
    password: string
    gender: number
    description: string
    email: string
    birthday: string
    desc: string
    sex: number
    birthdayT: number
    admin: number
    favorite: number[]
    job: number
    job2: number
    job3: number
  }
  const rules: FormRules = {
    username: {
      required: true,
      message: '请输入',
      trigger: ['blur']
    },
  }
  const naiDynamicFormRef = ref<naiDynamicFormRef>(null)
  const formItems = useReactiveForm<FormRow, FormRules | FormItemRule | FormItemRule[]>(
      [
        {
          key: "username",
          label: "姓名",
          value: ref<string | null>(null),
          clearable: true,
          placeholder: '请输入姓名',
          rule: {
            required: true,
          },
          render2: f => renderInput(f.value, {}, f),
        },
        {
          key: "password",
          label: "密码",
          value: ref<string | null>(null),
          clearable: true,
          type: 'password',
          placeholder: '请输入密码',
          render2: f => renderInput(f.value, {showPasswordOn: 'click',}, f),
        },
        {
          key: "desc",
          label: "介绍",
          placeholder: "请输入介绍",
          value: ref<string | null>(null),
          type: 'textarea',
          rows: 3,
          render2: f => renderInput(f.value, {}, f),
        },
        {
          key: "sex",
          label: "性别",
          labelField: 'label1',
          valueField: 'value1',
          value: ref<number | null>(null),
          render2: f => renderRadioGroup(f.value, [
            // @ts-ignore
            {label1: '男', value1: 0}, {label1: '女', value1: 1},
          ], {}, f),
        },
        {
          key: "favorite",
          label: "爱好",
          labelField: 'fl',
          valueField: 'fv',
          sort: 1,
          options: [
            {fl: '吃饭', fv: 0},
            {fl: '睡觉', fv: 1},
            {fl: '打豆豆', fv: 2},
          ],
          value: ref<number[]>([]),
          render2: f => renderCheckboxGroup(f.value, [], {}, f),
        },
        {
          key: "job",
          label: "职位",
          value: ref<number | null>(null),
          clearable: true,
          render2: f => renderSelect(f.value, ['前端', '后端'].map((label, value) => ({label, value})), {}, f),
        },
        {
          key: "job2",
          label: "职位2",
          value: ref<number | null>(null),
          labelField: 'l',
          valueField: 'v',
          render2: f => renderPopSelect(f.value, ['Drive My Car', 'Norwegian Wood'].map((label, index) => ({
            l: label,
            v: label
          })), {trigger: 'click'}, f),
        },
        {
          key: "job3",
          label: "职位3",
          value: ref<number | null>(null),
          valueField: 'key',
          render2: f => renderTreeSelect(f.value, [
            {
              label: 'Rubber Soul',
              key: '1',
              children: [
                {
                  label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
                  key: '1-1'
                },
                {
                  label: 'Drive My Car',
                  key: '1-2',
                  disabled: true
                },]
            }
          ], {}, f),
        },
        {
          key: "admin",
          label: "管理员？",
          value: ref<number | null>(null),
          render2: f => renderSwitch(f.value, {}, f),
        },
        {
          key: "birthday",
          label: "生日",
          value: ref<number | null>(null),
          render2: f => renderDatePicker(f.value, {type: 'datetime'}, f),
        },
        {
          key: "birthdayT",
          label: "时间",
          value: ref<number | null>(null),
          render2: f => renderTimePicker(f.value, {}, f),
        },
      ])
  const useForm = useDyForm<FormRow>(formItems)
  const getData = () => {
    console.log(useForm.getValues())
  }
  const setData = () => {
    useForm.setValues({
      username: '1111',
      password: '321321123'
    })
  }
  const setDisabled = () => {
    useForm.setDisabled(true)
  }
  const validatorData = () => {
    // 校验
    naiDynamicFormRef.value?.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
  const resetData = () => {
    useForm.onReset()
  }
</script>

<template>
  <NaiDynamicForm :items="formItems" ref="naiDynamicFormRef"/>
  <div class="controls">
    <n-button @click="getData" type="success" size="small">get Data</n-button>
    <n-button @click="setData" type="warning" size="small">set Data</n-button>
    <n-button @click="setDisabled" type="default" size="small">set Disabled</n-button>
    <n-button @click="validatorData" type="info" size="small">validate Data</n-button>
    <n-button @click="resetData" type="error" size="small">reset Data</n-button>
  </div>
</template>

<style scoped>
  .controls {
    display: flex;
    gap: 5px;
  }
</style>
```

```vue [JavaScript]
<script setup>
  import { ref } from "vue"
  import { NButton } from "naive-ui"

  import {
    NaiDynamicForm,
    renderCheckboxGroup,
    renderDatePicker,
    renderInput,
    renderPopSelect,
    renderRadioGroup,
    renderSelect,
    renderSwitch,
    renderTimePicker,
    renderTreeSelect,
  } from "dynamicformdjx/naiveUi"

  import { useDyForm, useReactiveForm } from "dynamicformdjx"

  const rules = {
    username: {
      required: true,
      message: "请输入",
      trigger: ["blur"],
    },
  }

  const naiDynamicFormRef = ref(null)

  const formItems = useReactiveForm([
    {
      key: "username",
      label: "姓名",
      value: ref(null),
      clearable: true,
      placeholder: "请输入姓名",
      rule: {
        required: true,
      },
      render2: (f) => renderInput(f.value, {}, f),
    },
    {
      key: "password",
      label: "密码",
      value: ref(null),
      clearable: true,
      type: "password",
      placeholder: "请输入密码",
      render2: (f) => renderInput(f.value, { showPasswordOn: "click" }, f),
    },
    {
      key: "desc",
      label: "介绍",
      placeholder: "请输入介绍",
      value: ref(null),
      type: "textarea",
      rows: 3,
      render2: (f) => renderInput(f.value, {}, f),
    },
    {
      key: "sex",
      label: "性别",
      labelField: "label1",
      valueField: "value1",
      value: ref(null),
      render2: (f) =>
          renderRadioGroup(
              f.value,
              [
                { label1: "男", value1: 0 },
                { label1: "女", value1: 1 },
              ],
              {},
              f
          ),
    },
    {
      key: "favorite",
      label: "爱好",
      labelField: "fl",
      valueField: "fv",
      sort: 1,
      options: [
        { fl: "吃饭", fv: 0 },
        { fl: "睡觉", fv: 1 },
        { fl: "打豆豆", fv: 2 },
      ],
      value: ref([]),
      render2: (f) => renderCheckboxGroup(f.value, [], {}, f),
    },
    {
      key: "job",
      label: "职位",
      value: ref(null),
      clearable: true,
      render2: (f) =>
          renderSelect(
              f.value,
              ["前端", "后端"].map((label, value) => ({ label, value })),
              {},
              f
          ),
    },
    {
      key: "job2",
      label: "职位2",
      value: ref(null),
      labelField: "l",
      valueField: "v",
      render2: (f) =>
          renderPopSelect(
              f.value,
              ["Drive My Car", "Norwegian Wood"].map((label) => ({
                l: label,
                v: label,
              })),
              { trigger: "click" },
              f
          ),
    },
    {
      key: "job3",
      label: "职位3",
      value: ref(null),
      valueField: "key",
      render2: (f) =>
          renderTreeSelect(
              f.value,
              [
                {
                  label: "Rubber Soul",
                  key: "1",
                  children: [
                    {
                      label: "Everybody's Got Something to Hide Except Me and My Monkey",
                      key: "1-1",
                    },
                    {
                      label: "Drive My Car",
                      key: "1-2",
                      disabled: true,
                    },
                  ],
                },
              ],
              {},
              f
          ),
    },
    {
      key: "admin",
      label: "管理员？",
      value: ref(null),
      render2: (f) => renderSwitch(f.value, {}, f),
    },
    {
      key: "birthday",
      label: "生日",
      value: ref(null),
      render2: (f) => renderDatePicker(f.value, { type: "datetime" }, f),
    },
    {
      key: "birthdayT",
      label: "时间",
      value: ref(null),
      render2: (f) => renderTimePicker(f.value, {}, f),
    },
  ])

  const useForm = useDyForm(formItems)

  const getData = () => {
    console.log(useForm.getValues())
  }

  const setData = () => {
    useForm.setValues({
      username: "1111",
      password: "321321123",
    })
  }

  const setDisabled = () => {
    useForm.setDisabled(true)
  }

  const validatorData = () => {
    naiDynamicFormRef.value?.validator().then(console.log).catch(console.log)
  }

  const resetData = () => {
    useForm.onReset()
  }
</script>

<template>
  <NaiDynamicForm :items="formItems" ref="naiDynamicFormRef" />
  <div class="controls">
    <n-button @click="getData" type="success" size="small">get Data</n-button>
    <n-button @click="setData" type="warning" size="small">set Data</n-button>
    <n-button @click="setDisabled" type="default" size="small">set Disabled</n-button>
    <n-button @click="validatorData" type="info" size="small">validate Data</n-button>
    <n-button @click="resetData" type="error" size="small">reset Data</n-button>
  </div>
</template>

<style scoped>
  .controls {
    display: flex;
    gap: 5px;
  }
</style>


```

:::

</template>
<NDyForm/>
</NaiBlock>