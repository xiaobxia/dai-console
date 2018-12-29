function checkIn(userRoles, roleList) {
  for (let i = 0; i < userRoles.length; i++) {
    const userRole = userRoles[i]
    for (let j = 0; j < userRoles.length; j++) {
      const roleItem = roleList[j]
      if (roleItem === userRole) {
        return true
      }
    }
  }
}
function checkPermission(userRoles, current) {
  // roles :{include, exclude}
  const roleMap = current.meta && current.meta.roles
  if (roleMap) {
    let permission = true
    const include = roleMap.include
    const exclude = roleMap.exclude
    // 存在于include
    if (include) {
      permission = checkIn(userRoles, include)
    }
    // 存在于exclude
    if (exclude && checkIn(userRoles, exclude)) {
      permission = false
    }
    // exclude有决定权
    return permission
  } else {
    // 没有权限要求
    return true
  }
}

function isSamePath(user, current) {
  if (user === current) {
    return true
  } else {
    if (current === '/system/auth/user' && user === '/permission/sysUserInfoPageData') {
      return true
    }
    if (current === '/system/auth/role' && user === '/permission/sysRoleInfoPageData') {
      return true
    }
    if (current === '/system/auth/menu' && user === '/permission/sysMenuInfoPageData') {
      return true
    }
    if (current === '/system/auth/menuButton' && user === '/permission/sysButtonInfoPageData') {
      return true
    }
  }
  return false
}
function checkInUserRouter(userRouter, path) {
  let ifIn = false
  for (let i = 0; i < userRouter.length; i++) {
    const router = userRouter[i]
    if (router.child && router.child.length > 0) {
      if (checkInUserRouter(router.child, path)) {
        ifIn = true
        break
      }
    } else {
      if (isSamePath(router.url, path)) {
        ifIn = true
        break
      }
    }
  }
  return ifIn
}

function checkPermissionBackend(userRouter, current) {
  let lastLink = ''
  const meta = current.meta
  if (meta.isLeaf === 2) {
    if (checkInUserRouter(userRouter, meta.link)) {
      return meta.link
    }
  } else {
    // 如果是目录，那子菜单有就行
    if (current.children && current.children.length > 0) {
      for (let i = 0; i < current.children.length; i++) {
        const link = checkPermissionBackend(userRouter, current.children[i])
        if (link) {
          lastLink = link
          break
        }
      }
    }
  }
  return lastLink
}

function checkPermissionInFlat(flatUserRouters, current) {
  for (let i = 0; i < flatUserRouters.length; i++) {
    if (isSamePath(flatUserRouters[i], current.path)) {
      return true
    }
  }
  return true
}

function getTitle(userRouter, path, level, nowLevel) {
  let ifIn = false
  let title = ''
  for (let i = 0; i < userRouter.length; i++) {
    const router = userRouter[i]
    if (router.child && router.child.length > 0) {
      const tempTitle = getTitle(router.child, path, level, nowLevel + 1)
      if (tempTitle) {
        if (tempTitle !== true) {
          title = tempTitle
        } else if (level === nowLevel) {
          title = router.name
        }
        ifIn = true
        break
      }
    } else {
      if (isSamePath(router.url, path)) {
        ifIn = true
        if (level === nowLevel) {
          title = router.name
        }
        break
      }
    }
  }
  if (title) {
    return title
  }
  return ifIn
}

function findTitle(userRouter, link, level) {
  // 进入这个函数，那么一定是有title的
  return getTitle(userRouter, link, level, 1)
}

export default {
  checkPermission,
  checkPermissionBackend,
  checkPermissionInFlat,
  findTitle
}
