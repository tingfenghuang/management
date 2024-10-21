import request from "@/tools/request"
enum API {
    skuList = "/admin/product/list/{page}/{limit}",
    skuOnSale = "/admin/product/onSale/{skuId}",
    skuCancelSale = "/admin/product/cancelSale/{skuId}",
    skuDetail = "/admin/product/getSpuInfo/{skuId}",
    skuDelete = "/admin/product/deleteSku/{skuId}",
}
export const getSkuList_ = (page: number, limit: number) => {
    return request({
        url: API.skuList.replace("{page}", page.toString()).replace("{limit}", limit.toString()),
        method: "get",
    })
}
export const skuOnSale_ = (skuId: number) => {
    return request({
        url: API.skuOnSale.replace("{skuId}", skuId.toString()),
        method: "get",
    })
}
export const skuCancelSale_ = (skuId: number) => {
    return request({
        url: API.skuCancelSale.replace("{skuId}", skuId.toString()),
        method: "get",
    })
}
export const getSkuDetail_ = (skuId: number) => {
    return request({
        url: API.skuDetail.replace("{skuId}", skuId.toString()),
        method: "get",
    })
}
export const deleteSku_ = (skuId: number) => {
    return request({
        url: API.skuDelete.replace("{skuId}", skuId.toString()),
        method: "delete",
    })
}