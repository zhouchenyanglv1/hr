<template>
  <div class="dashboard-container">
    <div class="app-container">
      <Pagrtools>
        <template v-slot:after><el-button type="primary" size="small">添加</el-button></template>
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
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 新增编辑弹窗 -->
      <el-dialog :visible="showDialog" title="新增编辑">
        <el-form>
          <el-form-item label="名称">
            <el-input style="width:90%" />
          </el-form-item>
          <el-form-item label="标识">
            <el-input style="width:90%" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input style="width:90%" />
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
              <el-button size="small" type="primary">确定</el-button>
              <el-button size="small">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagrtools from '@/components/Pagrtools/index.vue'
import { getPermissionListAPI } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
  components: { Pagrtools },
  data() {
    return {
      permissionAllList: [],
      showDialog: true,
      switchOn: '',
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
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
    }
  }
}
</script>

<style>

</style>
