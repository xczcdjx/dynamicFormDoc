# EleDynamicForm

动态表单
> 请确保已经安装element plus (类型方法与上方naive ui一致)

## 1.简单使用

<EleBlock>
<template #code>

::: code-group

```vue [TypeScript]

<script setup lang="ts">
  import {ref} from "vue";
  import {ElButton} from "element-plus";
  import {useDyForm, useReactiveForm} from "dynamicformdjx";
  import {type eleDynamicFormRef, renderInput, renderRadioGroup, EleDynamicForm} from "dynamicformdjx/elementPlus";
  import type {PresetType} from "dynamicformdjx/types/index";

  type FormRow = {
    username: string
    password: string
    preset: PresetType
  }
  const eleDynamicFormRef = ref<eleDynamicFormRef | null>(null)
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
      span: 8
    },
    {
      key: "password",
      label: "密码",
      value: ref<string | null>(null),
      clearable: true,
      type: 'password',
      required: true,
      placeholder: '请输入密码',
      render2: f => renderInput(f.value, {showPassword: true}, f),
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
    const res = eleDynamicFormRef.value?.getResult?.()
    console.log(res)
  }
  const resetData = () => eleDynamicFormRef.value?.reset?.()
  const setData = () => useForm.setValues({
    username: 'element-plus',
    password: '520'
  })
  const validatorData = () => {
    // 校验
    eleDynamicFormRef.value?.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<template>
  <EleDynamicForm :items="formItems" ref="eleDynamicFormRef" :preset="presetType">
    <template #header>
      <h3>与Element plus结合简单表单</h3>
    </template>
    <template #footer>
      <div class="control">
        <el-button @click="getData" type="success" size="small">get Data</el-button>
        <el-button @click="setData" type="warning" size="small">set Data</el-button>
        <el-button @click="validatorData" type="default" size="small">validate Data</el-button>
        <el-button @click="resetData" type="danger" size="small">reset Data</el-button>
      </div>
    </template>
  </EleDynamicForm>
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
  import {ElButton} from "element-plus"
  import {useDyForm, useReactiveForm} from "dynamicformdjx"
  import {renderInput, renderRadioGroup, EleDynamicForm} from "dynamicformdjx/elementPlus"

  const eleDynamicFormRef = ref(null)
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
      span: 8,
    },
    {
      key: "password",
      label: "密码",
      value: ref(null),
      clearable: true,
      type: "password",
      required: true,
      placeholder: "请输入密码",
      render2: (f) => renderInput(f.value, {showPassword: true}, f),
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
    const res = eleDynamicFormRef.value?.getResult?.()
    console.log(res)
  }

  const resetData = () => eleDynamicFormRef.value?.reset?.()

  const setData = () =>
      useForm.setValues({
        username: "element-plus",
        password: "520",
      })

  const validatorData = () => {
    eleDynamicFormRef.value?.validator().then(console.log).catch(console.log)
  }
</script>

<template>
  <EleDynamicForm :items="formItems" ref="eleDynamicFormRef" :preset="presetType">
    <template #header>
      <h3>与Element plus结合简单表单</h3>
    </template>
    <template #footer>
      <div class="control">
        <el-button @click="getData" type="success" size="small">get Data</el-button>
        <el-button @click="setData" type="warning" size="small">set Data</el-button>
        <el-button @click="validatorData" type="default" size="small">validate Data</el-button>
        <el-button @click="resetData" type="danger" size="small">reset Data</el-button>
      </div>
    </template>
  </EleDynamicForm>
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
<ESimpleDyForm/>
</EleBlock>

## 2.自定义使用

> (所有render2函数使用自定义)

### InputTest.vue

```vue [Typescript]

<script setup lang="ts">
  import {ElInput} from "element-plus";
  import {useAttrs} from "vue";

  const fv = defineModel()
  const attrs = useAttrs()
</script>

<template>
  <el-input v-model="fv" v-bind="attrs"/>
</template>

<style scoped>

</style>
```

### Render.vue

<EleBlock>
<template #code>

::: code-group

```vue [TypeScript]

<script setup lang="ts">
  import {h, ref} from "vue";
  import {ElButton, ElInput} from "element-plus";
  import {useDyForm, useReactiveForm} from "dynamicformdjx";
  import {
    type eleDynamicFormRef,
    type eleDynamicInputRef,
    EleDynamicForm,
    EleDynamicInput
  } from "dynamicformdjx/elementPlus";
  import type {FormItemRule, FormRules} from "element-plus";
  import EInputTest from "./eInputTest.vue";

  type FormRow = {
    name: string
    desc: string
    json: object
  }
  const eleDynamicFormRef = ref<eleDynamicFormRef | null>(null)
  const eleDynamicInputRef = ref<eleDynamicInputRef | null>(null)
  const formItems = useReactiveForm<FormRow, FormRules | FormItemRule>([
    {
      key: "name",
      label: "姓名",
      value: null,
      clearable: true,
      placeholder: '请输入姓名',
      required: true,
      render2: f => {
        const {value, ...restF} = f
        return h(ElInput, {
          ...restF,
          modelValue: f.value.value, "onUpdate:modelValue"(v) {
            f.value.value = v
          }
        })
      },
    },
    {
      key: "desc",
      label: "描述",
      value: ref<string | null>(null),
      clearable: true,
      placeholder: '请输入描述',
      required: true,
      type: 'textarea',
      render2: f => h(EInputTest, {
        ...f,
        value: f.value.value, "onUpdate:value"(v) {
          f.value.value = v
        }
      }),
    },
    {
      key: "json",
      label: "Json",
      value: {},
      rule: {
        required: true,
        validator(rule: any, value: any, callback: any) {
          return Object.keys(value).length > 0
        },
        trigger: 'blur',
        message: 'json 不能为空'
      },
      render2: f => h(EleDynamicInput, {
        modelValue: f.value.value, "onUpdate:modelValue"(v) {
          f.value.value = v
        },
        isController: true,
        ref: eleDynamicInputRef
      }),
    },
  ])
  const useForm = useDyForm<FormRow>(formItems)
  const getData = () => {
    console.log(useForm.getValues())
  }
  const resetData = () => {
    useForm.onReset()
    eleDynamicInputRef.value?.onSet({})
  }
  const setData = () => {
    useForm.setValues({
      name: 'Element Plus',
      desc: `A Vue 3 based component library for designers and developers`
    })
    eleDynamicInputRef.value?.onSet?.({
      question: 'how are you?',
      answer: "I'm fine,Thank you"
    })
  }
  const validatorData = () => {
    // 校验
    eleDynamicFormRef.value.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<template>
  <EleDynamicForm :items="formItems" ref="eleDynamicFormRef"/>
  <div class="control">
    <el-button @click="getData" type="success" size="small">get Data</el-button>
    <el-button @click="setData" type="warning" size="small">set Data</el-button>
    <el-button @click="validatorData" type="default" size="small">validate Data</el-button>
    <el-button @click="resetData" type="danger" size="small">reset Data</el-button>
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
  import { ElButton, ElInput } from "element-plus"
  import { useDyForm, useReactiveForm } from "dynamicformdjx"
  import { EleDynamicForm, EleDynamicInput } from "dynamicformdjx/elementPlus"
  import EInputTest from "./eInputTest.vue"

  const eleDynamicFormRef = ref(null)
  const eleDynamicInputRef = ref(null)

  const formItems = useReactiveForm([
    {
      key: "name",
      label: "姓名",
      value: null,
      clearable: true,
      placeholder: "请输入姓名",
      required: true,
      render2: (f) => {
        const { value, ...restF } = f
        return h(ElInput, {
          ...restF,
          modelValue: f.value.value,
          "onUpdate:modelValue"(v) {
            f.value.value = v
          },
        })
      },
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
          h(EInputTest, {
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
      value: {},
      rule: {
        required: true,
        validator(rule, value, callback) {
          return Object.keys(value).length > 0
        },
        trigger: "blur",
        message: "json 不能为空",
      },
      render2: (f) =>
          h(EleDynamicInput, {
            modelValue: f.value.value,
            "onUpdate:modelValue"(v) {
              f.value.value = v
            },
            isController: true,
            ref: eleDynamicInputRef,
          }),
    },
  ])

  const useForm = useDyForm(formItems)

  const getData = () => {
    console.log(useForm.getValues())
  }

  const resetData = () => {
    useForm.onReset()
    eleDynamicInputRef.value?.onSet({})
  }

  const setData = () => {
    useForm.setValues({
      name: "Element Plus",
      desc: `A Vue 3 based component library for designers and developers`,
    })
    eleDynamicInputRef.value?.onSet?.({
      question: "how are you?",
      answer: "I'm fine,Thank you",
    })
  }

  const validatorData = () => {
    eleDynamicFormRef.value.validator().then(console.log).catch(console.log)
  }
</script>

<template>
  <EleDynamicForm :items="formItems" ref="eleDynamicFormRef" />
  <div class="control">
    <el-button @click="getData" type="success" size="small">get Data</el-button>
    <el-button @click="setData" type="warning" size="small">set Data</el-button>
    <el-button @click="validatorData" type="default" size="small">validate Data</el-button>
    <el-button @click="resetData" type="danger" size="small">reset Data</el-button>
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
<ECustomDyForm/>
</EleBlock>

## 3.装饰表单
> (可省略render2函数)

<EleBlock>
<template #code>

::: code-group

```vue [TypeScript]
<script setup lang="ts">
  import {ref} from "vue";
  import {ElButton} from "element-plus";
  import {useDyForm} from "dynamicformdjx";
  import {
    type eleDynamicFormRef,
    EleDynamicForm,
    useDecorateForm,
    renderDatePicker
  } from "dynamicformdjx/elementPlus";

  type FormRow = {
    password: string
    job: number
    birthday: number | Date
  }
  const eleDynamicFormRef = ref<eleDynamicFormRef | null>(null)
  const formItems = useDecorateForm<FormRow>([
    {
      key: "password",
      label: "密码",
      value: null,
      clearable: true,
      placeholder: '请输入密码',
      required: true,
      type: 'password',
      renderType: 'renderInput',
      renderProps: {
        showPassword: 'click'
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
    const res = eleDynamicFormRef.value?.getResult?.()
    console.log(res)
  }
  const resetData = () => eleDynamicFormRef.value?.reset?.()
  const setData = () => useForm.setValues({
    password: 'element-plus',
    job: 0,
    birthday: new Date(),
  })
  const validatorData = () => {
    // 校验
    eleDynamicFormRef.value?.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<template>
  <EleDynamicForm :items="formItems" ref="eleDynamicFormRef"/>
  <div class="control">
    <el-button @click="getData" type="success" size="small">get Data</el-button>
    <el-button @click="setData" type="warning" size="small">set Data</el-button>
    <el-button @click="validatorData" type="default" size="small">validate Data</el-button>
    <el-button @click="resetData" type="danger" size="small">reset Data</el-button>
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
  import { ElButton } from "element-plus"
  import { useDyForm } from "dynamicformdjx"
  import { EleDynamicForm, useDecorateForm, renderDatePicker } from "dynamicformdjx/elementPlus"

  const eleDynamicFormRef = ref(null)

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
        showPassword: "click",
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
    const res = eleDynamicFormRef.value?.getResult?.()
    console.log(res)
  }

  const resetData = () => eleDynamicFormRef.value?.reset?.()

  const setData = () =>
      useForm.setValues({
        password: "element-plus",
        job: 0,
        birthday: new Date(),
      })

  const validatorData = () => {
    eleDynamicFormRef.value?.validator().then(console.log).catch(console.log)
  }
</script>

<template>
  <EleDynamicForm :items="formItems" ref="eleDynamicFormRef" />
  <div class="control">
    <el-button @click="getData" type="success" size="small">get Data</el-button>
    <el-button @click="setData" type="warning" size="small">set Data</el-button>
    <el-button @click="validatorData" type="default" size="small">validate Data</el-button>
    <el-button @click="resetData" type="danger" size="small">reset Data</el-button>
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
<EDecorateDyForm/>
</EleBlock>

## 4.总表单
> 所有render2函数从"dynamicformdjx/elementPlus"中导入

<NaiBlock>
<template #code>

::: code-group

```vue [TypeScript]

<script setup lang="ts">
  import {ref} from "vue";
  import {useDyForm, useReactiveForm} from "dynamicformdjx";
  import {
    type eleDynamicFormRef, EleDynamicForm, renderInput, renderCheckboxGroup, renderDatePicker,
    renderPopSelect,
    renderRadioGroup,
    renderSelect, renderSwitch, renderTimePicker, renderTreeSelect, renderInputNumber,
    renderDynamicTags,
    renderCheckbox,
    renderSlider
  } from "dynamicformdjx/elementPlus";
  import type {FormItemRule, FormRules} from "element-plus";

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
    future: any[]
    slider: number
    checkbox: boolean
    inputNumber: number
  }
  const rules: FormRules<FormRow> = {
    username: {
      required: true,
      message: '请输入',
      trigger: 'blur'
    },
  }
  const eleDynamicFormRef = ref<eleDynamicFormRef | null>(null)
  const formItems = useReactiveForm<FormRow, FormRules | FormItemRule>([
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
        {label1: '男', value1: 0},
        {label1: '女', value1: 1},
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
      value: ref<Date>(new Date()),
      render2: f => renderDatePicker(f.value, {type: 'datetime'}, f),
    },
    {
      key: "birthdayT",
      label: "时间",
      value: ref<Date>(new Date()),
      render2: f => renderTimePicker(f.value, {}, f),
    },
    {
      key: "future",
      label: "未来",
      labelField: 'label',
      valueField: 'value',
      value: ref([
        {label: '你没见过不等于没有', value: 'hello world 1'},
        {
          label: '不要给自己设限',
          value: 'hello world 2'
        },
        {
          label: '不要说连升两级',
          value: 'hello world 3'
        },
        {
          label: '直接升到 CEO 都是有可能的',
          value: 'hello world 4'
        }
      ]),
      render2: f => {
        const {value, ...restF} = f as any
        return renderDynamicTags(f.value, {tagType: 'primary'}, restF)
      }
    },
    {
      key: "checkbox",
      label: "复选",
      value: ref<boolean | null>(null),
      render2: f => renderCheckbox(f.value, {}, f),
    },
    {
      key: "slider",
      label: "滑块",
      value: ref<number | number[]>(0),
      render2: f => renderSlider(f.value, {}, f),
    },
    {
      key: "inputNumber",
      label: "滑块",
      value: ref<number | null>(0),
      render2: f => renderInputNumber(f.value, {}, f),
    },
  ])
  const useForm = useDyForm<FormRow>(formItems)
  const getData = () => {
    console.log(useForm.getValues())
  }
  const resetData = () => {
    useForm.onReset()
  }
  const setData = () => {
    useForm.setValues({
      username: '1111',
      password: '321321123'
    })
  }
  const validatorData = () => {
    // 校验
    eleDynamicFormRef.value.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<template>
  <EleDynamicForm :items="formItems" ref="eleDynamicFormRef" :rules="rules"/>
  <div class="control">
    <el-button @click="getData" type="success" size="small">get Data</el-button>
    <el-button @click="setData" type="warning" size="small">set Data</el-button>
    <el-button @click="validatorData" type="default" size="small">validate Data</el-button>
    <el-button @click="resetData" type="danger" size="small">reset Data</el-button>
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
  import {ref} from "vue";
  import {useDyForm, useReactiveForm} from "dynamicformdjx";
  import {
    EleDynamicForm,
    renderInput,
    renderCheckboxGroup,
    renderDatePicker,
    renderPopSelect,
    renderRadioGroup,
    renderSelect,
    renderSwitch,
    renderTimePicker,
    renderTreeSelect,
    renderInputNumber,
    renderDynamicTags,
    renderCheckbox,
    renderSlider
  } from "dynamicformdjx/elementPlus";

  const rules = {
    username: {
      required: true,
      message: '请输入',
      trigger: 'blur'
    },
  }
  const eleDynamicFormRef = ref(null)
  const formItems = useReactiveForm([
    {
      key: "username",
      label: "姓名",
      value: ref(null),
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
      value: ref(null),
      clearable: true,
      type: 'password',
      placeholder: '请输入密码',
      render2: f => renderInput(f.value, {showPassword: true,}, f),
    },
    {
      key: "desc",
      label: "介绍",
      placeholder: "请输入介绍",
      value: ref(null),
      type: 'textarea',
      rows: 3,
      render2: f => renderInput(f.value, {}, f),
    },
    {
      key: "sex",
      label: "性别",
      labelField: 'label1',
      valueField: 'value1',
      value: ref(null),
      render2: f => renderRadioGroup(f.value, [
        {label1: '男', value1: 0},
        {label1: '女', value1: 1},
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
      value: ref([]),
      render2: f => renderCheckboxGroup(f.value, [], {}, f),
    },
    {
      key: "job",
      label: "职位",
      value: ref(null),
      clearable: true,
      render2: f => renderSelect(f.value, ['前端', '后端'].map((label, value) => ({label, value})), {}, f),
    },
    {
      key: "job2",
      label: "职位2",
      value: ref(null),
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
      value: ref(null),
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
      value: ref(null),
      render2: f => renderSwitch(f.value, {}, f),
    },
    {
      key: "birthday",
      label: "生日",
      value: ref(new Date()),
      render2: f => renderDatePicker(f.value, {type: 'datetime'}, f),
    },
    {
      key: "birthdayT",
      label: "时间",
      value: ref(new Date()),
      render2: f => renderTimePicker(f.value, {}, f),
    },
    {
      key: "future",
      label: "未来",
      labelField: 'label',
      valueField: 'value',
      value: ref([
        {label: '你没见过不等于没有', value: 'hello world 1'},
        {
          label: '不要给自己设限',
          value: 'hello world 2'
        },
        {
          label: '不要说连升两级',
          value: 'hello world 3'
        },
        {
          label: '直接升到 CEO 都是有可能的',
          value: 'hello world 4'
        }
      ]),
      render2: f => {
        const {value, ...restF} = f
        return renderDynamicTags(f.value, {tagType: 'primary'}, restF)
      }
    },
    {
      key: "checkbox",
      label: "复选",
      value: ref(null),
      render2: f => renderCheckbox(f.value, {}, f),
    },
    {
      key: "slider",
      label: "滑块",
      value: ref(0),
      render2: f => renderSlider(f.value, {}, f),
    },
    {
      key: "inputNumber",
      label: "滑块",
      value: ref(0),
      render2: f => renderInputNumber(f.value, {}, f),
    },
  ])
  const useForm = useDyForm(formItems)
  const getData = () => {
    console.log(useForm.getValues())
  }
  const resetData = () => {
    useForm.onReset()
  }
  const setData = () => {
    useForm.setValues({
      username: '1111',
      password: '321321123'
    })
  }
  const validatorData = () => {
    // 校验
    eleDynamicFormRef.value?.validator().then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<template>
  <EleDynamicForm :items="formItems" ref="eleDynamicFormRef" :rules="rules"/>
  <div class="control">
    <el-button @click="getData" type="success" size="small">get Data</el-button>
    <el-button @click="setData" type="warning" size="small">set Data</el-button>
    <el-button @click="validatorData" type="default" size="small">validate Data</el-button>
    <el-button @click="resetData" type="danger" size="small">reset Data</el-button>
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
<EDyForm/>
</NaiBlock>