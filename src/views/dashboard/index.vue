<template>
  <div class="container">
    <el-row>
      <div class="userLabel">
        <h5>欢迎管理员登陆：test, 当前时间为：{{ new Date() }}</h5>
      </div>
    </el-row>

    <el-card class="datasource">
      <div slot="header">
        <span>数据统计</span>
      </div>
      <el-row type="flex" justify="space-between">
        <el-col v-for="o in 5" :key="o" class="item">
          <span class="item_span">{{ "列表内容 " + o }}</span>
          <h2 class="item_h2">66</h2>
        </el-col>
      </el-row>
    </el-card>
    <el-row>
      <div class="file_chart">
        <el-col :span="8">
          <div ref="chart" class="chart"></div>
        </el-col>
        <el-col :span="8">
          <div ref="chart2" class="chart"></div>
        </el-col>
        <el-col :span="8">
          <div ref="chart3" class="chart"></div>
        </el-col>
      </div>
    </el-row>

    <div class="application_config">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="系统版本"> </el-table-column>
        <el-table-column prop="address" label="详细数值"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { value: 1048, name: "音频文件" },
        { value: 735, name: "视频文件" },
        { value: 580, name: "Word文件" },
        { value: 484, name: "Execl文件" },
        { value: 300, name: "其他文件" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.chart2 = this.$echarts.init(this.$refs.chart2);
      this.chart3 = this.$echarts.init(this.$refs.chart3);
      this.setOptions(this.chart);
      this.setOptions(this.chart2);
      this.setOptions(this.chart3);
    },
    setOptions(chartRef) {
      chartRef.setOption({
        title: {
          text: "文件类型分布情况",
          left: "center",
          padding: 20,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          padding: 20,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 用户标签end */

/* 基本数据start */

.datasource {
  margin-top: 20px;
}

.item {
  position: relative;
  margin: 0 0 15px 20px;
  height: 100px;
  background-color: #f2f2f2;
}

.item_span {
  position: absolute;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  top: 20px;
  left: 25px;
}

.item_h2 {
  position: absolute;
  top: 35px;
  left: 25px;
}
.chart {
  height: 400px;
  background-color: #f2f2f2;
}

/* 基本数据end */

/* 文件分布情况 扇形图 start*/
.file_chart {
  margin-top: 20px;
  padding: 10px;
  min-width: 1331px;
  height: 420px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
/* 文件分布情况 扇形图 end*/

.application_config {
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>