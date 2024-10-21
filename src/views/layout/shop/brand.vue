<template>
  <div class="brand">
    <el-card style="width: 100%;">
      <el-button type="primary" style="margin-bottom: 10px;" @click="addBrand">
        <el-icon>
          <Plus />
        </el-icon>
        <span>Add brand</span>
      </el-button>
      <el-table border class="table" :data="tradeMarkList" style="margin: 10px 0; width: 99%">
        <el-table-column label="serial" width="80px" type="index" />
        <el-table-column label="Name">
          <template #default="{ row }">
            <div class="center-content">
              <h1>{{ row.tmName }}</h1>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="logo">
          <template #="{ row, $index }">
            <div class="center-content">
              <img :src="row.logoUrl" style="height: 100px;" alt="No logo">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="operation">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="updateBrand(row)">Edit</el-button>
            <el-popover placement="top" :width="160">
              <p>Are you sure to delete this?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="small" text>cancel</el-button>
                <el-button size="small" type="primary" @click="confirmDelete(row)">
                  confirm
                </el-button>
              </div>
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">Delete</el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize4" :page-sizes="[4, 8, 12, 16]"
        background layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @change="change" />
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="title" width="500">
      <el-form style="width: 80%;" :rules="rules" :model="brandParams" ref="formRef">
        <el-form-item label="Brand Name" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="brandParams.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="logo" label-width="140px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="true"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="brandParams.logoUrl" :src="brandParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirm">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { getBrandList, addOrUpdateBrand, deleteBrand } from '@/api/shop/brand';
import { ref, onMounted, reactive, watch } from 'vue';
import type { UploadProps } from 'element-plus';
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('Brand name must be at least 2 characters long'));
  } else {
    callback();
  }
}
const validdatateLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('Please upload a logo'));

  }

}

// 校验规则
let formRef = ref<any>(null)


const rules = reactive({
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validateTmName
    },

  ],
  logoUrl: [
    { required: true, trigger: 'blur', validator: validdatateLogoUrl }
  ]
});
const brandParams = reactive({
  tmName: '',
  logoUrl: '',
  id: null

});

// Handle successful upload
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  //response:是后端返回的值，是图片的url
  //uploadFile:是上传的文件信息

  brandParams.logoUrl = response.data
  // console.log(response.data)
  //清理图片校验信息
  formRef.value.clearValidate('logoUrl')


}

// Validate file before upload
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('Avatar picture size cannot exceed 10MB!');
    return false;
  }
  brandParams.logoUrl = URL.createObjectURL(rawFile);
  return true;
}

const confirm = () => {
  formRef.value.validate().then(() => {
    addOrUpdateBrand({ tmName: brandParams.tmName, logoUrl: brandParams.logoUrl, id: brandParams.id }).then((res: any) => {
      // console.log(brandParams.logoUrl)
      Object.assign(brandParams, { tmName: '', logoUrl: '', id: null })

      console.log(res)
      if (res.code === 200) {
        dialogFormVisible.value = false

        ElMessage.success('successfully')
        getBrandList(currentPage.value, pageSize4.value).then(res => {
          total.value = res.data.total;
          Object.assign(tradeMarkList, res.data.records);

        })

      } else {
        ElMessage.error('failed')
      }

    })

  }, () => {
    ElMessage.error('Please fill in the form correctly')
  })


}

// Pagination and table data
const currentPage = ref<number>(1);
const pageSize4 = ref<number>(4);
const tradeMarkList = reactive<any[]>([]);
const total = ref<number>(0);
const title = ref<string>('Add Brand');

// Show dialog for adding a brand
const addBrand = () => {
  dialogFormVisible.value = true
  title.value = 'Add Brand'
  brandParams.tmName = ''
  brandParams.logoUrl = ''
  brandParams.id = null
  //清除所有校验信息
  formRef.value?.clearValidate('logoUrl')
  //清除所有校验信息
  formRef.value?.clearValidate('tmName')

}


const updateBrand = (row: any) => {

  dialogFormVisible.value = true
  brandParams.tmName = row.tmName
  brandParams.logoUrl = row.logoUrl
  brandParams.id = row.id
  title.value = 'Update Brand'
  formRef.value?.clearValidate('logoUrl')
  //清除所有校验信息
  formRef.value?.clearValidate('tmName')




}

// Fetch brand list data
const change = () => {
  getBrandList(currentPage.value, pageSize4.value).then(res => {
    total.value = res.data.total
    Object.assign(tradeMarkList, res.data.records)
  })
}

// Initialize data on component mount
const gBrandList = () => {
  getBrandList(currentPage.value, pageSize4.value).then(res => {
    total.value = res.data.total
    Object.assign(tradeMarkList, res.data.records)
  })
}

onMounted(() => {
  gBrandList()
})

watch(() => pageSize4.value, () => {
  currentPage.value = 1
})

// Dialog visibility and form label width
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const confirmDelete = (row: any) => {
  deleteBrand(row.id).then((res: any) => {
    console.log(row)
    if (res.code === 200) {
      ElMessage.success('Delete successfully')
      getBrandList(currentPage.value, pageSize4.value).then(res => {
        total.value = res.data.total
        Object.assign(tradeMarkList, res.data.records)
      })

    } else {
      ElMessage.error('Delete failed')
    }
  })
}

</script>

<style lang="scss" scoped>
.brand {
  .avatar-uploader .avatar {
    width: 178px;
    display: block;
  }

  h1 {
    font-family: 'Arial', sans-serif;
    font-size: 18px;
    // color: white;
  }

  :deep(.el-card) {
    // background-color: transparent;
    // border: none;

    .table {
      margin-bottom: 10px;
    }
  }

  // :deep(.el-table) {
  //   background-color: transparent;
  //   --el-table-tr-bg-color: transparent;
  //   --el-table-bg-color: transparent;
  //   --el-table-header-bg-color: transparent;
  //   --el-table-row-hover-bg-color: rgba(0, 0, 0, 0.1);
  //   --el-table-border: 1px solid rgba(0, 0, 0, 0.1);
  //   --el-table-border-color: transparent;
  //   --el-table-text-color: #000;
  //   --el-table-header-text-color: #000;
  // }
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
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