<template>
  <div v-if="showDialog">
    <!-- 新增部门的弹层 -->
    <el-dialog :title="isEdit? '编辑部门':'新增部门'" :visible="showDialog" :before-close="close">
      <!-- 表单组件  el-form   label-width设置label的宽度   -->
      <!-- 匿名插槽 -->
      <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getManagerList">
            <el-option
              v-for="(item,index) in managerList"
              :key="index"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
      <el-row slot="footer" type="flex" justify="center">
        <!-- 列被分为24 -->
        <el-col :span="6">
          <el-button type="primary" size="small" @click="send()">确定</el-button>
          <el-button size="small" @click.native="close">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyListAPI, addCompanyListAPI, editCompanyListAPI } from '@/api/department'
import { getEmployeesSimpleListAPI } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkDepartmentName = async(rule, value, callback) => {
      if (this.isEdit === true) {
        const { depts } = await getCompanyListAPI()
        const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
        isRepeat ? callback(new Error(`同级目录下已经存在${value}部门`)) : callback()
      } else {
        const { depts } = await getCompanyListAPI()
        const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
        isRepeat ? callback(new Error(`同级目录下已经存在${value}部门`)) : callback()
      }
    }
    const checkDepartmentCode = async(rule, value, callback) => {
      const { depts } = await getCompanyListAPI()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.code === value)
      isRepeat ? callback(new Error(`同级目录下已经存在${value}部门`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''

      },
      computerIsEdit: false,
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度最大为50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkDepartmentName }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度最大为50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkDepartmentCode }
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度最大为300个字符', trigger: 'blur' }
        ]
      },
      managerList: []
    }
  },
  watch: {
    immediate: true,
    deep: true,
    showDialog: {
      handler(newval, oldval) {
        if (this.isEdit === true) {
          const obj = this.treeNode
          this.formData.name = obj.name
          this.formData.code = obj.code
          this.formData.manager = obj.manager
          this.formData.introduce = obj.introduce
        } else {
          this.formData.name = ''
          this.formData.code = ''
          this.formData.manager = ''
          this.formData.introduce = ''
        }
      }
    }
  },
  // beforeUpdate() {
  //   if (this.isEdit === true) {
  //     const obj = this.treeNode
  //     this.formData.name = obj.name
  //     this.formData.code = obj.code
  //     this.formData.manager = obj.manager
  //     this.formData.introduce = obj.introduce
  //   } else {
  //     this.$refs.deptForm.resetFields()
  //   }
  // },

  methods: {
    close() {
      this.formData.name = ''
      this.formData.code = ''
      this.formData.manager = ''
      this.formData.introduce = ''
      this.$refs.deptForm.resetFields()
      this.$emit('closeDialog')
    },
    async getEmployeesSimpleList() {
      try {
        const res = await getEmployeesSimpleListAPI()
        const filterRes = []
        res.forEach(item => {
          if (item.username) {
            filterRes.push(item)
          }
        })
        this.managerList = filterRes
      } catch (error) {
        this.$message.error('获取员工列表失败')
        console.log(error)
      }
    },
    getManagerList() {
      this.getEmployeesSimpleList()
    },
    send() {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          try {
            const sendData = { ...this.formData, pid: this.treeNode.id || '' }
            console.log(sendData)
            this.isEdit === true ? await editCompanyListAPI(this.treeNode.id, { ...this.formData }) : await addCompanyListAPI(sendData)
            this.$emit('refresh')
          } catch (error) {
            this.isEdit === true ? this.$message.error('编辑部门失败') : this.$message.error('添加部门失败')
            console.log(error)
          }
          this.close()
        } else {
          return
        }
      })
    }
  }
}
</script>

<style>

</style>
