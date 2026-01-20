---
outline: false
aside: false
---

# ZealTemplate

Use the provided wrapper components, such as `ZealCard`, `ZealTableSearch`, `ZealTablePaginationControl`, `PopupModal`,
and `EleZealTable`.

## With Naive ui

<NaiBlock>
<template #code>
<details>
<summary>code</summary>

::: code-group

```vue [TypeScript]

<script setup lang="ts">
  import {h, nextTick, onMounted, ref} from "vue";
  import {type DataTableColumnKey, type DataTableColumns, NButton, NDataTable, NSpace, useMessage} from "naive-ui";
  import {
    NaiPopupModal,
    useDecorateForm,
    NaiZealCard,
    NaiDynamicForm,
    NaiZealTableSearch,
    NaiZealTablePaginationControl,
    renderInput,
    renderInputNumber,
  } from "dynamicformdjx/naiveUi";
  import type {
    naiPopupModalRef,
    naiDynamicFormRef,
    naiZealTableSearchRef
  } from "dynamicformdjx/naiveUi"
  import {useDyForm, useReactiveForm, usePagination} from "dynamicformdjx";

  interface SongType {
    no: number | string
    title: string
    length: string
  }

  const zealData = ref<SongType[]>([
    {no: 3, title: 'Wonderwall', length: '4:18'},
    {no: 4, title: 'Don\'t Look Back in Anger', length: '4:48'},
    {no: 12, title: 'Champagne Supernova', length: '7:27'},
    ...Array.from({length: 50}).map((_, i) => ({no: i + 13, title: `test Data ${i + 1}`, length: `${i * i}`}))
  ])
  const message = useMessage()
  const referId = ref<string | number>('-1')
  const tableData = ref<SongType[]>([])
  const handleDynamicFormRef = ref<naiDynamicFormRef | null>(null)
  const naiZealTableSearchRef = ref<naiZealTableSearchRef | null>(null)
  const naiPopupModalRef = ref<naiPopupModalRef | null>(null)
  const tableLoading = ref<boolean>(false)
  const selectOpts = ref<(number | string)[]>([])
  // search form
  const searchFormItems = useDecorateForm([
    {
      key: "no",
      label: "No",
      renderType: 'renderInputNumber',
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "length",
      label: "Length",
    },
  ].map(it => ({
    value: null,
    clearable: true,
    renderType: 'renderInput',
    span: 8,
    ...it,
  })) as any[])
  // table column
  const columns: DataTableColumns<SongType> = [
    {
      type: 'selection'
    },
    {
      title: 'No',
      key: 'no'
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Length',
      key: 'length'
    },
    {
      title: 'Action',
      key: 'actions',
      fixed: 'right',
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
  const pagination = usePagination(fetchData)
  const updateFormItems = useReactiveForm<SongType>([
    {
      key: "no",
      label: "No",
      clearable: true,
      value: null,
      render2: (f) => renderInputNumber(f.value, {}, f)
    },
    {
      key: "title",
      label: "Title",
      value: null,
      clearable: true,
      render2: (f) => renderInput(f.value, {}, f),
    },
    {
      key: "length",
      label: "Length",
      value: null,
      clearable: true,
      render2: (f) => renderInput(f.value, {}, f),
    },
  ])
  const useForm = useDyForm(updateFormItems)
  const doSearch = () => {
    fetchData()
    pagination.pageNo = 1
  }
  const doReset = () => {
    fetchData()
    pagination.pageNo = 1
  }

  function rowKey(row: SongType) {
    return row.no
  }

  // mock http request
  async function fetchData() {
    tableLoading.value = true
    const {pageNo, pageSize} = pagination
    const params = naiZealTableSearchRef.value?.getParams<SongType>?.()
    const r = await new Promise<{ data: SongType[], total: number }>((resolve, reject) => {
      setTimeout(() => {
        const start = (pageNo - 1) * pageSize
        const {length, no, title} = params!
        const data = zealData.value.filter(it => (!length || it.length.includes(length)) && (!title || it.title.includes(title)) && (!no || it.no === parseInt(no as string)))
        resolve({
          data: data.slice(start, start + pageSize),
          total: data.length
        })
      }, 1500)
    })
    tableData.value = r.data
    pagination.setTotalSize(r.total)
    tableLoading.value = false
  }

  const newItem = () => {
    referId.value = '-1'
    useForm.onReset()
    nextTick(() => {
      naiPopupModalRef.value?.toggle?.(true)
    })
  }

  function upItem(r: SongType) {
    referId.value = r.no
    useForm.setValues(r)
    nextTick(() => {
      naiPopupModalRef.value?.toggle?.(true)
    })
  }

  function delItem(r: SongType) {
    zealData.value = zealData.value.filter(it2 => it2.no !== r.no)
    message.success('delete successful')
    fetchData()
  }

  const deleteAll = () => {
    zealData.value = zealData.value.filter(it2 => !selectOpts.value.includes(it2.no))
    message.success('delete all successful')
    fetchData()
  }
  const onSubmit = async () => {
    handleDynamicFormRef.value?.validator().then((v: any) => {
      if (referId.value === '-1') {
        zealData.value.unshift({...v, key: Date.now()})
        message.success('Add successful')
      } else {
        zealData.value = zealData.value.map(it => {
          if (referId.value === it.no) return v as SongType
          return it
        })
        message.success('Update successful')
      }
      nextTick(() => {
        naiPopupModalRef.value?.toggle?.(false)
        fetchData()
      })
    })
  }
  const handleSelectionChange = (v: DataTableColumnKey[]) => {
    selectOpts.value = v
  }
  onMounted(() => {
    fetchData()
  })
</script>

<template>
  <NaiZealCard>
    <template #header="{isMobile}">
      <NaiZealTableSearch :isMobile="isMobile" :search-items="searchFormItems" ref="naiZealTableSearchRef"
                          :mobile-drawer="true"
                          title="zeal test" @onReset="doReset"
                          @onSearch="doSearch"/>
    </template>
    <template #controlBtn>
      <n-button type="success" size="small" @click="newItem">Add</n-button>&nbsp;
      <n-button type="error" size="small" @click="deleteAll" :disabled="!selectOpts.length">Del Selected</n-button>
    </template>
    <template #toolBtn>
      <n-button type="default" size="small" @click="()=>{}">
        Tool...
      </n-button>
    </template>
    <template #default="{tableHeight}">
      <n-data-table
          :row-key="rowKey"
          :loading="tableLoading"
          :columns="columns"
          :data="tableData"
          :bordered="false"
          :style="{ height: tableHeight+'px'}"
          :flex-height="true"
          :scroll-x="600"
          @update:checked-row-keys="handleSelectionChange"
      />
    </template>
    <template #footer="{isMobile}">
      <NaiZealTablePaginationControl :is-mobile="isMobile" :pagination="pagination">
        <template #prefix="{ itemCount }">
          Total {{ itemCount }}
        </template>
      </NaiZealTablePaginationControl>
    </template>
    <template #rest>
      <NaiPopupModal :title="referId==='-1'?'add Test':'update Test'" ref="naiPopupModalRef" :on-submit="onSubmit">
        <NaiDynamicForm :items="updateFormItems" ref="handleDynamicFormRef"/>
      </NaiPopupModal>
    </template>
  </NaiZealCard>
</template>

<style scoped>

</style>
```

```vue [JavaScript]

<script setup>
  import {h, nextTick, onMounted, ref} from "vue";
  import {NButton, NDataTable, NSpace, useMessage} from "naive-ui";
  import {
    NaiPopupModal,
    useDecorateForm,
    NaiZealCard,
    NaiDynamicForm,
    NaiZealTableSearch,
    NaiZealTablePaginationControl,
    renderInput,
    renderInputNumber,
  } from "dynamicformdjx/naiveUi";
  import {useDyForm, useReactiveForm, usePagination} from "dynamicformdjx";

  const zealData = ref([
    {no: 3, title: "Wonderwall", length: "4:18"},
    {no: 4, title: "Don't Look Back in Anger", length: "4:48"},
    {no: 12, title: "Champagne Supernova", length: "7:27"},
    ...Array.from({length: 50}).map((_, i) => ({
      no: i + 13,
      title: `test Data ${i + 1}`,
      length: `${i * i}`,
    })),
  ]);

  const message = useMessage();
  const referId = ref("-1");
  const tableData = ref([]);
  const handleDynamicFormRef = ref(null);
  const naiZealTableSearchRef = ref(null);
  const naiPopupModalRef = ref(null);
  const tableLoading = ref(false);
  const selectOpts = ref([]);

  // search form
  const searchFormItems = useDecorateForm(
      [
        {
          key: "no",
          label: "No",
          renderType: "renderInputNumber",
        },
        {
          key: "title",
          label: "Title",
        },
        {
          key: "length",
          label: "Length",
        },
      ].map((it) => ({
        value: null,
        clearable: true,
        renderType: "renderInput",
        span: 8,
        ...it,
      }))
  );

  // table column
  const columns = [
    {
      type: "selection",
    },
    {
      title: "No",
      key: "no",
    },
    {
      title: "Title",
      key: "title",
    },
    {
      title: "Length",
      key: "length",
    },
    {
      title: "Action",
      key: "actions",
      fixed: "right",
      render(row) {
        return h(NSpace, {}, [
          h(
              NButton,
              {
                size: "small",
                onClick: () => upItem(row),
              },
              {default: () => "update"}
          ),
          h(
              NButton,
              {
                size: "small",
                type: "error",
                onClick: () => delItem(row),
              },
              {default: () => "delete"}
          ),
        ]);
      },
    },
  ];

  const pagination = usePagination(fetchData);

  const updateFormItems = useReactiveForm([
    {
      key: "no",
      label: "No",
      clearable: true,
      value: null,
      render2: (f) => renderInputNumber(f.value, {}, f),
    },
    {
      key: "title",
      label: "Title",
      value: null,
      clearable: true,
      render2: (f) => renderInput(f.value, {}, f),
    },
    {
      key: "length",
      label: "Length",
      value: null,
      clearable: true,
      render2: (f) => renderInput(f.value, {}, f),
    },
  ]);

  const useForm = useDyForm(updateFormItems);

  const doSearch = () => {
    fetchData();
    pagination.pageNo = 1;
  };

  const doReset = () => {
    fetchData();
    pagination.pageNo = 1;
  };

  function rowKey(row) {
    return row.no;
  }

  // mock http request
  async function fetchData() {
    tableLoading.value = true;
    const {pageNo, pageSize} = pagination;
    const params = naiZealTableSearchRef.value?.getParams?.();

    const r = await new Promise((resolve) => {
      setTimeout(() => {
        const start = (pageNo - 1) * pageSize;
        const {length, no, title} = params || {};
        const data = zealData.value.filter(
            (it) =>
                (!length || String(it.length).includes(length)) &&
                (!title || String(it.title).includes(title)) &&
                (!no || it.no === parseInt(no, 10))
        );
        resolve({
          data: data.slice(start, start + pageSize),
          total: data.length,
        });
      }, 1500);
    });

    tableData.value = r.data;
    pagination.setTotalSize(r.total);
    tableLoading.value = false;
  }

  const newItem = () => {
    referId.value = "-1";
    useForm.onReset();
    nextTick(() => {
      naiPopupModalRef.value?.toggle?.(true);
    });
  };

  function upItem(r) {
    referId.value = r.no;
    useForm.setValues(r);
    nextTick(() => {
      naiPopupModalRef.value?.toggle?.(true);
    });
  }

  function delItem(r) {
    zealData.value = zealData.value.filter((it2) => it2.no !== r.no);
    message.success("delete successful");
    fetchData();
  }

  const deleteAll = () => {
    zealData.value = zealData.value.filter((it2) => !selectOpts.value.includes(it2.no));
    message.success("delete all successful");
    fetchData();
  };

  const onSubmit = async () => {
    handleDynamicFormRef.value
        ?.validator()
        .then((v) => {
          if (referId.value === "-1") {
            zealData.value.unshift({...v, key: Date.now()});
            message.success("Add successful");
          } else {
            zealData.value = zealData.value.map((it) => {
              if (referId.value === it.no) return v;
              return it;
            });
            message.success("Update successful");
          }
          nextTick(() => {
            naiPopupModalRef.value?.toggle?.(false);
            fetchData();
          });
        });
  };

  const handleSelectionChange = (v) => {
    selectOpts.value = v;
  };

  onMounted(() => {
    fetchData();
  });
</script>

<template>
  <NaiZealCard>
    <template #header="{ isMobile }">
      <NaiZealTableSearch
          :isMobile="isMobile"
          :search-items="searchFormItems"
          ref="naiZealTableSearchRef"
          :mobile-drawer="true"
          title="zeal test"
          @onReset="doReset"
          @onSearch="doSearch"
      />
    </template>

    <template #controlBtn>
      <n-button type="success" size="small" @click="newItem">Add</n-button>&nbsp;
      <n-button type="error" size="small" @click="deleteAll" :disabled="!selectOpts.length">
        Del Selected
      </n-button>
    </template>

    <template #toolBtn>
      <n-button type="default" size="small" @click="() => {}">
        Tool...
      </n-button>
    </template>

    <template #default="{ tableHeight }">
      <n-data-table
          :row-key="rowKey"
          :loading="tableLoading"
          :columns="columns"
          :data="tableData"
          :bordered="false"
          :style="{ height: tableHeight + 'px' }"
          :flex-height="true"
          :scroll-x="600"
          @update:checked-row-keys="handleSelectionChange"
      />
    </template>

    <template #footer="{ isMobile }">
      <NaiZealTablePaginationControl :is-mobile="isMobile" :pagination="pagination">
        <template #prefix="{ itemCount }"> Total {{ itemCount }}</template>
      </NaiZealTablePaginationControl>
    </template>

    <template #rest>
      <NaiPopupModal
          :title="referId === '-1' ? 'add Test' : 'update Test'"
          ref="naiPopupModalRef"
          :on-submit="onSubmit"
      >
        <NaiDynamicForm :items="updateFormItems" ref="handleDynamicFormRef"/>
      </NaiPopupModal>
    </template>
  </NaiZealCard>
</template>

<style scoped></style>

```

:::

</details>
  </template>

<NZealTemplate/>
</NaiBlock>

## With element plus

> The table uses the `EleZealTable` component — a lightweight wrapper with an API similar to Naive UI’s `data-table`.
> You can also use `el-table` directly.

<EleBlock>
<template #code>
<details>
<summary>code</summary>

::: code-group

```vue [TypeScript]

<script setup lang="ts">
  import {h, nextTick, onMounted, ref} from "vue";
  import {ElMessage, ElButton, ElSpace} from "element-plus";
  import {
    ElePopupModal,
    useDecorateForm,
    EleZealCard,
    EleDynamicForm,
    EleZealTableSearch,
    EleZealTablePaginationControl,
    EleZealTable,
    renderInput,
    renderInputNumber,
  } from "dynamicformdjx/elementPlus";
  import type {
    elePopupModalRef,
    eleDynamicFormRef,
    eleZealTableSearchRef
  } from "dynamicformdjx/elementPlus"
  import {useDyForm, useReactiveForm, usePagination} from "dynamicformdjx";
  import type {ZealColumn} from "dynamicformdjx/types/form";

  interface SongType {
    no: number | string
    title: string
    length: string
  }

  const zealData = ref<SongType[]>([
    {no: 3, title: 'Wonderwall', length: '4:18'},
    {no: 4, title: 'Don\'t Look Back in Anger', length: '4:48'},
    {no: 12, title: 'Champagne Supernova', length: '7:27'},
    ...Array.from({length: 50}).map((_, i) => ({no: i + 13, title: `test Data ${i + 1}`, length: `${i * i}`}))
  ])
  const referId = ref<string | number>('-1')
  const tableData = ref<SongType[]>([])
  const handleDynamicFormRef = ref<eleDynamicFormRef | null>(null)
  const naiZealTableSearchRef = ref<eleZealTableSearchRef | null>(null)
  const naiPopupModalRef = ref<elePopupModalRef | null>(null)
  const tableLoading = ref<boolean>(false)
  const selectOpts = ref<(number | string)[]>([])
  // search form
  const searchFormItems = useDecorateForm([
    {
      key: "no",
      label: "No",
      renderType: 'renderInputNumber',
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "length",
      label: "Length",
    },
  ].map(it => ({
    value: null,
    clearable: true,
    renderType: 'renderInput',
    span: 8,
    ...it,
  })) as any[])
  // table column
  const columns: ZealColumn<SongType>[] = [
    {type: 'selection', width: 55},
    {type: 'expand', render2: row => h('div', {}, JSON.stringify(row, null, 2))},
    {label: "No", prop: "no", width: 80},
    {label: "Title", prop: "title", slot: "title"},
    {label: "Length", prop: "length"},
    {
      label: "Actions", fixed: 'right', width: 160, render2: (row) => h(
          ElSpace, {}, [
            h(ElButton,
                {
                  size: 'small',
                  onClick: () => upItem(row)
                },
                'update'),
            h(ElButton,
                {
                  size: 'small',
                  type: 'danger',
                  onClick: () => delItem(row)
                },
                'delete')
          ]
      )
    },
  ];

  const pagination = usePagination(fetchData)
  const updateFormItems = useReactiveForm<SongType>([
    {
      key: "no",
      label: "No",
      clearable: true,
      value: null,
      render2: (f) => renderInputNumber(f.value, {}, f)
    },
    {
      key: "title",
      label: "Title",
      value: null,
      clearable: true,
      render2: (f) => renderInput(f.value, {}, f),
    },
    {
      key: "length",
      label: "Length",
      value: null,
      clearable: true,
      render2: (f) => renderInput(f.value, {}, f),
    },
  ])
  const useForm = useDyForm(updateFormItems)
  const doSearch = () => {
    fetchData()
    pagination.pageNo = 1
  }
  const doReset = () => {
    fetchData()
    pagination.pageNo = 1
  }

  // mock http request
  async function fetchData() {
    tableLoading.value = true
    const {pageNo, pageSize} = pagination
    const params = naiZealTableSearchRef.value?.getParams<SongType>?.()
    const r = await new Promise<{ data: SongType[], total: number }>((resolve, reject) => {
      setTimeout(() => {
        const start = (pageNo - 1) * pageSize
        const {length, no, title} = params!
        const data = zealData.value.filter(it => (!length || it.length.includes(length)) && (!title || it.title.includes(title)) && (!no || it.no === parseInt(no as string)))
        resolve({
          data: data.slice(start, start + pageSize),
          total: data.length
        })
      }, 1500)
    })
    tableData.value = r.data
    pagination.setTotalSize(r.total)
    tableLoading.value = false
  }

  const newItem = () => {
    referId.value = '-1'
    useForm.onReset()
    nextTick(() => {
      naiPopupModalRef.value?.toggle?.(true)
    })
  }

  function upItem(r: SongType) {
    referId.value = r.no
    useForm.setValues(r)
    nextTick(() => {
      naiPopupModalRef.value?.toggle?.(true)
    })
  }

  function delItem(r: SongType) {
    zealData.value = zealData.value.filter(it2 => it2.no !== r.no)
    ElMessage.success('delete successful')
    fetchData()
  }

  const deleteAll = () => {
    zealData.value = zealData.value.filter(it2 => !selectOpts.value.includes(it2.no))
    ElMessage.success('delete all successful')
    fetchData()
  }
  const onSubmit = async () => {
    handleDynamicFormRef.value?.validator().then((v: any) => {
      if (referId.value === '-1') {
        zealData.value.unshift({...v, key: Date.now()})
        ElMessage.success('Add successful')
      } else {
        zealData.value = zealData.value.map(it => {
          if (referId.value === it.no) return v as SongType
          return it
        })
        ElMessage.success('Update successful')
      }
      nextTick(() => {
        naiPopupModalRef.value?.toggle?.(false)
        fetchData()
      })
    })
  }
  const handleSelectionChange = (v: SongType[]) => {
    selectOpts.value = v.map(it => it.no)
  }
  onMounted(() => {
    fetchData()
  })
</script>

<template>
  <EleZealCard>
    <template #header="{isMobile}">
      <EleZealTableSearch :is-mobile="isMobile" :search-items="searchFormItems" ref="naiZealTableSearchRef"
                          :mobile-drawer="true"
                          title="zeal test" @onReset="doReset"
                          @onSearch="doSearch">
        <template #drawerBtn="{openDrawer}">
          <el-button @click="openDrawer">+</el-button>
        </template>
      </EleZealTableSearch>
    </template>
    <template #controlBtn>
      <el-button type="success" size="small" @click="newItem">Add</el-button>
      <el-button type="danger" size="small" @click="deleteAll" :disabled="!selectOpts.length">Del Selected</el-button>
    </template>
    <template #toolBtn>
      <el-button type="default" size="small" @click="()=>{}">
        Tool...
      </el-button>
    </template>
    <template #default="{tableHeight}">
      <EleZealTable :data="tableData" :columns="columns" :max-height="tableHeight" :loading="tableLoading"
                    @selection-change="handleSelectionChange">
        <template #title="{ row }">
          <el-tag>{{ row.title }}</el-tag>
        </template>
        <template #empty>
          <p> no data</p>
        </template>
      </EleZealTable>
    </template>
    <template #footer="{isMobile}">
      <EleZealTablePaginationControl :is-mobile="isMobile" :pagination="pagination"/>
    </template>
    <template #rest>
      <ElePopupModal :title="referId==='-1'?'add Test':'update Test'" ref="naiPopupModalRef" :on-submit="onSubmit">
        <EleDynamicForm :items="updateFormItems" ref="handleDynamicFormRef"/>
      </ElePopupModal>
    </template>
  </EleZealCard>
</template>

<style scoped>

</style>
```

```vue [JavaScript]

<script setup>
  import {h, nextTick, onMounted, ref} from "vue";
  import {ElMessage, ElButton, ElSpace} from "element-plus";
  import {
    ElePopupModal,
    useDecorateForm,
    EleZealCard,
    EleDynamicForm,
    EleZealTableSearch,
    EleZealTablePaginationControl,
    EleZealTable,
    renderInput,
    renderInputNumber,
  } from "dynamicformdjx/elementPlus";
  import {useDyForm, useReactiveForm, usePagination} from "dynamicformdjx";

  const zealData = ref([
    {no: 3, title: "Wonderwall", length: "4:18"},
    {no: 4, title: "Don't Look Back in Anger", length: "4:48"},
    {no: 12, title: "Champagne Supernova", length: "7:27"},
    ...Array.from({length: 50}).map((_, i) => ({
      no: i + 13,
      title: `test Data ${i + 1}`,
      length: `${i * i}`,
    })),
  ]);

  const referId = ref("-1");
  const tableData = ref([]);
  const handleDynamicFormRef = ref(null);
  const naiZealTableSearchRef = ref(null);
  const naiPopupModalRef = ref(null);
  const tableLoading = ref(false);
  const selectOpts = ref([]);

  // search form
  const searchFormItems = useDecorateForm(
      [
        {
          key: "no",
          label: "No",
          renderType: "renderInputNumber",
        },
        {
          key: "title",
          label: "Title",
        },
        {
          key: "length",
          label: "Length",
        },
      ].map((it) => ({
        value: null,
        clearable: true,
        renderType: "renderInput",
        span: 8,
        ...it,
      }))
  );

  // table column
  const columns = [
    {type: "selection", width: 55},
    {type: "expand", render2: (row) => h("div", {}, JSON.stringify(row, null, 2))},
    {label: "No", prop: "no", width: 80},
    {label: "Title", prop: "title", slot: "title"},
    {label: "Length", prop: "length"},
    {
      label: "Actions",
      fixed: "right",
      width: 160,
      render2: (row) =>
          h(ElSpace, {}, [
            h(
                ElButton,
                {
                  size: "small",
                  onClick: () => upItem(row),
                },
                "update"
            ),
            h(
                ElButton,
                {
                  size: "small",
                  type: "danger",
                  onClick: () => delItem(row),
                },
                "delete"
            ),
          ]),
    },
  ];

  const pagination = usePagination(fetchData);

  const updateFormItems = useReactiveForm([
    {
      key: "no",
      label: "No",
      clearable: true,
      value: null,
      render2: (f) => renderInputNumber(f.value, {}, f),
    },
    {
      key: "title",
      label: "Title",
      value: null,
      clearable: true,
      render2: (f) => renderInput(f.value, {}, f),
    },
    {
      key: "length",
      label: "Length",
      value: null,
      clearable: true,
      render2: (f) => renderInput(f.value, {}, f),
    },
  ]);

  const useForm = useDyForm(updateFormItems);

  const doSearch = () => {
    fetchData();
    pagination.pageNo = 1;
  };

  const doReset = () => {
    fetchData();
    pagination.pageNo = 1;
  };

  // mock http request
  async function fetchData() {
    tableLoading.value = true;
    const {pageNo, pageSize} = pagination;
    const params = naiZealTableSearchRef.value?.getParams?.();

    const r = await new Promise((resolve) => {
      setTimeout(() => {
        const start = (pageNo - 1) * pageSize;
        const {length, no, title} = params || {};
        const data = zealData.value.filter(
            (it) =>
                (!length || String(it.length).includes(length)) &&
                (!title || String(it.title).includes(title)) &&
                (!no || it.no === parseInt(no, 10))
        );
        resolve({
          data: data.slice(start, start + pageSize),
          total: data.length,
        });
      }, 1500);
    });

    tableData.value = r.data;
    pagination.setTotalSize(r.total);
    tableLoading.value = false;
  }

  const newItem = () => {
    referId.value = "-1";
    useForm.onReset();
    nextTick(() => {
      naiPopupModalRef.value?.toggle?.(true);
    });
  };

  function upItem(r) {
    referId.value = r.no;
    useForm.setValues(r);
    nextTick(() => {
      naiPopupModalRef.value?.toggle?.(true);
    });
  }

  function delItem(r) {
    zealData.value = zealData.value.filter((it2) => it2.no !== r.no);
    ElMessage.success("delete successful");
    fetchData();
  }

  const deleteAll = () => {
    zealData.value = zealData.value.filter((it2) => !selectOpts.value.includes(it2.no));
    ElMessage.success("delete all successful");
    fetchData();
  };

  const onSubmit = async () => {
    handleDynamicFormRef.value?.validator().then((v) => {
      if (referId.value === "-1") {
        zealData.value.unshift({...v, key: Date.now()});
        ElMessage.success("Add successful");
      } else {
        zealData.value = zealData.value.map((it) => {
          if (referId.value === it.no) return v;
          return it;
        });
        ElMessage.success("Update successful");
      }
      nextTick(() => {
        naiPopupModalRef.value?.toggle?.(false);
        fetchData();
      });
    });
  };

  const handleSelectionChange = (v) => {
    selectOpts.value = v.map((it) => it.no);
  };

  onMounted(() => {
    fetchData();
  });
</script>

<template>
  <EleZealCard>
    <template #header="{ isMobile }">
      <EleZealTableSearch
          :is-mobile="isMobile"
          :search-items="searchFormItems"
          ref="naiZealTableSearchRef"
          :mobile-drawer="true"
          title="zeal test"
          @onReset="doReset"
          @onSearch="doSearch"
      >
        <template #drawerBtn="{ openDrawer }">
          <el-button @click="openDrawer">+</el-button>
        </template>
      </EleZealTableSearch>
    </template>

    <template #controlBtn>
      <el-button type="success" size="small" @click="newItem">Add</el-button>
      <el-button type="danger" size="small" @click="deleteAll" :disabled="!selectOpts.length">
        Del Selected
      </el-button>
    </template>

    <template #toolBtn>
      <el-button type="default" size="small" @click="() => {}"> Tool...</el-button>
    </template>

    <template #default="{ tableHeight }">
      <EleZealTable
          :data="tableData"
          :columns="columns"
          :max-height="tableHeight"
          :loading="tableLoading"
          @selection-change="handleSelectionChange"
      >
        <template #title="{ row }">
          <el-tag>{{ row.title }}</el-tag>
        </template>
        <template #empty>
          <p>no data</p>
        </template>
      </EleZealTable>
    </template>

    <template #footer="{ isMobile }">
      <EleZealTablePaginationControl :is-mobile="isMobile" :pagination="pagination"/>
    </template>

    <template #rest>
      <ElePopupModal
          :title="referId === '-1' ? 'add Test' : 'update Test'"
          ref="naiPopupModalRef"
          :on-submit="onSubmit"
      >
        <EleDynamicForm :items="updateFormItems" ref="handleDynamicFormRef"/>
      </ElePopupModal>
    </template>
  </EleZealCard>
</template>

<style scoped></style>

```

:::

</details>
  </template>
<EZealTemplate/>
</EleBlock>

::: tip
The top fixed UI component now moves data-driven logic into setup, with support for reactive updates.
:::