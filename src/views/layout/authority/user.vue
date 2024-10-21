<template>
    <el-card style="height: 80px; margin-bottom: 10px">
        <el-form :inline="true" class="form">
            <el-form-item label="username" style="width:25%;">
                <el-input type="text" placeholder="Search..." v-model="keyword" </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="!keyword" @click="searchUser">search</el-button>
                <el-button type="primary" @click="reset">remake</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-form>
            <el-form-item>
                <el-button type="primary" @click="addUser">add</el-button>
                <el-button type="danger" @click="batchDelet">batchDelet</el-button>
            </el-form-item>
            <el-form-item>
                <el-table border @selection-change="handleSelectionChange" style="width: 99%; margin:10px,0 "
                    :data="records">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column label="Id" prop="id"></el-table-column>
                    <el-table-column label="Name" prop="username"></el-table-column>
                    <el-table-column label="NickName" prop="name"></el-table-column>
                    <el-table-column label="Role" prop="roleName"></el-table-column>
                    <el-table-column label="CreateTime" prop="createTime" />
                    <el-table-column label="UpdateTime" prop="updateTime" />
                    <el-table-column label="Operation" width="350px">
                        <template #="{ row, index }">
                            <el-button type="primary" icon="Edit" @click="editUser(row)">edit</el-button>
                            <el-button type="danger" icon="Delete" @click="deleteDanGeUser(row.id)">delete</el-button>
                            <el-button type="warning" icon="Document" @click="assignRole(row)">assignRole</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            background layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @change="pageChange" />
    </el-card>
    <el-drawer v-model="drawer" :title="title" :with-header="true" size="30%">
        <template #footer>
            <el-button @click="drawer = false">cancle</el-button>
            <el-button type="primary" @click="save">confirm</el-button>
        </template>
        <el-form style="width: 85%;" :model="form" :rules="rules" ref="formRef">

            <el-form-item label="Username" prop="username">
                <el-input type="text" placeholder="Please input username" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Nickname" prop="name">
                <el-input type="text" placeholder="Please input nickname" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input type="password" placeholder="Please input password" v-model="form.password"></el-input>
            </el-form-item>

        </el-form>

    </el-drawer>
    <el-drawer v-model="drawer_" :title="title_" :with-header="true" size="30%">
        <template #footer>
            <el-button type="primary" @click="drawer_ = false">cancle</el-button>
            <el-button type="primary" @click="save_">confirm</el-button>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="Username">
                    <el-input v-model="form.username" placeholder="Please input username" :disabled="true"> </el-input>
                </el-form-item>
                <el-form-item label="role">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                        Check all
                    </el-checkbox>
                    <el-checkbox-group v-model="checkRoles" @change="handleCheckedRolesChange">
                        <el-checkbox v-for="item in roles" :key="item.id" :label="item">{{ item.roleName
                            }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

        </template>
    </el-drawer>
</template>
<script lang="ts">
export default {
    name: 'User'
}
</script>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { getUserList, addOrUpdateUser, getRoleList, assignRoles, deleteSingleUser, deleteBatchUser } from '@/api/authority/user'
import { ElMessage } from 'element-plus'










const currentPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
const records = ref([])
const drawer = ref(false)
const drawer_ = ref(false)
const title = ref('')
const title_ = ref('')
const form = reactive<any>({
    id: null,
    username: '',
    name: '',
    password: ''
})
const formRef = ref<any>(null)
const checkAll = ref(false)
const isIndeterminate = ref(true)
const roles = ref<any>([])
const checkRoles = ref<any>([])
const userPrama = reactive<any>({

    "roleIdList": [

    ],
    "userId": null

})
let selectIds = ref<any>([])
const keyword = ref<any>('')


















const validatorUsernameAndNameAndPassword = (rule: any, value: string, callback: Function) => {
    if (value.trim().length < 6) {
        callback(new Error(' Must be at least 6 characters long'))
    } else {
        callback()
    }
};


const rules = {
    username: [
        { required: true, trigger: 'blur', validator: validatorUsernameAndNameAndPassword },

    ],
    name: [
        { required: true, trigger: 'blur', validator: validatorUsernameAndNameAndPassword },
    ],
    password: [
        { required: true, trigger: 'blur', validator: validatorUsernameAndNameAndPassword },
    ]
}












const pageChange = (page: number) => {
    useGetUserList()
}

const useGetUserList = () => {
    getUserList(currentPage.value, pageSize.value, keyword.value).then(res => {
        total.value = res.data.total
        records.value = res.data.records
    })
}

const addUser = () => {
    drawer.value = true
    form.username = ''
    form.name = ''
    form.password = ''
    title.value = 'Add User'
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })



}
const editUser = (row: any) => {
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')

    })

    title.value = 'Edit User'
    drawer.value = true
    form.username = row.username
    form.name = row.name
    form.password = row.password
    form.id = row.id
}
const deleteDanGeUser = (id: number) => {
    deleteSingleUser(id).then((res: any) => {
        if (res.code == 200) {
            useGetUserList()
        } else {
            ElMessage.error(res.msg)
        }
    })
}
const batchDelet = () => {
    if (selectIds.value.length == 0) {
        ElMessage.error('Please select at least one item')
        return
    }
    deleteBatchUser(selectIds.value).then((res: any) => {
        if (res.code == 200) {
            useGetUserList()
        } else {
            ElMessage.error(res.msg)
        }
    })


}
const assignRole = (row: any) => {

    drawer_.value = true
    title_.value = 'Assign Role'
    form.username = row.username
    userPrama.userId = row.id
    getRoleList(row.id).then((res: any) => {

        if (res.code === 200) {
            checkRoles.value = res.data.assignRoles
            roles.value = res.data.allRolesList
            isIndeterminate.value = checkRoles.value.length > 0 && checkRoles.value.length < roles.value.length

        }
    })
}
const searchUser = () => {
    useGetUserList()
}

const save = () => {
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            addOrUpdateUser(form).then((res: any) => {
                if (res.code == 200) {
                    useGetUserList()
                    drawer.value = false
                } else {
                    ElMessage.error(res.msg)
                }
            })
        } else {
            ElMessage.error('Please fill in the form correctly')
        }
    })
}
const save_ = () => {
    checkRoles.value.forEach((item: any) => {
        userPrama.roleIdList.push(item.id)
    })
    assignRoles(userPrama).then((res: any) => {
        if (res.code == 200) {
            useGetUserList()
            drawer_.value = false
        } else {
            ElMessage.error('Please fill in the form correctly')
        }
    })

}
const reset = () => {
    //刷新
    window.location.reload()

}

const handleClose = () => {
    drawer.value = false
    drawer_.value = false
}
const handleSelectionChange = (val: any) => {
    selectIds.value = val.map((item: any) => item.id)
}

const handleDelete = (row: any) => {
    addOrUpdateUser({ id: row.id, deleted: 1 }).then((res: any) => {

    })

}

const handleCheckAllChange = (val: boolean) => {
    isIndeterminate.value = false
    checkRoles.value = val ? roles.value : []
}
const handleCheckedRolesChange = (val: any) => {
    const checkedCount = val.length
    checkAll.value = checkedCount === roles.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length
}

onMounted(() => {
    useGetUserList()
})



</script>
<style scoped>
.form {
    display: flex;
    justify-content: space-between;
}
</style>