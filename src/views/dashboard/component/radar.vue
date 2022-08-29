<template>
  <!-- 雷达组件 -->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
const echarts = require('echarts')
export default {
  mounted() {
    const MyEchart = echarts.init(this.$refs.myDiv)
    MyEchart.setOption({
      title: {
        text: '能力表'
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '战斗力', max: 100 },
          { name: '体力', max: 100 },
          { name: '耐力', max: 100 },
          { name: '精神力', max: 100 },
          { name: '灵活性', max: 100 },
          { name: '智力', max: 100 }
        ]
      },
      series: [
        {
          name: '能力属性',
          type: 'radar',
          data: [
            {
              value: [90, 80, 70, 50, 60, 80],
              name: '能力'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style>
.radar-echart {
    width: 600px;
    height: 400px;
}
</style>
