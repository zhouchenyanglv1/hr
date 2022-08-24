username<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 引入pagetools组件 -->
      <pagetools :show-left="true">
        <span slot="before">共{{ page.total }}条数据</span>
        <el-button slot="after" type="success" size="small" @click="jumpToImportExcel">EXCEL导入</el-button>
        <el-button slot="after" type="danger" size="small" @click="exportExcel">EXCEL导出</el-button>
        <el-button slot="after" type="primary" size="small" @click="addNewEmployees()">新增员工</el-button>
      </pagetools>
      <!-- 员工列表 -->
      <el-card>
        <el-table border :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" align="center">
            <template v-slot="{row}">
              <img ref="staffImage" :src="row.staffPhoto" alt="" style="border-radius: 50%; width: 100px; height: 100px; padding: 10px" @error="imageError" @click="showQrCode(row.staffPhoto)">
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formOfEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="scope"> {{ scope.row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">正常</el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="jumpToDetail(scope.row)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="openRollDialog(scope.row)">角色</el-button>
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
      <add-employees :show-dialog="showDialog" @close="closeDialog()" @refresh="getEmployeesList()" />
      <!-- 二维码弹层 -->
      <el-dialog title="二维码" :visible.sync="showCodeDialog">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
      <!-- 角色弹层 -->
      <assignRoll ref="rollDialog" :show-roll-dialog="showRollDialog" :user-id="rollUserId" @close="showRollDialog=false" />
    </div>
  </div>
</template>

<script>
import qrCode from 'qrcode'
import { getEmployeesListAPI, delEmployeesAPI } from '@/api/employees'
import employeesEnum from '@/api/constant/employees'
import addEmployees from './departments/addEmployees.vue'
import errorImage from '@/assets/common/head.jpg'
import assignRoll from './departments/assign-roll.vue'
export default {
  components: {
    addEmployees,
    assignRoll
  },
  data() {
    return {
      showRollDialog: false,
      errImgUrl: [],
      showCodeDialog: false,
      employeesList: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 1
      },
      showDialog: false,
      rollUserId: ''
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    async openRollDialog(row) {
      this.rollUserId = row.id
      await this.$refs.rollDialog.getUserDetalById(row.id)
      this.showRollDialog = true
    },
    async getEmployeesList() {
      const data = { page: this.page.page, pagesize: this.page.pagesize }
      const res = await getEmployeesListAPI(data)
      this.employeesList = res.rows
      this.page.total = res.total
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
    },
    jumpToImportExcel() {
      this.$router.push('/import')
    },
    exportExcel() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      const header = ['手机号', '姓名', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const result = []
      this.employeesList.forEach(item => {
        const arr = []
        const key1 = Object.values(headers)
        const key2 = Object.keys(item)
        const key3 = Object.values(item)
        key1.forEach(obj1 => {
          const arr2 = []
          key2.forEach(obj2 => {
            if (obj2 === obj1) {
              if (obj2 === 'formOfEmployment') {
                if (key3[key2.indexOf(obj2)] === 1) {
                  arr2.push('正式')
                } else if (key3[key2.indexOf(obj2)] === 2) {
                  arr2.push('非正式')
                } else {
                  arr2.push(key3[key2.indexOf(obj2)])
                }
                return
              }
              arr2.push(key3[key2.indexOf(obj2)])
            }
          })
          arr[key1.indexOf(obj1)] = arr2
        })
        result.push(arr)
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: header,
          data: result,
          filename: '员工列表'
        })
      })
    },
    jumpToDetail(row) {
      this.$router.push(`/employees/detail/${row.id}`)
    },
    imageError(e) {
      this.errImgUrl.push(e.target.src)
      e.target.src = errorImage
    },
    async showQrCode(url) {
      // console.log(this.errImgUrl.some(item => item === url))
      if (this.errImgUrl.some(item => item === url) === false) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          qrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.error('该用户未上传头像')
      }
    }
  }
}
</script>

<style>

</style>
