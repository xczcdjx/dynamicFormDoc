---
outline: false
aside: false
---

# ZealTemplate

使用 `EleZealCard`、`EleZealTableSearch`、`EleZealTable`、`EleZealTablePaginationControl` 和 `ElePopupModal` 组合完整的查询、分页、新增、编辑、删除页面。

## 与 Element UI

示例使用本地数据，刷新页面后恢复初始数据。新增或编辑时调用表单 `validator()`，失败返回 `false` 保持弹窗打开；成功后刷新列表。缩小窗口可查看抽屉查询和行操作下拉菜单。

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/zeal/tableZeal" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="750px"/>
</template>
<template #code>

```vue
<script>
import {
  EleDynamicForm,
  ElePopupModal,
  EleZealCard,
  EleZealTable,
  EleZealTableBtnControl,
  EleZealTablePaginationControl,
  EleZealTableSearch,
  useDecorateForm,
  useDyForm,
  usePagination
} from 'dynamicformdjx-vue2/elementUi'

const seedRows = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  ...Array.from({ length: 50 }, (_, i) => ({
    no: i + 13, title: 'test Data ' + (i + 1), length: String(i * i)
  }))
]

export default {
  name: 'componentsTest',
  components: {
    EleDynamicForm, ElePopupModal, EleZealCard, EleZealTableSearch,
    EleZealTablePaginationControl, EleZealTable, EleZealTableBtnControl
  },
  data () {
    return {
      sourceRows: seedRows.map(row => ({ ...row })),
      tableData: [],
      selectedNos: [],
      editingNo: null,
      loading: false,
      searchItems: useDecorateForm([
        { key: 'no', label: 'No', value: undefined, renderType: 'renderInputNumber',
          renderProps: { placeholder: 'Please Input' }, span: 8 },
        { key: 'title', label: 'Title', value: '', renderProps: { placeholder: 'Please Input' }, span: 8 },
        { key: 'length', label: 'Length', value: '', renderProps: { placeholder: 'Please Input' }, span: 8 }
      ]),
      editItems: useDecorateForm([
        { key: 'no', label: 'No', value: null, required: true, renderType: 'renderInputNumber' },
        { key: 'title', label: 'Title', value: '', required: true },
        { key: 'length', label: 'Length', value: '', required: true }
      ]),
      pagination: usePagination(),
      desktopColumns: [
        { type: 'selection', width: 50 },
        { prop: 'no', label: 'No', minWidth: 260 },
        { prop: 'title', label: 'Title', minWidth: 480 },
        { prop: 'length', label: 'Length', minWidth: 250 },
        { label: 'Actions', slot: 'row-actions', width: 170 }
      ],
      mobileColumns: [
        { type: 'selection', width: 40 },
        { prop: 'no', label: 'No', width: 48 },
        { prop: 'title', label: 'Title', slot: 'mobile-title', minWidth: 100 },
        { label: 'Actions', slot: 'row-actions', width: 80 }
      ]
    }
  },
  created () {
    this.pagination.layout = 'total, prev, pager, next, sizes'
    this.pagination.onChange = this.fetchData
    this.pagination.onPageSizeChange = this.fetchData
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.loading = true
      const values = useDyForm(this.searchItems).getValues()
      const rows = this.sourceRows.filter(row =>
        (values.no === null || values.no === '' || values.no === undefined || row.no === Number(values.no)) &&
        (!values.title || row.title.toLowerCase().includes(String(values.title).toLowerCase())) &&
        (!values.length || row.length.includes(String(values.length)))
      )
      const lastPage = Math.max(1, Math.ceil(rows.length / this.pagination.pageSize))
      if (this.pagination.pageNo > lastPage) this.pagination.pageNo = lastPage
      const start = (this.pagination.pageNo - 1) * this.pagination.pageSize
      this.tableData = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(rows.slice(start, start + this.pagination.pageSize))
          this.pagination.total = rows.length
        }, 1500)
      })
      this.selectedNos = []
      this.$nextTick(() => { this.loading = false })
    },
    search () {
      this.pagination.pageNo = 1
      this.fetchData()
    },
    resetSearch () {
      useDyForm(this.searchItems).setValue('no', undefined)
      this.pagination.pageNo = 1
      this.fetchData()
    },
    addItem () {
      this.editingNo = null
      useDyForm(this.editItems).setValues({
        no: Math.max(0, ...this.sourceRows.map(row => Number(row.no))) + 1,
        title: '', length: ''
      })
      this.$refs.modal.toggle(true)
    },
    editItem (row) {
      this.editingNo = row.no
      useDyForm(this.editItems).setValues(row)
      this.$refs.modal.toggle(true)
    },
    async saveItem () {
      let values
      try {
        values = await this.$refs.editForm.validator()
      } catch (error) {
        return false
      }
      const no = Number(values.no)
      if (this.sourceRows.some(row => row.no === no && row.no !== this.editingNo)) {
        this.$message.error('No 已存在')
        return false
      }
      const row = { no, title: String(values.title), length: String(values.length) }
      if (this.editingNo === null) this.sourceRows.unshift(row)
      else {
        const index = this.sourceRows.findIndex(item => item.no === this.editingNo)
        if (index !== -1) this.$set(this.sourceRows, index, row)
      }
      this.pagination.pageNo = 1
      this.fetchData()
      this.$message.success(this.editingNo === null ? 'Add successful' : 'Update successful')
      return true
    },
    deleteItem (row) {
      this.sourceRows = this.sourceRows.filter(item => item.no !== row.no)
      this.fetchData()
      this.$message.success('Delete successful')
    },
    deleteSelected () {
      this.sourceRows = this.sourceRows.filter(row => !this.selectedNos.includes(row.no))
      this.fetchData()
      this.$message.success('Delete selected successful')
    },
    onSelectionChange (rows) {
      this.selectedNos = rows.map(row => row.no)
    },
    rowActions (row) {
      return [
        { key: 'update', title: 'Update', onSelect: () => this.editItem(row) },
        { key: 'delete', title: 'Delete', type: 'danger', onSelect: () => this.deleteItem(row) }
      ]
    }
  }
}
</script>

<template>
  <main class="zeal-final">
    <EleZealCard ref="card" zeal-height="100vh" :out-padding="20">
      <template slot="header" slot-scope="scope">
        <EleZealTableSearch ref="search" title="zeal test" :is-mobile="scope.isMobile" :size="320"
                            :search-items="searchItems" @onSearch="search" @onReset="resetSearch" />
      </template>
      <template slot="controlBtn">
        <el-button type="success" size="small" @click="addItem">Add</el-button>
        <el-button type="danger" size="small" :disabled="!selectedNos.length" @click="deleteSelected">Del Selected</el-button>
      </template>
      <template slot="toolBtn">
        <el-button size="small">Tool...</el-button>
      </template>
      <template slot-scope="scope">
        <EleZealTable :data="tableData" :columns="scope.isMobile ? mobileColumns : desktopColumns"
                      :max-height="scope.tableHeight"
                      :loading="loading" :table-config="{ size: 'small' }"
                      @selection-change="onSelectionChange">
          <template slot="mobile-title" slot-scope="cell">
            <div class="mobile-song-title" :title="cell.row.title">{{ cell.row.title }}</div>
            <small class="mobile-song-length">{{ cell.row.length }}</small>
          </template>
          <template slot="row-actions" slot-scope="cell">
            <EleZealTableBtnControl :is-mobile="scope.isMobile" drop-down-text="···"
                                    :btn-items="rowActions(cell.row)" />
          </template>
          <template slot="empty"><p>No data</p></template>
        </EleZealTable>
      </template>
      <template slot="footer" slot-scope="scope">
        <EleZealTablePaginationControl :is-mobile="scope.isMobile" :pagination="pagination" />
      </template>
      <template slot="rest">
        <ElePopupModal ref="modal" :title="editingNo === null ? 'add Test' : 'update Test'"
                       :modal-props="{ customClass: 'zeal-final-dialog' }" :on-submit="saveItem">
          <EleDynamicForm ref="editForm" :items="editItems" />
        </ElePopupModal>
      </template>
    </EleZealCard>
  </main>
</template>

<style>
.zeal-final { height: 100vh; min-height: 560px; padding: 20px; box-sizing: border-box; background: #f7f8fa; }
.zeal-final .el-card { width: 100%; border-color: #e4e7ed; background: #fff; color: #303133; }
.zeal-final .el-card__header { border-bottom: 0; padding: 22px 24px 14px; }
.zeal-final .el-card__body { padding: 0 24px 16px; }
.zeal-final .eleZealTableSearch .naiTitle { font-size: 16px; font-weight: 600; color: #222; }
.zeal-final .searchForm .el-col:first-child .el-input-number { max-width: 260px; }
.zeal-final .el-table { color: #303133; }
.zeal-final .el-table th { background: #f8f8fa; }
.zeal-final .el-table--striped .el-table__body tr.el-table__row--striped td { background: #fff; }
.zeal-final .el-table__body tr:hover > td { background: #f5f7fa !important; }
@media (max-width: 756px) {
  .zeal-final { padding: 8px; }
  .zeal-final .el-card__header { padding: 16px 12px 12px; }
  .zeal-final .el-card__body { padding: 0 12px 12px; }
  .zeal-final .mobile-song-title { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .zeal-final .mobile-song-length { color: #909399; }
}
</style>

```

</template>
</BlockOther>
