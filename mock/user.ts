
// test.ts
function createUserList() {
  return [{
    userId: 1,
    avatar: 'http://localhost:5173/src/assets/img/zzy.png',
    username: 'admin',
    password: 'atguigu123',
    desc: '平台管理员',
    roles: ['平台管理员'],
    buttons: ['cuser.detail'],
    routes: ['home'],
    token: 'Admin Token',
    nickName: 'admin'
  }, {
    userId: 2,
    avatar: '',
    username: 'system',
    password: '11111',
    desc: '系统管理员',
    roles: ['系统管理员'],
    buttons: ['cuser.detail'],
    routes: ['home'],
    token: 'System Token',
    nickName: 'system'
  },

  ]

}
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createUserList().find(
        item => item.username === username && item.password === password
      )
      if (!checkUser) {
        return {
          code: 1,
          data: {
            message: '用户名或密码错误',
          }
        }
      }
      const { token } = checkUser
      return {
        code: 200,
        data: {
          token,
        },
      }
    },
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ headers }) => {
      const token = headers.token
      const user = createUserList().find(item => item.token === token)
      if (!user) {
        return {
          code: 1,
          data: {
            message: '用户不存在',
          }
        }
      }
      return {
        code: 200,
        data: {
          ...user,
        },
      }

    }


  },

] as MockMethod[]