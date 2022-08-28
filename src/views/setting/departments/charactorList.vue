<template>
  <div>
    <el-table
      :data="info"
      border
      style="width: 100%;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column
        label="序号"
        width="60"
        type="index"
        align="center"
      />
      <el-table-column
        prop="name"
        label="角色名"
        width="200"
        align="center"
      />
      <el-table-column
        prop="description"
        label="描述"
        header-align="center"
      />
      <el-table-column
        label="操作"
        width="300"
        align="center"
      >

        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="permission(scope.row)">分配权限</el-button>
          <el-button size="mini" type="primary" @click="edit(scope.$index)">编辑</el-button>
          <el-button ref="delButton" size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
        </template>

      </el-table-column>
    <!-- 编辑弹层 -->

    </el-table>
    <el-dialog ref="title" :title="isEdit===true?'编辑角色':'添加角色'" :visible="showDialog" label-width="120px" :before-close="closeDialog">
      <el-form ref="charactorInfo" :model="charactorInfo" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="charactorInfo.name" />
        </el-form-item>
        <el-form-item label="角色详情">
          <el-input v-model="charactorInfo.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="closeDialog">取消</el-button>
          <el-button size="small" type="primary" @click="sendUpdate">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 分配权限弹窗 -->
    <el-dialog :visible="showPerDialog" :title="`为${permTitle}分配权限`" @close="closePermission">
      <el-form>

        <el-tree
          ref="tree"
          :data="permData"
          node-key="id"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          :check-strictly="true"
          :default-checked-keys="checkList"
        />

        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click.native="sendPermission">确定</el-button>
            <el-button size="small" @click.native="closePermission">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { delCharactorAPI, updateCharactorAPI, getCharactorInfoAPI, addCharactorAPI, putAssignPermissionAPI } from '@/api/setting'
import { getPermissionListAPI } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  props: {
    info: {
      type: Array,
      default: null,
      require: false
    }

  },
  data() {
    return {
      propData: {},
      index: 0,
      showDialog: false,
      isEdit: true,
      charactorInfo: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名字不能为空', trigger: 'blur' }]
      },
      showPerDialog: false,
      permData: [],
      defaultProps: { label: 'name' },
      permTitle: '',
      userId: null,
      checkList: [],
      checkedList: []
    }
  },
  updated() {
    this.propData = this.info
  },
  created() {

  },
  methods: {
    async del(index) {
      const id = this.info[index].id
      try {
        await this.$confirm('确认要删除吗？')
        await delCharactorAPI(id)
        this.$emit('refresh')
      } catch (error) {
        console.log(error.message)
        return
      }
      this.$message.success('删除角色成功')
    },
    async edit(index) {
      this.isEdit = true
      this.showDialog = true
      const res = await getCharactorInfoAPI(this.info[index].id)
      this.charactorInfo = res
    },
    closeDialog() {
      this.showDialog = false
      this.$refs.charactorInfo.resetFields()
      this.charactorInfo.description = ''
    },
    async  sendUpdate() {
      const addData = { name: this.charactorInfo.name, description: this.charactorInfo.description }
      const editData = { name: this.charactorInfo.name, description: this.charactorInfo.description, id: this.charactorInfo.id }
      await this.isEdit === true ? updateCharactorAPI(editData) : addCharactorAPI(addData)
      this.closeDialog()
      this.$emit('refresh')
    },
    add() {
      this.isEdit = false
      this.showDialog = true
    },
    async permission(row) {
      console.log(row)
      this.userId = row.id
      const check = await getCharactorInfoAPI(this.userId)
      console.log(check.permIds)
      this.checkList = check.permIds
      this.permTitle = row.name
      this.getPermissionList()
      this.showPerDialog = true
    },
    closePermission() {
      this.showPerDialog = false
      this.checkList = []
      this.checkedList = []
    },
    async getPermissionList() {
      const res = await getPermissionListAPI()
      const list = transListToTreeData(res, '0')
      console.log(list)
      this.permData = list
    },
    async sendPermission() {
      this.checkedList = this.$refs.tree.getCheckedKeys()
      await putAssignPermissionAPI({ id: this.userId, permIds: this.checkedList })
      this.closePermission()
      this.$message.success('更新权限成功')
    }

  }
}
</script>

<style scoped>
.doButton{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
