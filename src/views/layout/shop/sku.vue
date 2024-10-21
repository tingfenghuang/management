<template>
  <el-card>
    <el-table border style="width: 99%; margin:10px 0;" :data="skuArr">
      <el-table-column label="Id" width="80px" type="index"></el-table-column>
      <el-table-column label="Name" show-overflow-tooltip prop="skuName"></el-table-column>
      <el-table-column label="Description" show-overflow-tooltip prop="skuDesc"></el-table-column>
      <el-table-column label="Picture" width="300px">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100%;">
        </template>
      </el-table-column>
      <el-table-column label="Weight" prop="weight"></el-table-column>
      <el-table-column label="Price" prop="price"></el-table-column>
      <el-table-column label="Operation" width="300px">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="editSku(row)">Edit</el-button>
          <el-button type="danger" size="small" @click="deleteSku(row)">Delete</el-button>
          <el-button type="warning" size="small" @click="viewSku(row)">View</el-button>
          <el-button type="success" size="small" @click="isPutaway(row)">{{ row.isSale === 0 ? 'Sale' :
            'UnSale' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[4, 8, 12, 16]"
      background layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />

    <el-drawer v-model="drawer" title="Sku details" :with-header="true" size="45%">
      <el-row style="margin: 15px 0;">
        <el-col :span="6">Name</el-col>
        <el-col :span="18">{{ skuDetail.name }}</el-col>
      </el-row>
      <el-row style="margin: 15px 0;">
        <el-col :span="6">Price</el-col>
        <el-col :span="18">{{ skuDetail.price }}</el-col>
      </el-row>
      <el-row style="margin: 15px 0;">
        <el-col :span="6">Attr</el-col>
        <el-col :span="18">
          <el-tag v-for="(item,index) in skuDetail.skuAttrValueList" :key="index" type="primary" style="margin:5px">{{ item }}</el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 15px 0;">
        <el-col :span="6">SaleAttr</el-col>
        <el-col :span="18">
          <el-tag v-for="(item,index) in skuDetail.skuSaleAttrValueList" :key="index" type="primary" style="margin:5px">{{ item }}</el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 15px 0;">
        <el-col :span="6">Picture</el-col>
        <el-col :span="18">
          <el-carousel :interval="4000" type="card" height="180px">
            <el-carousel-item v-for="(item,index) in skuDetail.imgList" :key="index">
              <img :src="item" alt="" style="width: 100%">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>

    </el-drawer>

  </el-card>
</template>

<script lang="ts">
export default {
  name: 'Sku'
}
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { getSkuList_, skuOnSale_, skuCancelSale_ ,getSkuDetail_,deleteSku_} from '@/api/shop/sku'
import { ElMessage } from 'element-plus'













const currentPage = ref(1)
const pageSize = ref(4)
const total = ref(0)
const skuArr = ref<any>([])
const drawer = ref(false)
const skuDetail = ref<any>({})
















const handleSizeChange = (val: number) => {
  currentPage.value = 1
  useGetSpuList()

}
const handleCurrentChange = (val: number) => {

  useGetSpuList()

}
const useGetSpuList = () => {
  getSkuList_(currentPage.value, pageSize.value).then((res: any) => {

    if (res.code === 200) {
      skuArr.value = res.data.records
      total.value = res.data.total
    } else {
      ElMessage.error(res.message)
    }

  })
}
const isPutaway = (row: any) => {
  if (row.isSale === 0) {
    row.isSale = 1
    skuOnSale_(row.id).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success('Putaway Success')
      } else {
        ElMessage.error(res.message)
      }
    })

  } else {
    row.isSale = 0
    skuCancelSale_(row.id).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success('CancelSale Success')
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  useGetSpuList()
}

const editSku = (row: any) => {
  ElMessage.success('developmenting')
}
const viewSku = (row: any) => {
  getSkuDetail_(row.id).then((res: any) => {
    skuDetail.value={
      'skuAttrValueList': ['color', 'size','weight'],
      'name':'CyiLn',
      'price':1000,
      'skuSaleAttrValueList': ['red', 'L','1kg'],
      'imgList':['https://gratisography.com/wp-content/uploads/2024/03/gratisography-holographic-suit-1170x780.jpg',
        'https://gratisography.com/wp-content/uploads/2024/03/gratisography-vr-glasses-1170x780.jpg',
        'https://gratisography.com/wp-content/uploads/2023/06/gratisography-strange-world-free-stock-photo-1170x780.jpg'
      ]
    
    }
  
  })
  drawer.value = true
}
const deleteSku = (row: any) => {
  deleteSku_(row.id).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success('Delete Success')
      useGetSpuList()
    } else {
      ElMessage.error(res.message)
    }
  })
}















onMounted(() => {
  //初始化获取数据
  useGetSpuList()

})



</script>


<style lang="scss" scoped>


.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
