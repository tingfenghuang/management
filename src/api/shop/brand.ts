import request from "@/tools/request"
enum API {
    getBrandList = "admin/product/baseTrademark",
    addBrand = "/admin/product/baseTrademark/save",
    updateBrand = "/admin/product/baseTrademark/update",
    deleteBrand = "/admin/product/baseTrademark/remove/"
}
export const getBrandList = (page: any, limit: any) => {
    return request({
        method: "get",
        url: API.getBrandList + `/${page}/${limit}`
    })
}
export const addOrUpdateBrand = (data: any) => {
    if (data.id) {
        return request({
            method: "put",
            url: API.updateBrand,
            data
        })
    } else {
        return request({
            method: "post",
            url: API.addBrand,
            data
        })
    }
}
export const deleteBrand = (id: any) => {
    return request({
        method: "delete",
        url: `${API.deleteBrand}${id}`
    })
}