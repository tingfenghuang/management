import request from "@/tools/request"
enum API {
    login = "/admin/acl/index/login",
    logout = "/admin/acl/index/logout",
    userInfo = "/admin/acl/index/info",
}
export const reqLogin = (data: any) => {//登录
    return request({
        url: API.login,
        method: "post",
        data
    })
}
export const reqUserInfo = () => {//退出登录
    return request({
        url: API.userInfo,
        method: "get",
    })
}
export const reqLogout = () => {//获取用户信息
    return request({
        url: API.logout,
        method: "post",
    })
}