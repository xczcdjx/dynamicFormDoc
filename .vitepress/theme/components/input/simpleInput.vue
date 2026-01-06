<script setup lang="ts">
import {ref} from 'vue'
import {DynamicInput, type dynamicInputRef} from 'dynamicformdjx'

const test = ref<{ a: string; b: number; c: number[] }>({
  a: 'Hello world',
  b: 1314,
  c: [5, 2, 0]
})

const dyRef = ref<dynamicInputRef | null>(null)

const setData = () => {
  dyRef.value?.onSet?.({test: 'helloWorld'})
}
</script>

<template>
  <DynamicInput v-model="test" ref="dyRef"/>
  <pre>{{ test }}</pre>
  <div>
    <button @click="setData">setData</button>
  </div>
</template>