import store from '@/store'
import errorImage from '@/assets/common/head.jpg'
export default {
  methods: {
    checkPermission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    },
    imageErrorAll(e) {
      e.target.src = errorImage
    }
  }
}
