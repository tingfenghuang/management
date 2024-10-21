<template>
    <el-card style="margin:10px 0;">
        <el-form style="display: flex; justify-content: space-between;">
            <el-form-item label="role name" style="width:30%;">
                <el-input placeholder="please input character name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">search</el-button>
                <el-button>remake</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-form>
            <el-form-item>
                <el-button type="primary" icon="Plus" @click="addRole">Add Role</el-button>
            </el-form-item>
            <el-form-item>
                <el-table :inline="true" border style="width: 99%;" :data="role">
                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column label="Id" prop="id"></el-table-column>
                    <el-table-column label="Role Name" prop="roleName"></el-table-column>
                    <el-table-column label="Create Time" prop="createTime"></el-table-column>
                    <el-table-column label="Update Time" prop="updateTime"></el-table-column>
                    <el-table-column label="Operation" width="350px">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" @click="editRole(row)">edit</el-button>
                            <el-button type="danger" size="small" @click="deleteRole(row)">delete</el-button>
                            <el-button type="success" size="small" @click="assignPermission(row)">assign
                                permission</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            background layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @change="pageChange" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
        <template #>
            <el-form :model="roleParmas" :rules="rules" ref="formRef">
                <el-form-item label="Role Name" prop="roleName">
                    <el-input placeholder="please input role name" v-model="roleParmas.roleName"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
    <el-drawer v-model="drawerVisible" title="Assign Permission" size="30%">
        <template #footer>
            <el-button type="default" @click="drawerVisible = false">Cancel</el-button>
            <el-button type="primary" @click="permissionSave">Confirm</el-button>
        </template>
        <template #default>
            <el-tree :data="menuList" show-checkbox node-key="id" default-expand-all :default-checked-keys="selectIds"
                :props="defaultProps" ref="treeRef">
            </el-tree>
        </template>

    </el-drawer>

</template>
<script lang="ts">
export default {
    name: 'Character'
}
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { roleList, addOrUpdateRole, getMenuByRoleId, assignPermission_,deleteRole_ } from '@/api/authority/role'
import { ElMessage } from 'element-plus'












const currentPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
const role = ref([])
const dialogVisible = ref(false)
const drawerVisible = ref(false)
const title = ref('')
const roleParmas = reactive({
    roleName: '',
    id: null

})
const formRef = ref()
const menuList = ref([])
const defaultProps = {
    children: 'children',
    label: 'name'
}
const selectIds = ref<any>([])
const treeRef = ref()







const validatorRoleName = (rule: any, value: any, callback: any) => {
    if (value.length < 2 || value.length > 10) {
        callback(new Error('the length of role name must be 2 to 10'))
    } else {
        callback()
    }
}
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validatorRoleName }
    ]
}






const getSelectedIds = (array: Array<any>) => {
    array.forEach((item: any) => {
        if (item.children.length > 0) {

            getSelectedIds(item.children)
        } else {
            if (item.select) {
                selectIds.value.push(item.id)
            }
        }
    })
}





const getRoleList = () => {
    roleList(currentPage.value, pageSize.value).then(res => {

        total.value = res.data.total
        role.value = res.data.records

    })
}
const save = () => {
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            addOrUpdateRole(roleParmas).then((res: any) => {
                if (res.code == 200) {
                    dialogVisible.value = false
                    getRoleList()
                } else {
                    ElMessage.error(res.msg)
                }
            })

        } else {
            ElMessage.error('the form is not valid')
        }
    })
}





const pageChange = (page: number) => {
    getRoleList()

}
const addRole = () => {
    dialogVisible.value = true
    title.value = 'Add Role'
    roleParmas.roleName = ''
    roleParmas.id = null
    nextTick(() => {
        formRef.value.clearValidate('roleName')

    })

}
const editRole = (row: any) => {
    dialogVisible.value = true
    title.value = 'Edit Role'
    roleParmas.roleName = row.roleName
    roleParmas.id = row.id
    console.log(roleParmas)
    nextTick(() => {
        formRef.value.clearValidate('roleName')
    })
}
const deleteRole = (row: any) => {
    deleteRole_(row.id).then((res: any) => {
        if (res.code == 200) {
            ElMessage.success('success')
            getRoleList()
        } else {
            ElMessage.error(res.msg)
        }
    })
}
const assignPermission = (row: any) => {
    roleParmas.id = row.id
    selectIds.value = []
    drawerVisible.value = true
    getMenuByRoleId(row.id).then((res: any) => {
        if (res.code == 200) {
            menuList.value = res.data
            getSelectedIds(menuList.value)

        } else {
            ElMessage.error(res.msg)
        }
    })
}
const permissionSave = () => {
    assignPermission_(roleParmas.id, treeRef.value.getCheckedKeys()).then((res: any) => {
        if (res.code == 200) {
            drawerVisible.value = false
            ElMessage.success('success')
            getRoleList()
        } else {
            ElMessage.error(res.msg)
        }
    })
}











onMounted(() => {
    getRoleList()
})

</script>
<style scoped></style>