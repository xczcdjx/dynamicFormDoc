<template>
  <el-card>
    <template #header>
      <div class="title">ElementPlus Form Table Test</div>

      <div class="search">
        <EleDynamicForm :items="searchFormItems" ref="searchDynamicFormRef" preset="grid"/>
        <div class="searchBtn">
          <el-button type="primary" size="small" @click="doSearch">Search</el-button>
          <el-button size="small" @click="doReset">Reset</el-button>
        </div>
      </div>

      <div class="controlBtn">
        <el-button type="success" size="small" @click="addItem">Add</el-button>
      </div>
    </template>

    <div class="tableScroll">
      <el-table
          v-loading="tableLoading"
          :data="pagedData"
          border
          style="min-width: 900px"
      >
        <el-table-column :prop="r.prop" :label="r.label" v-for="r in tableProps" :key="r.prop">
          <template #scope="row">
            <template v-if="r.prop!=='tags'">{{ row[r.prop] }}</template>
            <template v-else>
              <span v-if="!row.tags || row.tags.length === 0">-</span>
              <template v-else>
                <el-tag
                    v-for="t in row.tags"
                    :key="t"
                    class="tag"
                    type="info"
                    effect="plain"
                >
                  {{ t }}
                </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>

        <el-table-column label="Action" width="180" fixed="right">
          <template #default="{ row }">
              <el-button size="small" @click="upItem(row)">update</el-button>
              <el-button size="small" type="danger" @click="delItem(row)">delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
          v-model:current-page="pageModal.pageNo"
          v-model:page-size="pageModal.pageSize"
          :total="tableData.length"
          layout="total, prev, pager, next"
      />
    </div>
  </el-card>

  <el-dialog
      v-model="showModal"
      :title="referId === -1 ? 'add Item' : 'update Item'"
      width="70%"
      draggable
  >
    <EleDynamicForm :items="handleFormItems" ref="handleDynamicFormRef"/>

    <template #footer>
      <div class="fControlBtn">
        <el-button size="small" @click="formCancel">Cancel</el-button>
        <el-button type="primary" size="small" @click="formSubmit">Submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, reactive, ref} from 'vue'
import {ElMessage,ElDialog,ElPagination,ElButton,ElTable,ElTableColumn,ElCard,ElTag} from 'element-plus'
import {
  EleDynamicForm,
  type eleDynamicFormRef,
  renderInput,
  renderSelect
} from 'dynamicformdjx/elementPlus'
import {useDyForm, useReactiveForm} from 'dynamicformdjx'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
}

type PageModal = {
  pageSize: number
  pageNo: number
}
const pageModal = reactive<PageModal>({pageNo: 1, pageSize: 10})

const tableLoading = ref(false)
const showModal = ref(false)
const referId = ref<number | string>(-1)

const handleDynamicFormRef = ref<eleDynamicFormRef | null>(null)
const searchDynamicFormRef = ref<eleDynamicFormRef | null>(null)

const seedData: RowData[] = [
  {key: 0, name: 'John Brown', age: 12, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer']},
  {key: 1, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['wow']},
  {key: 2, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher']}
]
const tableProps: { label: string, prop: keyof RowData }[] = [
  {label: 'Name', prop: 'name'},
  {label: 'Age', prop: 'age'},
  {label: 'Address', prop: 'address'},
  {label: 'Tags', prop: 'tags'},
]
const tagsSelection = seedData.flatMap(it => it.tags.map(it => ({label: it, value: it})))
const tableData = ref<RowData[]>([])

const pagedData = computed(() => {
  const {pageNo, pageSize} = pageModal
  const start = (pageNo - 1) * pageSize
  return tableData.value.slice(start, start + pageSize)
})


const searchFormItems = useReactiveForm<RowData>([
  {
    key: 'name',
    label: 'Name',
    value: null,
    clearable: true,
    render2: f => renderInput(f.value, {}, f),
    span: 12
  },
  {
    key: 'age',
    label: 'Age',
    value: null,
    clearable: true,
    render2: f => renderInput(f.value, {}, f),
    span: 12
  }
])

const handleFormItems = useReactiveForm<RowData>([
  {
    key: 'name',
    label: 'Name',
    value: null,
    required: true,
    render2: f => renderInput(f.value, {}, f)
  },
  {
    key: 'age',
    label: 'Age',
    value: null,
    clearable: true,
    render2: f => renderInput(f.value, {}, f)
  },
  {
    key: 'address',
    label: 'Address',
    value: null,
    clearable: true,
    type: 'textarea',
    rows: 2,
    render2: f => renderInput(f.value, {}, f)
  },
  {
    key: 'tags',
    label: 'Tags',
    value: [],
    clearable: true,
    multiple: true,
    render2: f => renderSelect(f.value, tagsSelection, {}, f)
  }
])

const useHandleForm = useDyForm(handleFormItems)

const doSearch = () => {
  const params = (searchDynamicFormRef.value?.getResult?.() ?? {}) as any
  ElMessage.info(JSON.stringify(params))
  tableData.value = tableData.value.filter(it => it.name.includes(params.name) || it.age === parseInt(params.age))
  pageModal.pageNo = 1
}

const doReset = () => {
  searchDynamicFormRef.value?.reset?.()
  tableData.value = seedData
  pageModal.pageNo = 1
}

const addItem = () => {
  useHandleForm.onReset()
  referId.value = -1
  nextTick(() => {
    showModal.value = true
  })
}

function upItem(it: RowData) {
  referId.value = it.key
  useHandleForm.setValues(it)
  nextTick(() => {
    showModal.value = true
  })
}

function delItem(it: RowData) {
  tableData.value = tableData.value.filter(r => r.key !== it.key)
  ElMessage.success('delete successful')
}

function formCancel() {
  ElMessage.warning('cancel')
  showModal.value = false
}

async function formSubmit() {
  handleDynamicFormRef.value?.validator().then((v: any) => {
    if (referId.value === -1) {
      const newRow: RowData = {...(v as any), key: Date.now()}
      tableData.value = [...tableData.value, newRow]
      ElMessage.success('Add successful')
    } else {
      tableData.value = tableData.value.map(r =>
          r.key === referId.value ? ({...r, ...(v as any), key: r.key} as RowData) : r
      )
      ElMessage.success('Update successful')
    }

    nextTick(() => {
      showModal.value = false
    })
  })
}

async function fetchData() {
  tableLoading.value = true
  const res = await new Promise<RowData[]>(resolve => setTimeout(() => resolve(seedData), 800))
  tableData.value = [...res]
  tableLoading.value = false
}

onMounted(fetchData)
</script>

<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.search {
  margin: 10px 0;
}
.tableScroll{
  width: 100%;
  overflow-x: auto;
}
.el-table:deep(table){
  margin: 0;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.search .searchBtn {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.fControlBtn {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.tag {
  margin-right: 6px;
}
</style>
