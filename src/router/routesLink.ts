import Home from '@/views/layout/home/index.vue'
import NotFound from '@/views/404/index.vue'
import Login from '@/views/login/index.vue'
import Authority from '@/views/layout/authority/index.vue'
import Layout from '@/views/layout/index.vue'
import Shop from '@/views/layout/shop/index.vue'
import Data from '@/views/layout/dataScreen/index.vue'
import Sku from '@/views/layout/shop/sku.vue'
import Spu from '@/views/layout/shop/spu.vue'
import Attribute from '@/views/layout/shop/attribute.vue'
import Brand from '@/views/layout/shop/brand.vue'
import User from '@/views/layout/authority/user.vue'
import Character from '@/views/layout/authority/character.vue'
import MenuView from '@/views/layout/authority/menu.vue'
const constRoutes = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        title: 'Login',
        icon: 'Avatar'
    }
},
{
    path: '/data',
    name: 'data',
    component: Data,
    meta: {
        title: 'Data',
        icon: 'DataLine'
    }
},
{
    path: '/layout/home',
    name: 'Home',
    component: Home,
    meta: {
        title: 'Home',
        icon: 'House'
    },


},
{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/404',

},
{
    path: '/',
    redirect: '/login',

},
{
    path: '/404',
    name: '404',
    component: NotFound,

},

]
//数组解构
const [login, data, home, any, default_, notFound] = constRoutes

const asyncRoutes = [{
    path: '/layout/shop',
    name: 'Shop',
    component: Shop,
    meta: {
        title: 'Shop',
        icon: 'ShoppingCart'
    },
    redirect: '/layout/shop/sku',
    children: [
        {
            path: '/layout/shop/sku',
            name: 'Sku',
            component: Sku,
            meta: {
                title: 'Sku',
                icon: 'PhoneFilled'
            }
        },
        {
            path: '/layout/shop/spu',
            name: 'Spu',
            component: Spu,
            meta: {
                title: 'Spu',
                icon: 'Opportunity'
            }
        },
        {
            path: '/layout/shop/attribute',
            name: 'Attribute',
            component: Attribute,
            meta: {
                title: 'Attribute',
                icon: 'Paperclip'
            }
        },
        {
            path: '/layout/shop/brand',
            name: 'Brand',
            component: Brand,
            meta: {
                title: 'Brand',
                icon: 'Present'
            }
        }
    ]
},
{
    path: 'layout/authority',
    name: 'Authority',

    component: Authority,
    meta: {
        title: 'Authority',
        icon: 'User'
    },
    redirect: '/layout/authority/user',

    children: [
        {
            path: '/layout/authority/user',
            name: 'User',
            component: User,
            meta: {
                title: 'User',
                icon: 'Watermelon'
            }
        },
        {
            path: '/layout/authority/menu',
            name: 'Menu',
            component: MenuView,
            meta: {
                title: 'Menu',
                icon: 'Pear'
            }
        },

        {
            path: '/layout/authority/Character',
            name: 'Character',
            component: Character,
            meta: {
                title: 'Character',
                icon: 'Eleme'
            }
        }

    ]

}]
const [shop, authority] = asyncRoutes
export const routeImportant = [ //要在菜单中展示的路由

    data,
    home,
    shop,
    authority




]
const routeImportantNot = [{
    path: '/layout',
    redirect: '/layout/home',
    name: 'Layout',
    component: Layout,
    children: routeImportant.filter(item => item.name !== 'Login' && item.name !== 'Data')
    //重定向

},

    login,
    data,
    any,
    default_,
    notFound
]
export const routesLink = routeImportantNot//整体路由


