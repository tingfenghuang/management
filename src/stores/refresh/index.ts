import { defineStore } from "pinia"
const useRefreshStore = defineStore("refresh", () => {
    let isRefresh = false

    return {
        isRefresh,
    }

})
export default useRefreshStore