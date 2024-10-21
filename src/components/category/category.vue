<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="primary classification" style="width:30%;">
        <el-select placeholder="please select" v-model="shopAttrStore.category1Id" @change="handle" :disabled="!is">
          <el-option v-for="c1 in shopAttrStore.category1List as any" :key="c1.id" :label="c1.name"
            :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="secondary classification" style="width:30%;">
        <el-select placeholder="please select" v-model="shopAttrStore.category2Id" @change="handle1" :disabled="!is">
          <el-option v-for="c2 in shopAttrStore.category2List as any" :key="c2.id" :label="c2.name"
            :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="tertiary classification" style="width:30%;">
        <el-select placeholder="please select" v-model="shopAttrStore.category3Id" :disabled="!is">
          <el-option v-for="c3 in shopAttrStore.category3List as any" :key="c3.id" :label="c3.name"
            :value="c3.id"></el-option>
        </el-select>
      </el-form-item>

    </el-form>
  </el-card>
</template>
<script lang="ts">
export default {
  name: 'Category'
}

</script>

<script lang="ts" setup>
//引入
import { onMounted,onBeforeUnmount } from 'vue'
import useShopAttrStore from '@/stores/shopAttr'

//使用
defineProps(['is'])
const shopAttrStore = useShopAttrStore()







//回调函数
onMounted(() => {
  shopAttrStore.getCategory1List()
})
const handle = () => {
  shopAttrStore.category2Id = ''
  shopAttrStore.category2List = []
  shopAttrStore.category3Id = ''
  shopAttrStore.category3List = []
  shopAttrStore.getCategory2List()

}
const handle1 = () => {
  shopAttrStore.category3Id = ''
  shopAttrStore.category3List = []
  shopAttrStore.getCategory3List()
}
onBeforeUnmount(() => {
  shopAttrStore.category1Id = ''
  shopAttrStore.category2Id = ''
  shopAttrStore.category3Id = ''
})



</script>

<style scoped></style>
