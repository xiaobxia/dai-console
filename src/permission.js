import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import storageUtil from '@/utils/storageUtil'
import permissionUtil from '@/utils/permission'
import Http from '@/utils/httpUtil'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('beforeEach')
  console.log(to)
  const userInfo = storageUtil.getUserInfo()
  if (userInfo.isLogin === true) {
    // 登入了还去登录，直接转首页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const all = false
      // 没有生成过
      if (store.getters.addRouters.length === 0) {
        if (all) {
          store.dispatch('GenerateRoutes', { roles: userInfo.roles }).then(() => {
            console.log('生成菜单')
            console.log(store.getters.addRouters)
            // router里面原本只有基础的路由，是后来添加的有权限的路由
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        } else {
          // 后端返还
          Http.get('userInfo/mainPage').then((res) => {
            const menuList = JSON.parse(res.data)
            console.log(menuList)
            store.dispatch('CreateFlatUserRouters', menuList)
            store.dispatch('GenerateRoutesBackend', menuList).then(() => {
              console.log('生成菜单')
              // router里面原本只有基础的路由，是后来添加的有权限的路由
              router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
            })
          })
        }
      }
      let permission = false
      if (all) {
        permission = permissionUtil.checkPermission(userInfo.roles, to)
      } else {
        permission = permissionUtil.checkPermissionInFlat(store.getters.flatUserRouters, to)
      }
      if (permission) {
        next()
      } else {
        next({ path: '/401', replace: true, query: { noGoBack: true }})
      }
    }
  } else {
    // 直接进入
    if (to.meta && to.meta.auth === false) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
