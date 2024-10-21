<template>
    <el-form label-width="150px">
        <el-form-item label="SPU Name">
            <el-input placeholder="Please input SPU name" v-model="spu.spuName"></el-input>
        </el-form-item>
        <el-form-item label="Brand" style="width: 350px;">
            <el-select v-model="spu.tmId" placeholder="Please select a brand">
                <el-option v-for="item in spuBrandList" :key="item.id" :label="item.tmName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU Description">
            <el-input type="textarea" placeholder="Please input SPU description" v-model="spu.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU Image">
            <el-upload v-model:file-list="fileList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="isShowDialog">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
            </el-dialog>
        </el-form-item>






        <el-form-item label="Spu Sale Attributes">
            <el-select style="width: 350px;" v-model="saleIdAndValueName" placeholder="Please select a sale attribute">
                <el-option v-for="item in unSelectSaleAttrList" :key="item.id" :label="item.name"
                    :value="`${item.id}:${item.name}`"></el-option>

            </el-select>
            <el-button icon="Plus" type="primary" size="default" style="margin-left: 10px"
                :disabled="saleIdAndValueName ? false : true" @click="addSaleAttr">Add Sale
                Attribute</el-button>
            <el-table border style="margin:10px 0; width: 99%" :data="spuSaleAttrList">
                <el-table-column label="ID" type="index" width="80px"></el-table-column>
                <el-table-column label="Attribute Name" width="200px" prop="saleAttrName"></el-table-column>
                <el-table-column label="Attribute Value">

                    <template #default="{ row }">
                        <el-tag closable v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id"
                            @close="row.spuSaleAttrValueList.splice(index, 1)" style="margin-right: 10px">
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input ref="inputRef" v-model="row.saleValueName" @blur="addSaleAttrValue(row)"
                            v-if="row.isAdd" placeholder="Please input attribute value" size="small"
                            style="width: 100px; margin-right: 10px">
                        </el-input>
                        <el-button v-else icon="Plus" type="primary" size="small" @click="addSaleAttrValue(row)"
                            :disabled="isClick"></el-button>

                    </template>


                </el-table-column>
                <el-table-column label="Operation">
                    <template #default="{ row, $index }">
                        <el-button type="primary" size="small" @click="spuSaleAttrList.value.splice($index, 1)"
                            icon="Delete"></el-button>
                    </template>


                </el-table-column>


            </el-table>
            <el-button type="primary" size="default" @click="save">confirm</el-button>
            <el-button type="primary" size="default" @click="changeScene(0)">cancel</el-button>

        </el-form-item>


    </el-form>

</template>
<script lang="ts">
export default {
    name: 'SpuForm',
}

</script>
<script lang="ts" setup>
import { ref, reactive, computed, nextTick } from 'vue'
import emitter from '@/tools/emitt'
import { getAllSaleAttrList, getSpuImgList, getSpuSaleAttrList, getAllSpuList, addOrupdateSpu } from '@/api/shop/spu'
import { ElMessage } from 'element-plus'



let fileList = ref<any>([])
let spuBrandList = ref<any>([])
let spuSaleAttrList = ref<any>([])
let allSaleAttrList = ref<any>([])
const inputRef = ref<any>()
let isClick = ref(false)

const dialogImageUrl = ref('')
const isShowDialog = ref(false)
const saleIdAndValueName = ref<any>('')














const prop = defineProps(['changeScene'])
const spu = reactive<any>({})





















const handleAvatarSuccess = (response: any, file: any) => {
    console.log(response, file)

}

const beforeUpload = (file: any) => {
    const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt6M = file.size / 1024 / 1024 < 5

    if (!isJPGOrPNG) {
        ElMessage.error('Avatar picture must be JPG or PNG format!')
    }
    if (!isLt6M) {
        ElMessage.error('Avatar picture size cannot exceed 5MB!')
    }

    return isJPGOrPNG && isLt6M
}
const handleRemove = (uploadFile: any, uploadFiles: any) => {
    //删除时的回调
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url!
    isShowDialog.value = true

}
const unSelectSaleAttrList = computed(() => {
    if (spuSaleAttrList.value.length) {
        return allSaleAttrList.value.filter((item: any) => {
            return spuSaleAttrList.value.every((item2: any) => {
                return item.name != item2.saleAttrName
            })
        })
    } else {
        return allSaleAttrList.value
    }
})
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleIdAndValueName.value.split(':')
    let newSaleAttrValue = { saleAttrName, baseSaleAttrId, spuSaleAttrValueList: [], isAdd: false }
    spuSaleAttrList.value.push(newSaleAttrValue)
    saleIdAndValueName.value = ''
}
const addSaleAttrValue = (row: any) => {
    isClick.value = true



    if (!row.isAdd) {
        //获取组件实例

        row.isAdd = !row.isAdd
        nextTick(() => {
            inputRef.value?.focus()
        })

    } else {
        if (row.saleValueName) {
            const res = row.spuSaleAttrValueList.every((item: any) => {
                return item.saleAttrValueName != row.saleValueName
            })
            if (res) {
                row.isAdd = !row.isAdd
                row.spuSaleAttrValueList.push({ baseSaleAttrId: row.baseSaleAttrId, saleAttrValueName: row.saleValueName })
                row.saleValueName = ''
                isClick.value = false
            }
            else {
                ElMessage.error('please input different value')
                inputRef.value?.focus()
            }

        } else {
            ElMessage.error('please input value')
            inputRef.value?.focus()
        }


    }

}
const save = () => {
    // console.log(spu)
    spu.spuImageList = fileList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    spu.spuSaleAttrList = spuSaleAttrList.value
    addOrupdateSpu(spu).then((res: any) => {
        if (res.code == 200) {
            ElMessage.success('success')
            prop.changeScene(0)
            emitter.emit('saveSpu')

        } else {
            ElMessage.error('fail')
        }
    })
}

emitter.on('editSpu', (receiveSpu: any) => {
    Object.assign(spu, receiveSpu)
    Promise.all([
        getAllSpuList().then((res: any) => {

            spuBrandList.value = res.data
        }),
        getSpuImgList(spu.id).then((res: any) => {
            // spu.spuImgList = res.data
            fileList.value = res.data.map((item: any) => {
                return {
                    name: item.imgName,
                    url: item.imgUrl
                }
            })

        }),
        getSpuSaleAttrList(spu.id).then((res: any) => {
            // console.log('sale',res)
            spuSaleAttrList.value = res.data


        }),
        getAllSaleAttrList().then((res: any) => {
            // console.log('all',res)
            allSaleAttrList.value = res.data

        }),

    ]).then(() => {

        // console.log(spu)
    })
})
emitter.on('addSpu', (value: any) => {
    getAllSpuList().then((res: any) => {

        spuBrandList.value = res.data
    })
    getAllSaleAttrList().then((res: any) => {
        // console.log('all',res)
        allSaleAttrList.value = res.data

    })
    fileList.value = []
    spuSaleAttrList.value = []
    allSaleAttrList.value = []
    Object.assign(spu, {
        category3Id: value,
        tmId: '',
        spuName: '',
        description: '',
        spuImageList: [],
        spuSaleAttrList: [],
    })




})
</script>
<style lang="scss" scoped>
.avatar-uploader .avatar {
    width: 178px;
    display: block;
}
</style>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>