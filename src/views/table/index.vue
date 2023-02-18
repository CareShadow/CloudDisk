<template>
  <div class="app-container">
    <div class="breadcrumb_class">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      :border="false"
      fit
      highlight-current-row
      @row-contextmenu="rightClick"
    >
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">
          <svg-icon icon-class="file" class-name="custom-class"></svg-icon>
          {{ "name" + scope.row.id.substring(0, 1) }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="扩展名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大小" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="下载次数" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="上传时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div ref="contextmenu" v-if="menuVisible" class="menu">
      <div class="contextmenu_item" @click="ShowView(CurrentRow)">查看</div>
      <div class="contextmenu_item" @click="EditData(CurrentRow)">修改</div>
      <div class="contextmenu_item" @click="ShowView(CurrentRow)">
        上一级目录
      </div>
      <div class="contextmenu_item" @click="ShowView(CurrentRow)">删除</div>
    </div>
  </div>
</template>
<script>
import { getList } from "@/api/table";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      menuVisible: false,
      dialogVisible: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    rightClick(row, column, event) {
      this.testModeCode = row.testModeCode;
      this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
      event.preventDefault(); //关闭右键默认事件
      this.CurrentRow = row;
      // 待dom元素渲染后在进行获取dom
      this.$nextTick(() => {
        var menu = this.$refs.contextmenu;
        this.styleMenu(menu, event);
      });
    },
    foo() {
      this.menuVisible = false;
      document.removeEventListener("click", this.foo);
    },
    styleMenu(menu, event) {
      // pageX是整个文档的位置
      menu.style.left = event.pageX - 30 + "px";
      menu.style.top = event.pageY - event.offsetY - 10 + "px";
      document.addEventListener("click", this.foo);
    },
  },
};
</script>

<style scoped>
.breadcrumb_class {
  margin: 10px;
}
.custom-class {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 4px;
  font-size: 25px;
  vertical-align: middle;
}

.contextmenu_item {
  line-height: 34px;
  text-align: center;
}

.contextmenu_item:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.menu {
  position: absolute;
  background-color: #fff;
  width: 100px;
  font-size: 12px;
  color: #444040;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  white-space: nowrap;
  z-index: 1000;
}
.contextmenu_item:hover {
  cursor: pointer;
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
</style>
