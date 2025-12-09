---
outline: deep
---

# DynamicInput
hello world

## Basic Usage

```vue [JavaScript]
<script>
  import {DynamicInput} from "dynamicformdjx-vue2";

  export default {
    name: 'App',
    components: {DynamicInput},
    data(){
      return {
        dyRef:null,
        obj: {
          a: 'Hello world',
          b: 1314,
          c: [5, 2, 0]
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
    <DynamicInput v-model="obj" ref="dyRef" is-controller/>
    <pre>{{JSON.stringify(obj,null,2)}}</pre>
    <button @click="setData">setData helloWorld</button>
  </div>
</template>
```


## API
>  (Props and exposed methods are the same as the Vue 3 version)
### Props
[Go to v3 Props](../v3/single-input#props)

### Emits
[Go to Emits](../v3/single-input.html#emits)

### Expose
[Go to v3 Expose](../v3/single-input.html#expose)

[//]: # (## Extra Use)
