<template>
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
      <div class="doButton">
        <el-button size="mini" type="success">分配权限</el-button>
        <el-button size="mini" type="primary">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </div>

    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: null,
      require: true
    }
  },
  data() {
    return {

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
