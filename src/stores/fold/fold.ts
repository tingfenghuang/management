import { defineStore } from "pinia"
const useFoldStore = defineStore("fold", () => {
    let isFold = false

    return {
        isFold,

    }

})
export default useFoldStore