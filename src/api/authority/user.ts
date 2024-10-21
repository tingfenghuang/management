import request from '@/tools/request'
enum API {
    userList = '/admin/acl/user/',
    userAdd = '/admin/acl/user/save',
    userUpdate = '/admin/acl/user/update',
    role = '/admin/acl/user/toAssign/',
    roleAssign = '/admin/acl/user/doAssignRole',
    userDelete = '/admin/acl/user/batchRemove',
    userDanGeRemove = '/admin/acl/user/remove/'
}
export const getUserList = (page: any, limit: any, query: any) => {
    return request({
        url: API.userList + `${page}/${limit}?username=${query}`,
        method: 'get',
    })
}
export const addOrUpdateUser = (data: any) => {
    if (data.id) {
        return request({
            url: API.userUpdate,
            method: 'put',
            data
        })
    } else {
        return request({
            url: API.userAdd,
            method: 'post',
            data
        })
    }
}
export const getRoleList = (id: any) => {
    return request({
        url: API.role + id,
        method: 'get',
    })
}
export const assignRoles = (data: any) => {
    return request({
        url: API.roleAssign,
        method: 'post',
        data
    })
}
export const deleteBatchUser = (data: any) => {
    return request({
        url: API.userDelete,
        method: 'delete',
        data
    })
}
export const deleteSingleUser = (id: any) => {
    return request({
        url: API.userDanGeRemove + id,
        method: 'delete',
    })
}