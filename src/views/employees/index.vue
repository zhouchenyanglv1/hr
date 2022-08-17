username<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 引入pagetools组件 -->
      <pagetools :show-left="true">
        <span slot="before">共{{ page.total }}条数据</span>
        <el-button slot="after" type="success" size="small">EXCEL导入</el-button>
        <el-button slot="after" type="danger" size="small">EXCEL导出</el-button>
        <el-button slot="after" type="primary" size="small" @click="addNewEmployees()">新增员工</el-button>
      </pagetools>
      <!-- 员工列表 -->
      <el-card>
        <el-table border :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formOfEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable="">正常</el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle">
          <el-pagination layout="prev, pager, next" :total="page.total" @current-change="changePage" />
        </el-row>
      </el-card>
      <!-- 员工信息弹层 -->
      <add-employees :show-dialog="showDialog" @close="closeDialog()" />
    </div>
  </div>
</template>

<script>
import { getEmployeesListAPI, delEmployeesAPI } from '@/api/employees'
import employeesEnum from '@/api/constant/employees'
import addEmployees from './departments/addEmployees.vue'
export default {
  components: {
    addEmployees
  },
  data() {
    return {
      employeesList: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 1
      },
      showDialog: false
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    async getEmployeesList() {
      const data = { page: this.page.page, pagesize: this.page.pagesize }
      const res = await getEmployeesListAPI(data)
      this.employeesList = res.rows
      this.page.total = res.total
      console.log(res)
    },
    changePage(val) {
      this.page.page = val
      this.getEmployeesList()
    },
    formOfEmployment(row, column, cellValue, index) {
      const obj = employeesEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async del(index) {
      try {
        const getId = this.employeesList[index].id
        await this.$confirm('确认要删除吗?')
        await delEmployeesAPI(getId)
      } catch (error) {
        console.log(error)
        return
      }
      this.$message.success('删除员工成功')
      this.getEmployeesList()
    },
    addNewEmployees() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
