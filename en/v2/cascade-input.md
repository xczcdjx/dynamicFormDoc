---
outline: deep
---

# DynamicCascadeInput
hello world


## Basic Usage

```vue [JavaScript]
<script>
  import {DynamicCascadeInput} from "dynamicformdjx-vue2";

  export default {
    name: "App",
    components: {DynamicCascadeInput},
    data(){
      return {
        dyRef:null,
        obj: {
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
        },
      }
    },
    methods: {
      setData(){
        this.$refs.dyRef.onSet({test: "helloWorld"})
      }
    }
  }
</script>

<template>
  <div>
    <DynamicCascadeInput v-model="obj" ref="dyRef" is-controller/>
    <pre>{{JSON.stringify(obj,null,2)}}</pre>
    <button @click="setData">setData helloWorld</button>
  </div>
</template>
```


<script setup>
import {useData, withBase} from 'vitepress'

const {localeIndex} = useData()
const langPrefix = () => (localeIndex.value === 'en' ? '/en' : '')

const goUrl = (hash) => withBase(`${langPrefix()}/v3/cascade-input${hash}`)
</script>
## API
>  (Props and exposed methods are the same as the Vue 3 version)
### Props
<a :href="goUrl('#props')">Go to v3 Props</a>
### Emits
<a :href="goUrl('#emits')">Go to Emits</a>
### Expose
<a :href="goUrl('#expose')">Go to Expose</a>

[//]: # (## Extra Use)