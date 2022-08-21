<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="formData" label-width="120px" style="margin-left: 120px; margin-top:30px" :model="loginSetting" :rules="rules">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="loginSetting.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="loginSetting.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetail">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <component :is="userComponent" :prop-user-info="userInfo" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <component :is="jobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetalById } from '@/api/user'
import { saveUserDetailAPI } from '@/api/employees'
import userinfoVue from '../departments/user-info.vue'
import jobinfo from '../departments/job-info.vue'
export default {
  components: {
    userinfoVue,
    jobinfo

  },
  props: {
    id: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      userComponent: 'userinfoVue',
      jobComponent: 'jobinfo',
      getId: '',
      userInfo: {},
      loginSetting: {
        username: '',
        password: '',
        id: '',
        mobile: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码,密码长度为6-9位', trigger: 'blur', min: 6, max: 9 }]
      }
    }
  },
  mounted() {
    this.getId = (this.$route, this.id)
    this.loginSetting.id = this.getId
  },
  created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const res = await getUserDetalById(this.id)
      this.userInfo = res
      console.log(this.userInfo)
      this.loginSetting.username = this.userInfo.username
      this.loginSetting.password = this.userInfo.password
      this.loginSetting.mobile = this.userInfo.mobile
    },
    saveUserDetail() {
      try {
        this.$refs.formData.validate().then(async() => {
          const data = this.loginSetting
          const res = await saveUserDetailAPI(data)
          console.log(res)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
