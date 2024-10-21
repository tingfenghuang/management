<template>
  <div>
    <el-button icon="Plus" type="primary" :disabled="!attrStore.category3Id" @click="addSpu">Add Spu</el-button>
    <el-table style="margin: 10px 0; width: 99%;" border :data="records">
      <el-table-column label="ID" width="80px" type="index"></el-table-column>
      <el-table-column label="Spu Name" prop="spuName"></el-table-column>
      <el-table-column label="Spu Description" prop="description"></el-table-column>
      <el-table-column label="operations">
        <template #="{ row }">
          <el-button type="primary" icon="Plus" title="Add sku" @click="addSku(row)"></el-button>
          <el-button type="success" icon="Edit" title="Edit" @click="editSpu(row)"></el-button>
          <el-button type="info" icon="View" title="View" @click="viewSku(row)"></el-button>
          <el-button type="danger" icon="Delete" title="Delete" @click="deleteSpu(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" background
      layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @change="pageChange" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'SpuShow'
}

</script>
<script lang="ts" setup>
import { getSpuList, getSkuList, removeSpu} from '@/api/shop/spu'
import useShopAttrStore from '@/stores/shopAttr'
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue'
import emitter from '@/tools/emitt'









const porp = defineProps(['changeScene'])
const currentPage = ref(1)//当前页码
const pageSize = ref(3)//每页数量
const attrStore = useShopAttrStore()
const records = ref<any>([])
const total = ref(0)








const useGetSpuList = () => {
  getSpuList(currentPage.value, pageSize.value, attrStore.category3Id).then((res: any) => {
    if (res.code == 200) {

      records.value = res.data.records
      total.value = res.data.total
      return
    }
    ElMessage.error('get spu list failed')
  })
}

watch(() => attrStore.category3Id, () => {
  useGetSpuList()

})
const pageChange = () => {
  useGetSpuList()

}


const editSpu = (row: any) => {
  porp.changeScene(2)
  //发请求
  emitter.emit('editSpu', row)

}
const addSku = (row: any) => {
  
  porp.changeScene(1)
  emitter.emit('initSkuData',row)
  
}
const addSpu = () => {
  porp.changeScene(2)
  emitter.emit('addSpu',attrStore.category3Id)
}
const viewSku = (row: any) => {
 getSkuList(row.id).then((res: any) => {
     emitter.emit('showSkuList')
     //服务器返回有问题
    //  console.log(res)
    // if (res.code == 200) {
    //    console.log(res.data)
    // }
    // ElMessage.error('get sku list failed')
 })
}
const deleteSpu = (row: any) => {
  removeSpu(row.id).then((res: any) => {
    if (res.code == 200) {
      ElMessage.success('delete spu success')
      useGetSpuList()
      return
    }
    ElMessage.error('delete spu failed')
  })
 
}
emitter.on('saveSpu', () => {
  currentPage.value = 1
  useGetSpuList()
})



</script>