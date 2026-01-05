---
outline: deep
---

# DynamicInput
动态录入

## 基本使用

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
>  (属性及方法参数与vue3版本一致)
### Props
[跳到 v3 Props](../v3/single-input#props)

### Emits
[跳到 v3 Emits](../v3/single-input.html#emits)

### Expose
[跳到 v3 Expose](../v3/single-input.html#expose)

[//]: # (## Extra Use)
