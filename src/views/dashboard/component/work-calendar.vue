<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="selectedYear" size="mini" style="width:120px" placeholder="请选择年份" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item+'年'" :value="item" />
      </el-select>

      <el-select v-model="selectedMonth" size="mini" style="width:120px;margin-left: 10px;" placeholder="请选择月份" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item+'月'" :value="item" />
      </el-select>
    </el-row>

    <el-calendar v-model="calendarData">
      <template v-slot:dateCell="{ date, data }">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>

export default {
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      selectedMonth: new Date().getMonth() + 1,
      selectedYear: new Date().getFullYear(),
      dataNow: new Date().getFullYear(),
      calendarData: new Date()
    }
  },
  computed: {
    yearList() {
      let year = this.dataNow - 5
      const list = []
      for (let i = 0; i < 11; i++) {
        list.push(year)
        year++
      }
      return list
    }

  },
  methods: {
    dateChange() {
      const year = this.selectedYear
      const month = this.selectedMonth
      this.calendarData = new Date(`${year}-${month}-1`)
    },
    isWeek(date) {
      return date.getDay() === 0 || date.getDay() === 6
    }
  }
}
</script>

<style  scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>
