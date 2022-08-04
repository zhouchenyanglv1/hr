import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    const results = await login(data)
    if (results.data.success) {
      context.commit('setToken', results.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
