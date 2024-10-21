import LeftNav from "./leftNav/leftNav.vue"
import Tabbar from "./tabbar/tabbar.vue"
import Category from "./category/category.vue"
import Top_ from "./screen/top.vue"
import Youke from "./screen/youke.vue"
import Sex from "./screen/sex.vue"
import Age from "./screen/age.vue"
import ChinaMap from "./screen/chinaMap.vue"
import Youke_30 from "./screen/youke_30.vue"
import Rank_ from "./screen/rank.vue"
import Year from "./screen/year.vue"
import Qudao from "./screen/qudao.vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
const allGlobalComponents = {
    LeftNav,
    Tabbar,
    Category,
    Top_,
    Youke,
    Sex,
    Age,
    ChinaMap,
    Youke_30,
    Rank_,
    Year,
    Qudao

}
export default {
    install(app: any) {
        Object.keys(allGlobalComponents).forEach((key) => {
            app.component(key, (allGlobalComponents as Record<string, any>)[key])
        })
        // 注册element-plus图标
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}