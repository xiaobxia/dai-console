import Http from '@/utils/httpUtil'
import md5 from 'md5'
import storageUtil from '@/utils/storageUtil'

const userInfo = storageUtil.getUserInfo()
const user = {
  state: {
    status: '',
    code: '',
    token: userInfo.token,
    name: userInfo.name,
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
      return Http.post('auth/login', {
        account: username,
        password: md5(userInfo.password),
        platform: 'pc'
      }).then((data) => {
        window._token = data.data.token
        localStorage.setItem('token', data.data.token)
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
      return Http.get('auth/logout', {
        token: localStorage.getItem('token'),
        platform: 'mobile'
      }).then(() => {
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
