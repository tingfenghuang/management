import request from "@/tools/request"
enum API {
    roleList = '/admin/acl/role/{page}/{limit}',
    addRole = '/admin/acl/role/save',
    updateRole = '/admin/acl/role/update',
    getMenuByRoleId = '/admin/acl/permission/toAssign/{roleId}',
    assignPermission = '/admin/acl/permission/doAssign/?',
    deleteRole = '/admin/acl/role/remove/{id}'
}
export const roleList = (page: number, limit: number) => {
    return request({
        url: API.roleList.replace('{page}', page.toString()).replace('{limit}', limit.toString()),
        method: 'get'
    })
}
export const addOrUpdateRole = (data: any) => {
    if (data.id) {
        return request({
            url: API.updateRole,
            method: 'put',
            data
        })
    } else {
        return request({
            url: API.addRole,
            method: 'post',
            data
        })
    }

}
export const getMenuByRoleId = (roleId: number) => {
    return request({
        url: API.getMenuByRoleId.replace('{roleId}', roleId.toString()),
        method: 'get'
    })
}
export const assignPermission_ = (roleId: any, permissionId: number[]) => {
    return request({
        url: API.assignPermission + `roleId=${roleId}&permissionId=${permissionId}`,
        method: 'post'
    })

}
export const deleteRole_ = (id: number) => {
    return request({
        url: API.deleteRole.replace('{id}', id.toString()),
        method: 'delete'
    })
}