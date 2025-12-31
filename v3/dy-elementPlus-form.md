# EleDynamicForm

动态表单
> 请确保已经安装element plus (类型方法与上方naive ui一致)
## 1.简单使用
<DemoBlock>
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
</DemoBlock>



## 2.自定义,装饰可以参考naive ui的方法使用，文档后期完善