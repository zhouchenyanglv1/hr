import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
import { getUserInfo, getUserDetalById } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const results = await login(data)
    context.commit('setToken', results)
  },
  async getUserInfo(context) {
    const results = await getUserInfo()
    const baseInfo = await getUserDetalById(results.userId)
    const infoObj = { ...results, ...baseInfo }
    context.commit('setUserInfo', infoObj)
    return infoObj
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    resetRouter()
    context.commit('permission/setRoutes', [], { root: true })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
