<template>
  <Category :is="is" />
  <el-card style="margin: 10px 0;">
   <SpuShow v-show="scene == 0" :changeScene="changeScene"/>
   <SkuForm v-show="scene == 1" :changeScene="changeScene"/>
   <SpuForm v-show="scene == 2" :changeScene="changeScene"/>
   <!-- <Test /> -->
    <el-dialog v-model="isShow" title="skuList">
      <el-table :data="sku_">
        <el-table-column label="Name" prop="name" ></el-table-column>
        <el-table-column label="Price" prop="price"></el-table-column>
        <el-table-column label="Weight" prop="weight"></el-table-column>
        <el-table-column label="Price">
          <template #default="{row}">
            <img :src="row.skuDefaultImg" style="width:100%" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

   
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'ShopSpu'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import SpuShow from '@/components/shop/spuShow.vue'
import SpuForm from '@/components/shop/spuForm.vue'
import SkuForm from '@/components/shop/skuForm.vue'
import emitter from '@/tools/emitt'
// import Test from './test.vue'



const is = ref(true)
const scene = ref(0)
const isShow = ref(false)

// 服务器返回201，数据自己填的
const sku_=[
  {name:'Gengar',price:123,weight:321,skuDefaultImg:'https://avatarfiles.alphacoders.com/375/thumb-1920-375360.png'},
  {name:'Itachi',price:456,weight:654,skuDefaultImg:'https://avatarfiles.alphacoders.com/375/thumb-1920-375166.png'},
]


const changeScene = (value:number)=>{
  scene.value = value
}



emitter.on('showSkuList',()=>{
  isShow.value = true
})

</script>
<style lang="scss" scoped></style>
