<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeTag">
          <el-tab-pane label="角色管理" name="first">
            <div class="charactorBox">
              <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom:15px">新增角色</el-button>
              <!-- 员工列表组件 -->
              <charactor-list :info="charactor" />
              <!-- 分页组件 -->
              <el-row style="float:right;margin-top:10px">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="page.total"
                  :page-size="page.pagesize"
                  @current-change="changePage"
                />
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <!-- 公司信息 -->
            <el-alert type="info" title="修改后资料会被重新审核,请谨慎修改" :closable="false" :show-icon="true" />

            <el-form
              label-width="120px"
              :model="companyInfo"
              style="margin-top:20px;margin-left: 100px;"
              size="mini"
              disabled
            >
              <el-form-item label="企业名称" style="width:400px">
                <el-input v-model="companyInfo.name" />
              </el-form-item>
              <el-form-item label="公司地址" style="width:400px">
                <el-input v-model="companyInfo.address" />
              </el-form-item>
              <el-form-item label="公司电话" style="width:400px">
                <el-input v-model="companyInfo.phone" />
              </el-form-item>
              <el-form-item label="邮箱" style="width:400px">
                <el-input v-model="companyInfo.email" />
              </el-form-item>
              <el-form-item label="备注" style="width:400px">
                <el-input v-model="companyInfo.textarea" type="textarea" resize="none" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import charactorList from './departments/charactorList.vue'
import { getCharactorListAPI } from '@/api/setting'
export default {
  components: {
    charactorList
  },
  data() {
    return {
      activeTag: 'first',
      companyInfo: {
        name: '',
        address: '',
        phone: '',
        email: '',
        textarea: ''
      },
      page: {
        page: 1,
        pagesize: 5,
        total: 1
      },
      charactor: []

    }
  },
  created() {
    this.getCharactorList()
  },
  methods: {
    async getCharactorList() {
      const res = await getCharactorListAPI(this.page)
      console.log(res)
      this.page.total = res.total
      this.charactor = res.rows
    },
    async changePage(val) {
      this.page.page = val
      this.getCharactorList()
    }
  }

}
</script>

<style scoped  >
::v-deep .charactorBox{
   padding: 30px;
}
</style>
