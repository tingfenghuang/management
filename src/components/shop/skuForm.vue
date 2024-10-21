<template>
    <el-form label-width="150px">
        <el-form-item label="Sku Name">
            <el-input type="test" placeholder="Sku Name" v-model="sku.skuName"></el-input>
        </el-form-item>
        <el-form-item label="Sku Price(￥)">
            <el-input type="number" placeholder="Sku Price" v-model="sku.price"></el-input>
        </el-form-item>
        <el-form-item label="Sku heavy(g)">
            <el-input type="number" placeholder="Sku Heavy" v-model="sku.weight"></el-input>
        </el-form-item>
        <el-form-item label="Sku discribe">
            <el-input type="textarea" placeholder="Sku Describe" v-model="sku.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="Sku platform">
            <el-form :inline="true">
                <el-form-item v-for="item in attrList" :key="item.id" :label="item.attrName">
                    <el-select style="width: 200px" placeholder="please select" v-model="item.attrIdAndValueId">
                        <!-- @ts-ignore -->
                        <el-option v-for="item_ in item.attrValueList" :key="item_.id" :label="item_.valueName"
                            :value="`${item.id}:${item_.id}`">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </el-form-item>
        <el-form-item label="Sale Attribute">
            <el-form :inline="true">
                <el-form-item v-for="item in spuSaleAttrList" :key="item.id" :label="item.saleAttrName">
                    <el-select style="width: 200px" placeholder="please select" v-model="item.saleAttrValueId">
                        <!-- @ts-ignore -->
                        <el-option v-for="item_ in item.spuSaleAttrValueList" :key="item_.id"
                            :label="item_.saleAttrValueName" :value="`${item.id}:${item_.id}`"></el-option>

                    </el-select>
                </el-form-item>

            </el-form>
        </el-form-item>
        <el-form-item label="Picture Name">
            <el-table border :data="spuImgList" ref="table" style="width:99%">
                <el-table-column type="selection" width="80px"></el-table-column>
                <el-table-column label="Picture">
                    <template #="{ row, index }">
                        <div class="imgBox">
                            <img :src="row.imgUrl" alt="">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Name" width="120px" prop="imgName">
                </el-table-column>
                <el-table-column width='300px' label="Operation">
                    <template #default="{row,$index}">
                        <el-button type="primary" @click="handler(row)">Set default</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">confirm</el-button>
            <el-button @click="cancel" type="primary">cancel</el-button>
        </el-form-item>
    </el-form>

</template>
<script lang="ts">
export default {
    name: 'SkuForm',
}

</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import emitter from '@/tools/emitt'
import useShopAttrStore from '@/stores/shopAttr'
import { getAttrList } from '@/api/shop/attr'
import { getSpuImgList, getSpuSaleAttrList ,addSku_} from '@/api/shop/spu'
import { ElMessage } from 'element-plus'


const shopAttrStore = useShopAttrStore()
const porp = defineProps(['changeScene'])
const cancel = () => {
    porp.changeScene(0)
}
const attrList = ref<any>([])
const spuImgList = ref<any>([])
const spuSaleAttrList = ref<any>([])
const table =ref<any>()
const sku = reactive({
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuDefaultImg: '',
    skuAttrValueList: [],//平台属性
    // skuSaleAttrValueList: [],//销售属性
})












const save = () => {
    sku.skuAttrValueList = attrList.value.reduce((prev:any, item:any) => {
        if (item.attrIdAndValueId) {
            prev.push({
                attrId: item.attrIdAndValueId.split(':')[0],
                valueId: item.attrIdAndValueId.split(':')[1]
            })
        }
        return prev
    }, [])
    // sku.skuSaleAttrValueList = spuSaleAttrList.value.reduce((prev:any, item:any) => {
    //     if (item.saleAttrValueId) {
    //         prev.push({
    //             saleAttrId: item.saleAttrValueId.split(':')[0],
    //             saleAttrValueId: item.saleAttrValueId.split(':')[1]
    //         })
    //     }
    //     return prev
    // }, [])
    // console.log(sku)
    addSku_(sku).then((res:any) => {
        if(res.code === 200){
            ElMessage({
                message: 'Add Success',
                type: 'success',
            })
            porp.changeScene(0)
        }else{
            ElMessage({
                message: 'Add Fail',
                type: 'error',
            })
        }
  
    })
   
}
const handler = (row: any) => {
    //清空复选框
    table.value.clearSelection()
    //选中当前行
    table.value.toggleRowSelection(row, true)
    sku.skuDefaultImg = row.imgUrl
    
}


emitter.on('initSkuData', (data: any) => {
    // console.log(data)
    sku.category3Id = data.category3Id
    sku.spuId = data.id
    sku.tmId = data.tmId
    getAttrList(shopAttrStore.category1Id, shopAttrStore.category2Id, data.category3Id).then(res => {
        attrList.value = res.data
        //  console.log(attrList.value)
    })
    getSpuImgList(data.id).then(res => {
        spuImgList.value = res.data
        // console.log(spuImgList.value)
    })
    getSpuSaleAttrList(data.id).then(res => {
        spuSaleAttrList.value = res.data
        
    })

})


</script>
<style lang="scss" scoped>
img {
    width: 100%;
}
</style>