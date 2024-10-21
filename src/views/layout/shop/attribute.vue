<template>
  <div class="attr">
    <Category :is="isShowTable" />
    <el-card style="margin:10px 0px">
      <div v-show="!isShowTable">
        <el-form :inline=true>
          <el-form-item label="Attribute Name">
            <el-input placeholder="Please enter the attribute name" v-model="attrParams.attrName"></el-input>
          </el-form-item>

        </el-form>
        <el-button icon="Plus" type="primary" :disabled="attrParams.attrName ? false : true" @click="addAttrValue">Add
          attribute value</el-button>
        <el-button type="primary" @click="cancel">cancel</el-button>
        <el-table border style="margin: 10px 0; width: 99%;" :data="attrParams.attrValueList">
          <el-table-column label="Id" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="Attribute Value Name">
            <template #="{ row, $index }">
              <el-input :ref="(vc:any)=>inputArr[$index] = vc" v-if="row.flag" placeholder="Please enter the attribute value name" v-model="row.valueName" @blur="toScan(row, $index)"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="Attribute Operation">
            <template #default="{ row, $index }">
              <el-button type="danger" icon="Delete" size="small" @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
         
        </el-table>
        <el-button icon="Plus" type="primary" @click="save" :disabled="attrParams.attrValueList.length ? false : true">save</el-button>
        <el-button type="primary" @click="cancel">cancel</el-button>

      </div>

      <div v-show="isShowTable">
        <el-button type="primary" icon="Plus" :disabled="shopAttrStore.category3Id ? false : true" @click="addAttr">Add
          Attribute</el-button>
        <el-table style="margin:10px 0px; width: 99%;" :data="attrList" border>
          <el-table-column label='ID' width="80px" type="index" align="center"></el-table-column>
          <el-table-column label='Attribute ' width="120px" prop="attrName"></el-table-column>
          <el-table-column label='Attribute Value'>
            <template #default="{ row, $index }">
              <el-tag v-for="attr in row.attrValueList" :key="attr.id" style="margin:0px 5px">{{ attr.valueName
                }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label='Operation' width="120px">
            <template #default="{ row, $index }">
              <el-button type="primary" icon="Edit" size="small" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="Delete" size="small" @click="deleteAttr(row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ShopAttribute'
}
</script>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { watch, ref, reactive ,nextTick} from 'vue'
import Category from '@/components/category/category.vue'
import useShopAttrStore from '@/stores/shopAttr'
import { getAttrList, addOrUpdateAttr , deletedAttr} from '@/api/shop/attr'




const attrList = ref<any>([])
const shopAttrStore = useShopAttrStore()
const isShowTable = ref(true)
const attrParams = reactive({
  attrName: '',//属性名
  attrValueList: [],//属性值列表
  categoryId: '',//分类id
  categoryLevel: 3//分类级别
})
const inputArr=reactive<any>([])












const useGetAttrList = () => {
  const { category1Id, category2Id, category3Id } = shopAttrStore

  getAttrList(category1Id, category2Id, category3Id).then((res: any) => {

    if (res.code === 200) {
      attrList.value = res.data
    } else {
      ElMessage.error('Failed to get attribute list')
    }

  })
}
watch(() => shopAttrStore.category3Id, () => {
  attrList.value = []
  if (shopAttrStore.category3Id) {
    useGetAttrList()

  }
})
const addAttr = () => {
  Object.assign(attrParams, {
  attrName: '',
  attrValueList: [],
  categoryId: shopAttrStore.category3Id,
  categoryLevel: 3

})
  isShowTable.value = false

}
const updateAttr = (row: any) => {
  //深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  console.log(attrParams)

  isShowTable.value = false

 
}
const cancel = () => {
  isShowTable.value = true
}
const addAttrValue = () => {

  //@ts-ignore
  attrParams.attrValueList.push({
    valueName: '',
    flag:true
  })
  nextTick(()=>{
    inputArr[attrParams.attrValueList.length-1].focus()
  })
}
const save = () => {
  isShowTable.value = true
  addOrUpdateAttr(attrParams).then((res: any) => {
    if (res.code === 200) {
      ElMessage({
        //@ts-ignore
        message: attrParams.id ? 'Update successful' : 'Save successful',
        type: 'success'
      })
      useGetAttrList()
    } else {
      ElMessage({
        //@ts-ignore
        message: attrParams.id ? 'Update failed' : 'Save failed',
        type: 'error'
      })
    }
  })
}
const toScan = (row: any,$index: number) => {
   if(row.valueName.trim() === ''){
    //删除空元素
   attrParams.attrValueList.splice($index,1)
   ElMessage({
    type: 'error',
    message: 'Please enter the attribute value'
   })
   return 
   }
   const repeat= attrParams.attrValueList.find((item: any) => {
    if(item !== row){
      return item.valueName === row.valueName
    }
     
   })
   if(repeat){
    attrParams.attrValueList.splice($index,1)
    ElMessage({
      type: 'error',
      message: 'Attribute value cannot be repeated'
    })
    return
   }
    row.flag = false
}
const toEdit = (row: any, $index: number) => {
  row.flag = true
  nextTick(() =>{
    inputArr[$index].focus()
  })
}
const deleteAttr = (id: number) => {

  deletedAttr(id).then((res: any) => {
    if(res.code === 200){
      ElMessage({
        type: 'success',
        message: 'Delete successful'
      })
      useGetAttrList()
    }else{
      ElMessage({
        type: 'error',
        message: 'Delete failed'
      })
    }
  })

  
}



</script>

<style lang="scss" scoped></style>