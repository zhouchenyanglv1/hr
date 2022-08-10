<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 头部内容 -->

        <treetool :treenode="company" :is-root="true" />

        <!-- 组织列表 -->
        <el-tree :props="defaultProps" default-expand-all :data="departs">
          <!-- <el-row slot-scope="{data}" type="flex" justify="space-between" align="middle" style="height:40px;width: 100%;">
            <el-col style="font-weight:600">{{ data.name }}</el-col>
            <el-col span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <el-dropdown>
                    <span>操作  <i class="el-icon-arrow-down" /></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row> -->
          <treetool slot-scope="{data}" :treenode="data" :is-root="false" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treetool from './components/tree-tool.vue'
export default {
  components: {
    treetool
  },
  data() {
    return {
      activeName: 'first',
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name'
      },
      titleDropList: ['添加子部门'],
      containDropList: ['添加子部门', '编辑部门', ' 删除部门'],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
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
