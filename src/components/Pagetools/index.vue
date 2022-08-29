<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <!-- 左边 -->
      <el-col>
        <div v-if="showLeft" class="before">
          <i class="el-icon-info" />
          <slot name="before" />
        </div>
      </el-col>
      <!--
      右边 -->
      <el-col>
        <el-row type="flex" justify="end">
          <!-- 定义后面的插槽 -->
          <slot name="after" />
        </el-row>
      </el-col>

    </el-row>
  </el-card>

</template>

<script>
export default {
  props: {
    showLeft: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang='scss'>
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
 }
</style>
