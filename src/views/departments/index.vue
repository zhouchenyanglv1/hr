<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card v-loading="loading" class="tree-card">
        <!-- 头部内容 -->

        <treetool :treenode="company" :is-root="true" @openDialog="openDialog" />

        <!-- 组织列表 -->
        <el-tree :props="defaultProps" default-expand-all :data="departs">
          <treetool slot-scope="{data}" :treenode="data" @removeItem="getCompanyList" @openDialog="openDialog" />
        </el-tree>
      </el-card>
    </div>
    <addDept :show-dialog="showDialog" :tree-node="node" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import treetool from './components/tree-tool.vue'
import { getCompanyListAPI } from '@/api/department'
import { transListToTreeData } from '@/utils/index'
import addDept from './components/addDept.vue'
export default {
  components: {
    treetool,
    addDept
  },
  data() {
    return {
      activeName: 'first',
      departs: [],
      defaultProps: {
        label: 'name'
      },
      titleDropList: ['添加子部门'],
      containDropList: ['添加子部门', '编辑部门', ' 删除部门'],
      company: { name: '', manager: '负责人' },
      loading: true,
      showDialog: false,
      node: {}
    }
  },
  created() {
    this.getCompanyList()
  },
  methods: {
    async getCompanyList() {
      try {
        const res = await getCompanyListAPI()
        this.company.name = res.companyName
        const depart = res.depts
        console.log(res.depts)
        depart.splice(0, 1)
        const departList = transListToTreeData(depart, '')
        console.log(departList)
        this.departs = departList
        this.$message({
          message: '获取部门列表成功',
          type: 'success'
        })
      } catch (err) {
        this.$message.error('获取部门列表失败，请检查网络')
      }
      this.loading = false
    },
    openDialog(obj) {
      this.showDialog = true
      this.node = obj
    },
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped>
.tree-card{
   padding: 30px 140px;
   font-size: 14px;

}
</style>
