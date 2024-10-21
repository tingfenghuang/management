import { defineStore } from "pinia"
import { getCategory1, getCategory2, getCategory3 } from "@/api/shop/attr"
import { ref } from "vue"
const useShopAttrStore = defineStore("shopAttr", () => {
    let category1List = ref([])
    let category1Id = ref<any>(null)
    let category2List = ref([])
    let category2Id = ref<any>(null)
    let category3List = ref([])
    let category3Id = ref<any>(null)
    const getCategory1List = () => {
        getCategory1().then((res: any) => {
            if (res.code == 200) {
                category1List.value = res.data
            }
        })

    }
    const getCategory2List = () => {
        getCategory2(category1Id.value).then((res: any) => {
            if (res.code === 200) {
                category2List.value = res.data
            }

        })

    }
    const getCategory3List = () => {
        getCategory3(category2Id.value).then((res: any) => {
            if (res.code === 200) {
                category3List.value = res.data
            }

        })
    }
    return {
        category1List,
        getCategory1List,
        category1Id,
        category2List,
        getCategory2List,
        category2Id,
        category3List,
        getCategory3List,
        category3Id
    }


})
export default useShopAttrStore