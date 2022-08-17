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
          <el-button size="mini" type="success">分配权限</el-button>
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
  </div>
</template>

<script>
import { delCharactorAPI, updateCharactorAPI, getCharactorInfoAPI, addCharactorAPI } from '@/api/setting'

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
      }
    }
  },
  updated() {
    this.propData = this.info
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
