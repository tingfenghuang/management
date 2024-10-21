import request from "@/tools/request"
enum API {
    permissions = "/admin/acl/permission",
    add = "/admin/acl/permission/save",
    update = "/admin/acl/permission/update",
    delete = '/admin/acl/permission/remove/'

}
export const allPermissions = () => request.get(API.permissions)
export const addOrUpdatePermission = (data: any) => {
    if (data.id) {
        return request.put(API.update, data)
    } else {
        return request.post(API.add, data)
    }
}
export const deletePermission = (id: number) => request.delete(API.delete + id)