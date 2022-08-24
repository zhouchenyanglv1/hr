<template>
  <div class="dashboard-container">
    <div class="app-container">
      <Pagrtools>
        <template v-slot:after><el-button type="primary" size="small">添加</el-button></template>
      </Pagrtools>
      <!-- 表格 -->
      <template>
        <el-table border>
          <el-table-column label="名称" />
          <el-table-column label="标识" />
          <el-table-column label="描述" />
          <el-table-column label="操作">
            <template>
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import Pagrtools from '@/components/Pagrtools/index.vue'
export default {
  components: { Pagrtools }
}
</script>

<style>

</style>
