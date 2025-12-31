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
import {alertResult} from "../utils/link";


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
  alertResult(res)
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
    alertResult(data)
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