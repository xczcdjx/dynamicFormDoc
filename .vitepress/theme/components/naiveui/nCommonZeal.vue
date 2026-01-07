<template>
  <n-card>
    <template #header>
      <div class="title">Nai Form Table Test</div>
      <div class="search">
        <NaiDynamicForm :items="searchFormItems" ref="searchDynamicFormRef" preset="grid"/>
        <div class="searchBtn">
          <n-button type="info" size="small" @click="doSearch">Search</n-button>
          <n-button size="small" @click="doReset">Reset</n-button>
        </div>
      </div>
      <div class="controlBtn">
        <n-button type="success" size="small" @click="addItem">Add</n-button>
      </div>
    </template>
    <n-data-table
        :scroll-x="800"
        :single-line="false"
        :columns="columns"
        :data="pagedData"
        :loading="tableLoading"
    />
    <template #footer>
      <div class="pagination">
        <n-pagination v-model:page="pageModal.pageNo"
                      v-model:page-size="pageModal.pageSize"
                      :item-count="tableData.length">
          <template #prefix="{ itemCount }">
            Total {{ itemCount }}
          </template>
        </n-pagination>
      </div>
    </template>
  </n-card>
  <div class="update">
    <n-modal v-model:show="showModal" :title="referId==='-1'?'add Item':'update Item'" preset="card" draggable
             :style="{width:'70%'}">
      <NaiDynamicForm :items="handleFormItems" ref="handleDynamicFormRef"/>
      <template #footer>
        <div class="fControlBtn">
          <n-button size="small" @click="formCancel">Cancel</n-button>
          <n-button type="info" size="small" @click="formSubmit">Submit</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {type DataTableColumns, NSpace} from 'naive-ui'
import {NButton, NTag, NCard, NPagination, NDataTable, NModal, useMessage} from 'naive-ui'
import {computed, h, nextTick, onMounted, reactive, ref} from 'vue'
import {NaiDynamicForm, type naiDynamicFormRef, renderInput, renderSelect} from "dynamicformdjx/naiveUi";
import {useDyForm, useReactiveForm} from "dynamicformdjx";

const message = useMessage()

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
const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 12,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['wow']
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
const tagsSelection = data.flatMap(it => it.tags.map(it => ({label: it, value: it})))
const columns: DataTableColumns<RowData> = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    render(row) {
      if (row.tags === null) return h('div', {}, '-')
      const tags = row.tags.map((tagKey) => {
        return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info',
              bordered: false
            },
            {
              default: () => tagKey
            }
        )
      })
      return tags
    }
  },
  {
    title: 'Action',
    key: 'actions',
    fixed:'right',
    render(row) {
      return h(
          NSpace, {}, [
            h(NButton,
                {
                  size: 'small',
                  onClick: () => upItem(row)
                },
                {default: () => 'update'}),
            h(NButton,
                {
                  size: 'small',
                  type: 'error',
                  onClick: () => delItem(row)
                },
                {default: () => 'delete'})
          ]
      )
    }
  }
]
const tableData = ref<RowData[]>([])
const tableLoading = ref<boolean>(false)
const showModal = ref<boolean>(false)
const referId = ref<string | number>('-1')
const pageModal = reactive<PageModal>({pageNo: 1, pageSize: 10})
const handleDynamicFormRef = ref<naiDynamicFormRef | null>(null)
const searchDynamicFormRef = ref<naiDynamicFormRef | null>(null)
const pagedData = computed(() => {
  const {pageNo, pageSize} = pageModal
  const start = (pageNo - 1) * pageSize
  return tableData.value.slice(start, start + pageSize)
})
const searchFormItems = useReactiveForm<RowData>([
  {
    key: "name",
    label: "Name",
    value: null,
    clearable: true,
    render2: f => renderInput(f.value, {}, f),
    span: 12
  },
  {
    key: "age",
    label: "Age",
    value: null,
    clearable: true,
    render2: f => renderInput(f.value, {}, f),
    span: 12
  },
])
const handleFormItems = useReactiveForm<RowData>([
  {
    key: "name",
    label: "Name",
    value: null,
    required: true,
    render2: f => renderInput(f.value, {}, f),
  },
  {
    key: "age",
    label: "Age",
    value: null,
    clearable: true,
    render2: f => renderInput(f.value, {}, f),
  },
  {
    key: "address",
    label: "Address",
    value: null,
    clearable: true,
    type: 'textarea',
    rows: 2,
    render2: f => renderInput(f.value, {}, f),
  },
  {
    key: "tags",
    label: "Tags",
    value: [],
    clearable: true,
    multiple: true,
    render2: f => renderSelect(f.value, tagsSelection, {}, f),
  },
])
const useHandleForm = useDyForm(handleFormItems)
const doSearch = () => {
  const params = searchDynamicFormRef.value?.getResult?.() as any
  message.info(JSON.stringify(params))
  tableData.value = tableData.value.filter(it => it.name.includes(params.name) || it.age === parseInt(params.age))
  pageModal.pageNo = 1
}
const doReset = () => {
  searchDynamicFormRef.value?.reset?.()
  tableData.value = data
  pageModal.pageNo = 1
}
const addItem = () => {
  useHandleForm.onReset()
  referId.value = '-1'
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
  tableData.value = tableData.value.filter(it2 => it2.key !== it.key)
  message.success('delete successful')
}

function formCancel() {
  message.warning('cancel')
  showModal.value = false
}

async function formSubmit() {
  // const data = useHandleForm.getValues()
  console.log(referId.value)
  handleDynamicFormRef.value?.validator().then((v: any) => {
    if (referId.value === '-1') {
      tableData.value.push({...v, key: Date.now()})
      message.success('Add successful')
    } else {
      tableData.value = tableData.value.map(it => {
        if (referId.value === it.key) return v as RowData
        return it
      })
      message.success('Update successful')
    }
    nextTick(() => {
      showModal.value = false
      // fetchData()
    })
  })
}

async function fetchData() {
  tableLoading.value = true
  const res = await new Promise((resolve, reject) => setTimeout(() => resolve(data), 1000))
  tableData.value = res as RowData[]
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

.pagination {
  display: flex;
  justify-content: center;
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
</style>