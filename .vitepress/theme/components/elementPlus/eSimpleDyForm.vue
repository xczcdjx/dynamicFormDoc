<script setup lang="ts">
import {ref} from "vue";
import {NButton} from "naive-ui";
import {useDyForm, useReactiveForm} from "dynamicformdjx";
import {type naiDynamicFormRef, NaiDynamicForm, renderInput, renderRadioGroup} from "dynamicformdjx/naiveUi";
import type {PresetType} from "dynamicformdjx/types/index";
import {alertResult} from "../utils/link";

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
    requiredHint:l=>`${l} is not empty`
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
  const res = naiDynamicFormRef.value?.getResult?.()
  alertResult(res)
}
const resetData = () => naiDynamicFormRef.value?.reset?.()
const setData = () => useForm.setValues({
    username: 'naive-ui',
    password: '520'})

const validatorData = () => {
  // 校验
  naiDynamicFormRef.value?.validator().then(data => {
    alertResult(data)
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
h3{
  text-align: center;
  margin:0 0 10px 0;
}
.control {
  display: flex;
  gap: 5px;
}
</style>