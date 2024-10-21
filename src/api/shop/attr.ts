import request from "@/tools/request"
enum API {
    //获取一级分类
    c1 = '/admin/product/getCategory1',
    c2 = '/admin/product/getCategory2/',
    c3 = '/admin/product/getCategory3/',
    getAttrList = '/admin/product/attrInfoList/',
    addOrUpdateAttr = '/admin/product/saveAttrInfo',
    deletedAttr = '/admin/product/deleteAttr/'
}
export const getCategory1 = () => {
    return request.get(API.c1)
}
export const getCategory2 = (id: number) => {
    return request.get(API.c2 + id)
}
export const getCategory3 = (id: number) => {
    return request.get(API.c3 + id)
}
export const getAttrList = (id: number, id2: number, id3: number) => {
    return request.get(API.getAttrList + id + '/' + id2 + '/' + id3)
}
export const addOrUpdateAttr = (data: any) => {
    return request.post(API.addOrUpdateAttr, data)
}
export const deletedAttr = (id: number) => {
    return request({
        url: API.deletedAttr + id,
        method: 'delete'
    })
}