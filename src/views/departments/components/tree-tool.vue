<template>

  <el-row type="flex" justify="space-between" align="middle" style="height:40px;width: 100%;">
    <el-col style="font-weight:600">{{ treenode.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treenode.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span>操作  <i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" @click.native="remove(treenode.id)">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>

<script>
import { deleteCompanyListAPI } from '@/api/department'
export default {
  props: {
    isRoot: {
      default: false,
      type: Boolean
    },
    treenode: {
      required: true,
      type: Object
    }
  },
  methods: {
    remove(id) {
      try {
        deleteCompanyListAPI(id)
        this.$message.success('删除部门成功')
      } catch (error) {
        this.$message.error('删除部门失败，请检查网络')
      }
      this.$emit('removeItem')
    }
  }
}
</script>

<style>

</style>
