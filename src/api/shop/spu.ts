import request from "@/tools/request"

enum API {
    spuList = "/admin/product/",
    allSpuList = "/admin/product/baseTrademark/getTrademarkList",
    imgList = "/admin/product/spuImageList/",
    spuSaleAttrList = "/admin/product/spuSaleAttrList/",
    allSaleAttrList = "/admin/product/baseSaleAttrList",
    addSpu = "/admin/product/saveSpuInfo",
    updateSpu = "/admin/product/updateSpuInfo",
    addSku = "/admin/product/saveSkuInfo",
    skuList = "/admin/product/findByPage/",
    removeSpu = "/admin/product/deleteSpu/"

}

export const getSpuList = (page: number, limit: number, category3Id: number) => {
    return request({
        url: `${API.spuList}${page}/${limit}?category3Id=${category3Id}`,
        method: "get",
    })
}
export const getAllSpuList = () => {
    return request({
        url: API.allSpuList,
        method: "get",
    })
}
export const getSpuImgList = (spuId: number) => {
    return request({
        url: `${API.imgList}${spuId}`,
        method: "get",
    })
}
export const getSpuSaleAttrList = (spuId: number) => {
    return request({
        url: `${API.spuSaleAttrList}${spuId}`,
        method: "get",
    })
}
export const getAllSaleAttrList = () => {
    return request({
        url: API.allSaleAttrList,
        method: "get",
    })
}
export const addOrupdateSpu = (data: any) => {
    return request({
        url: data.id ? API.updateSpu : API.addSpu,
        method: "post",
        data
    })
}
export const addSku_ = (data: any) => {
    return request({
        url: API.addSku,
        method: "post",
        data
    })
}
export const getSkuList = (spuId: number) => {
    return request({
        url: API.skuList + spuId,
        method: "get",
    })
}
export const removeSpu = (spuId: number) => {
    return request({
        url: API.removeSpu + spuId,
        method: "delete",
    })
}
