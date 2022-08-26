<template>
  <div class="dashboard-container">
    <div class="app-container">
      <Pagrtools>
        <template v-slot:after><el-button type="primary" size="small" @click="addBig">添加</el-button></template>
      </Pagrtools>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="permissionAllList"
          row-key="id"
          :tree-props="{children: 'children'}"
        >
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button type="text" @click="add(row)">添加</el-button>
              <el-button type="text" @click="edit(row)">编辑</el-button>
              <el-button type="text" @click="del(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 新增编辑弹窗 -->
      <el-dialog :visible="showDialog" :title="isEdit===true?'编辑':'新增'" @close="close">
        <el-form ref="formData" :rules="rules" :model="editData">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="标识" prop="code">
            <el-input v-model="editData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="editData.description" style="width:90%" />
          </el-form-item>
          <el-form-item>
            <el-switch
              v-model="switchOn"
              active-text="可见"
              active-value="1"
              inactive-text="不可见"
              inactive-value="0"
            />
          </el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-button size="small" type="primary" @click="send">确定</el-button>
              <el-button size="small" @click="close">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagrtools from '@/components/Pagrtools/index.vue'
import { getPermissionListAPI, addPermissionAPI, updatePermissionAPI, delPermissionAPI } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
  components: { Pagrtools },
  data() {
    return {
      permissionAllList: [],
      showDialog: false,
      switchOn: '',
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      formData2: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      editData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      isEdit: false,
      isAddBig: false
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionListAPI()
      console.log(res)
      this.permissionAllList = transListToTreeData(res, '0')
      console.log(this.permissionAllList)
    },
    close() {
      this.editData = this.formData2
      this.$refs.formData.resetFields()
      this.showDialog = false
    },
    add(row) {
      this.isEdit = false
      this.editData.pid = row.id
      this.showDialog = true
      console.log(row)
    },
    addBig() {
      this.isEdit = false
      this.isAddBig = true
      this.showDialog = true
    },
    edit(row) {
      this.isEdit = true
      this.editData = row
      this.switchOn = row.enVisible
      this.showDialog = true
    },
    async del(row) {
      await delPermissionAPI(row.id)
      this.$message.success('删除成功')
      this.getPermissionList()
    },
    async addPermission() {
      if (this.isAddBig === true) {
        this.editData.pid = '0'
      }
      const data = this.editData
      data.enVisible = this.switchOn
      const res = await addPermissionAPI(data)
      console.log(res)
    },
    async updatePermission() {
      const data = this.editData
      data.enVisible = this.switchOn
      console.log(data)
      const res = await updatePermissionAPI(data)
      console.log(res)
    },
    send() {
      this.$refs.formData.validate(async isOk => {
        if (isOk) {
          this.isEdit === false ? await this.addPermission() : await this.updatePermission()
          this.editData = this.formData2
          this.switchOn = 0
          this.$refs.formData.resetFields()
          this.isAddBig = false
          this.showDialog = false
          this.isEdit === false ? this.$message.success('新增成功') : this.$message.success('编辑成功')
          this.getPermissionList()
        } else {
          console.log(333)
        }
      })
    }
  }
}
</script>

<style>

</style>
