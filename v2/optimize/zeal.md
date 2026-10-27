---
outline: false
aside: false
---

# 综合使用

## 与 Element UI Table 使用

通过动态表单收集查询条件，配合 Element UI 的 Table、Pagination 展示列表。本例使用本地数组模拟数据；实际项目中可将筛选和分页替换为接口请求。

输入姓名后点击查询会回到第一页，重置清空条件；切换每页条数同样回到第一页。

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/zeal" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="550px"/>
</template>
<template #code>

```vue
<script>
import { EleDynamicForm, useDecorateForm, useDyForm, usePagination } from 'dynamicformdjx-vue2/elementUi'

export default {
  name: 'ZealBase',
  components: { EleDynamicForm },
  data () {
    return {
      rows: Array.from({ length: 32 }, (_, i) => ({ id: i + 1, name: '用户 ' + (i + 1) })),
      items: useDecorateForm([{ key: 'name', label: '姓名', value: '', renderProps: { clearable: true } }]),
      keyword: '',
      pagination: usePagination(undefined, { pageSize: 5, pageSizes: [5, 10, 20] })
    }
  },
  computed: {
    filtered () { return this.rows.filter(row => row.name.includes(this.keyword)) },
    pageRows () {
      const start = (this.pagination.pageNo - 1) * this.pagination.pageSize
      return this.filtered.slice(start, start + this.pagination.pageSize)
    }
  },
  methods: {
    search () { this.keyword = useDyForm(this.items).getValue('name') || ''; this.pagination.pageNo = 1 },
    reset () { useDyForm(this.items).onReset(''); this.search() },
    resize (size) { this.pagination.pageSize = size; this.pagination.pageNo = 1 }
  }
}
</script>
<template>
  <el-card style="margin: 20px">
    <EleDynamicForm :items="items" />
    <el-button @click="search">查询</el-button>
    <el-button @click="reset">重置</el-button>
    <el-table :data="pageRows" stripe>
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="name" label="姓名" />
    </el-table>
    <el-pagination :current-page="pagination.pageNo" :page-size="pagination.pageSize"
                   :page-sizes="pagination.pageSizes" :total="filtered.length"
                   layout="total, sizes, prev, pager, next"
                   @current-change="pagination.pageNo = $event" @size-change="resize" />
  </el-card>
</template>

```

</template>
</BlockOther>
