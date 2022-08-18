<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="cancel()">
    <!-- 表单 -->
    <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option
            v-for="item in formEmployment"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-select v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="selectDepartment">
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select> -->
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="selectDepartment" />

        <!-- 放置一个tree组件 -->
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="departmentList"
          default-expand-all=""
          :props="{ label: 'name' }"
          @node-click="chooseDepartment"
        />

      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="addEmployees">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { addEmployeesAPI } from '@/api/employees'
import { getCompanyListAPI } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '员工姓名为2-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '请选择聘用形式', trigger: 'blur' }],
        workNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { pattern: /[0-9]/, message: '工号必须为数字', trigger: 'blur' }
        ],
        departmentName: [{ required: true, message: '请选择部门', trigger: 'blur' }]

      },
      formEmployment: [
        { id: 1, label: '正式' },
        { id: 2, label: '非正式' }
      ],
      departmentList: [], // 部门列表
      defaultProps: {
        label: 'name'
      },
      showTree: false,
      loading: false
    }
  },

  methods: {
    cancel() {
      this.$emit('close')
      this.formData
      this.$refs.formData.resetFields()
    },
    async  addEmployees() {
      const data = this.formData
      await addEmployeesAPI(data)
      this.$emit('close')
      this.$emit('refresh')
    },
    async selectDepartment() {
      this.showTree = true
      this.loading = true
      const res = await getCompanyListAPI()
      console.log(res)
      this.departmentList = transListToTreeData(res.depts, '')
      console.log(this.departmentList)
      this.loading = false
    },
    chooseDepartment(item) {
      console.log(item)
      this.formData.departmentName = item.name
      this.showTree = false
    }
  }

}
</script>

<style>

</style>
