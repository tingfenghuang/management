<template>
    <el-table style="width: 99%; margin-bottom: 20px;" row-key="id" border default-expand-all :data="tableData">
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Permission" prop="code"></el-table-column>
        <el-table-column label="Update Time" prop="updateTime"></el-table-column>
        <el-table-column label="Operation" prop="operation">
            <template #="{ row, $index }">
                <el-button size="small" type="primary" :disabled="row.level === 4" @click="addMenu(row, $index)">{{
                    row.level == 3 ? 'addFunction' :
                    'addMenu' }}</el-button>
                <el-button size="small" type="primary" :disabled="row.level == 1" @click="editMenu(row, $index)">edit
                    menu</el-button>
                <el-button size="small" type="primary" @click="deleteMenu(row, $index)">delete menu</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <template #="{ row, $index }">
            <el-form label-width="80px" :data="permissionsParmas">
                <el-form-item label="Name">
                    <el-input placeholder="please enter menu name" v-model="permissionsParmas.name"></el-input>
                </el-form-item>
                <el-form-item label="Permission">
                    <el-input placeholder="please enter permission code" v-model="permissionsParmas.code"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="save">Confirm</el-button>
        </template>
    </el-dialog>
</template>
<script lang="ts">
export default {
    name: 'MenuView'
}
</script>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { allPermissions, addOrUpdatePermission, deletePermission} from '@/api/authority/menu'
import { ElMessage } from 'element-plus'


const tableData = ref([])
const dialogVisible = ref(false)
const permissionsParmas = reactive({
    "name": '',
    "code": '',
    "id": null,
   "level": 0,
   "pid": 0
})



const editMenu = (row: any, index: number) => {
    dialogVisible.value = true
    permissionsParmas.name = row.name
    permissionsParmas.code = row.code
    permissionsParmas.id = row.id
    permissionsParmas.level = row.level
    permissionsParmas.pid = row.pid
    console.log(row,permissionsParmas)

}
const addMenu = (row: any, index: number) => {
    
    dialogVisible.value = true
    permissionsParmas.name = ''
    permissionsParmas.code = ''
    permissionsParmas.id = null
    permissionsParmas.level = row.level + 1
    permissionsParmas.pid = row.id
}

const useAllPermissions = () => {
    allPermissions().then(res => {
        tableData.value = res.data
    })
}

const deleteMenu = (row: any, index: number) => {
    deletePermission(row.id).then(res => {
        useAllPermissions()
        ElMessage.success('delete success')
    })
}
const save = () => {
    dialogVisible.value = false
    addOrUpdatePermission(permissionsParmas).then(res => {
        useAllPermissions()
    })
}


onMounted(() => {
    useAllPermissions()
})
</script>
<style scoped></style>