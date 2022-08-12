<template>
  <!-- 新增部门的弹层 -->
  <el-dialog v-if="treeNode" title="新增部门" :visible="showDialog" :before-close="close">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small" @click.native="close">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getCompanyListAPI } from '@/api/department'

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
    }
  },
  data() {
    const checkDepartmentName = async(rule, value, callback) => {
      const { depts } = await getCompanyListAPI()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error(`同级目录下已经存在${value}部门`)) : callback()
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
      }
    }
  },
  watch: {
    treenode: function(newVal, oldVal) {
      this.treenode = newVal
    }
  },

  methods: {
    close() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style>

</style>
