
<script setup lang="ts">
import { ref } from 'vue'
import { DynamicCascadeInput, type dynamicCascadeInputRef } from 'dynamicformdjx'

const test = ref({
  a: {
    b: {
      c: {
        d: {
          e: "hello world"
        }
      }
    }
  },
  aa: [5, 2, 0],
  aaa: 1314
})

const dyRef = ref<dynamicCascadeInputRef | null>(null)

const setData = () => {
  dyRef.value?.onSet({ test: 'helloWorld' })
}
</script>

<template>
  <!-- 下面是实际效果 -->
  <p>效果</p>
  <DynamicCascadeInput v-model="test" ref="dyRef" is-controller/>
  <p>结果</p>
  <pre>{{ test }}</pre>
  <div>
    <button class="rBt" @click="setData">setData {test:"helloWorld"}</button>
  </div>
</template>

<style scope>
.rBt{
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
  padding: 5px 20px;
}
</style>