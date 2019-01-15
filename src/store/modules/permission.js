import { asyncRouterMap, constantRouterMap } from '@/router'
import permissionUtil from '@/utils/permission'
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (permissionUtil.checkPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

function filterAsyncRouterBackend(routes, data, level) {
  level = level || 1
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    const link = permissionUtil.checkPermissionBackend(data, tmp, level)
    if (link) {
      if (tmp.children) {
        tmp.children = filterAsyncRouterBackend(tmp.children, data, level + 1)
      }
      tmp.meta.title = permissionUtil.findTitle(data, link, level)
      res.push(tmp)
    }
  })
  return res
}

function getPath(routers) {
  let paths = []
  for (let i = 0; i < routers.length; i++) {
    const router = routers[i]
    if (router.url) {
      paths.push(router.url)
    } else {
      if (router.child && router.child.length > 0) {
        paths = paths.concat(getPath(router.child))
      }
    }
  }
  return paths
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    flatUserRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      routers = routers.concat([{ path: '*', redirect: '/404', hidden: true }])
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      console.log(constantRouterMap.concat(routers))
    },
    SET_FLAT_USR_ROUTERS: (state, routers) => {
      state.flatUserRouters = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        commit('SET_ROUTERS', filterAsyncRouter(asyncRouterMap, roles))
        resolve()
      })
    },
    GenerateRoutesBackend({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', filterAsyncRouterBackend(asyncRouterMap, data))
        resolve()
      })
    },
    CreateFlatUserRouters({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_FLAT_USR_ROUTERS', getPath(data))
        resolve()
      })
    }
  }
}

export default permission
