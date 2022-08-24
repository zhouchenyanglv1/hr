<template>
  <div>
    <el-dialog title="分配角色" :visible="showRollDialog" @close="close">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in checkBoxList" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>

      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="updateUserAssign">确定</el-button>
          <el-button size="small" @click="close">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getCharactorListAPI } from '@/api/setting'
import { getUserDetalByIdAPI, updateUserAssignAPI } from '@/api/employees'
export default {
  props: {
    showRollDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checkList: [],
      checkBoxList: []
    }
  },
  //   watch: {
  //     userId: {
  //       immediate: true,
  //       deep: true,
  //       handler(newval, oldval) {
  //         this.getCharactorList()
  //          this.getUserDetalById()
  //       }
  //     }
  //   },
  created() {
    this.getCharactorList()
  },
  methods: {
    close() {
      this.checkList = []
      this.$emit('close')
    },
    async getCharactorList() {
      const { rows } = await getCharactorListAPI({ page: 1, pagesize: 20 })
      this.checkBoxList = rows
    },
    async getUserDetalById(id) {
      const res = await getUserDetalByIdAPI(id)
      if (res.roleIds) { this.checkList = res.roleIds }
    },
    async updateUserAssign() {
      const ids = this.userId
      await updateUserAssignAPI({ roleIds: this.checkList, id: ids })
      this.checkList = []
      this.$emit('close')
    }
  }

}
</script>

<style>

</style>
