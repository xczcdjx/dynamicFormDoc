<script setup lang="ts">
import {NaiZealTablePaginationControl} from 'dynamicformdjx/naiveUi'
import {usePagination, useWindowSize} from "dynamicformdjx";
import {onMounted} from "vue";
import {useMessage} from "naive-ui";

const {isMobile} = useWindowSize()
const pagination = usePagination(fetchData)
const message=useMessage()
function fetchData() {
  const {pageNo,pageSize}=pagination
  message.info(JSON.stringify({pageNo,pageSize},null,2))
  console.log(pageNo,pageSize)
}

onMounted(() => {
  pagination.total = 52
})
</script>

<template>
  <NaiZealTablePaginationControl :pagination="pagination" :isMobile="isMobile">
    <template #prefix="{ itemCount }">
      <span>Total {{ itemCount }}</span>
    </template>
  </NaiZealTablePaginationControl>
</template>