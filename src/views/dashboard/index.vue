<template>
  <div class="container">
    <div class="userLabel">
      <h5>欢迎管理员登陆：test, 当前时间为：{{ new Date() }}</h5>
    </div>
    <el-card class="datasource">
      <div slot="header">
        <span>数据统计</span>
      </div>
      <div v-for="o in 5" :key="o" class="item">
        <span class="item_span">{{ "列表内容 " + o }}</span>
        <h2 class="item_h2">66</h2>
      </div>
    </el-card>
    <div ref="chart">
      name root
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.chart = this.initCharts();
  },
  methods: {
    initCharts() {
      this.chart = this.$echarts.init(this.$refs.chart);
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0px 20px;
}

/* 用户标签start */
.userLabel {
  height: 50px;
  line-height: 50px;
  background: #009688;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.userLabel h5 {
  background: #f2f2f2;
  margin-left: 10px;
  padding-left: 10px;
}

/* 用户标签end */

/* 基本数据start */

.datasource {
  margin-top: 20px;
}

.item {
  float: left;
  position: relative;
  margin: 0 0 15px 20px;
  width: 333px;
  height: 100px;
  background-color: #f2f2f2;
}

.item_span {
  position: relative;
  top: 20px;
  left: 25px;
}

.item_h2 {
  position: relative;
  top: 20px;
  left: 25px;
}

/* 基本数据end */
</style>