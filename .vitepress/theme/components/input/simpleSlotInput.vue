<script setup>
import {ref} from 'vue'
import {DynamicInput} from 'dynamicformdjx'
const test = ref({
  a: 'Hello world',
  b: 1314,
  c: [5, 2, 0]
})
</script>

<template>
  <DynamicInput v-model="test" ref="dyRef" is-controller>
    <template #newBtn="{newItem}">
      <button @click="newItem">新</button>
    </template>
    <template #resetBtn="{reset}">
      <button @click="reset">重置</button>
    </template>
    <template #mergeBtn="{merge}">
      <button @click="merge">合并</button>
    </template>
    <template #typeTools="{row,toggleArray,toggleNumber}">
      <button @click="toggleArray" :class="row.isArray?'act':''">Array</button>&nbsp;
      <button @click="toggleNumber" :class="row.isNumber?'act':''">Number</button>
    </template>
    <template #rowActions="{isLast,addItem,removeItem}">
      <button @click="addItem" :disabled="!isLast">+</button>
      <button @click="removeItem">-</button>
    </template>
  </DynamicInput>
</template>
<style scoped>
.act{
  background: skyblue;
}
</style>