import Http from '@/utils/httpUtil'
import storageUtil from '@/utils/storageUtil'

const userInfo = storageUtil.getUserInfo()
const user = {
  state: {
    status: '',
    code: '',
    token: userInfo.token,
    nickName: userInfo.nickName,
    phone: userInfo.phone,
    userId: userInfo.userId,
    userName: userInfo.userName,
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_USER: (state, user) => {
      state.name = user.name
      state.token = user.token
      state.nickName = user.nickName
      state.phone = user.phone
      state.userId = user.userId
      state.userName = user.userName
    },
    RESET_USER: (state) => {
      state.name = ''
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return Http.post('userInfo/login', {
        username: username,
        password: userInfo.password
      }).then((data) => {
        const token = data.data.token
        window._token = token
        localStorage.setItem('token', token)
        storageUtil.initUserInfo({
          ...data.data,
          isLogin: true
        })
        commit('SET_USER', data.data)
        return data.data
      })
    },

    CheckLogin({ commit }, userInfo) {
    },
    // 登出
    LogOut({ commit }) {
      return Http.get('userInfo/logout').then(() => {
        localStorage.removeItem('token')
        storageUtil.initUserInfo({
          isLogin: false
        })
        commit('RESET_USER')
      })
    }
  }
}

export default user
