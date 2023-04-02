<template>
  <div class="app-container">
    <el-row>
      <div class="userLabel">
        <div class="breadcrumb">
          <div class="breadcrumb_item">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>index</el-breadcrumb-item>
              <el-breadcrumb-item>images</el-breadcrumb-item>
              <el-breadcrumb-item>lists</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
      </div>
    </el-row>
    <el-table
      stripe
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      :border="false"
      fit
      highlight-current-row
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          <svg-icon
            :icon-class="scope.row.type == null ? 'folder' : 'word'"
            class-name="tableicon-class"
          ></svg-icon>
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="扩展名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.postfix }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大小" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column label="下载次数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.downloadTime }}
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        prop="created_at"
        label="上传时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.uploadTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="right">
            <DropDown />
      </el-table-column>
    </el-table>
    <div class="el-dropdown-link">
      <el-dropdown placement="top" trigger="click" @visible-change="rotateDiv">
        <span>
          <button class="feba-toggle" ref="rotateDiv" type="button">
            <span><i class="el-icon-plus" style="font-weight: 800"></i></span>
          </button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-tooltip placement="left" content="创建文件夹">
              <button class="feba-toggle_item" type="button">
                <span
                  ><i
                    class="el-icon-folder-add"
                    style="font-weight: 800; color: #fff"
                  ></i
                ></span>
              </button>
            </el-tooltip>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-tooltip placement="left" content="上传文件">
              <button class="feba-toggle_item" type="button">
                <span
                  ><i
                    class="el-icon-upload2"
                    style="font-weight: 800; color: #fff"
                  ></i
                ></span>
              </button>
            </el-tooltip>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <DropDown />
  </div>
</template>

<style scoped>
.breadcrumb_class {
  margin: 10px;
}

.breadcrumb {
  position: relative;
  height: 50px;
  background: #f2f2f2;
  margin-left: 10px;
  padding-left: 10px;
}

.breadcrumb_item {
  /* 一个绝对定位小技巧 */
  position: absolute;
  top: 50%;
  margin-top: -7px;
}

.userLabel {
  height: 50px;
  line-height: 50px;
  background: #009688;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.tableicon-class {
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

.feba-toggle {
  width: 55px;
  height: 55px;
  line-height: 55px;
  background-color: #ff726f;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  text-align: center;
  border: 0;
  transform: rotate(0deg);
  padding: 0;
  transition: transform 0.3s ease-in-out;
}

.feba-toggle span {
  display: inline-block;
  color: #fff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-link {
  position: fixed;
  z-index: 1000;
  bottom: 50px;
  right: 30px;
}

.el-dropdown-menu {
  padding: 10px 0;
  margin: 5px 0;
  box-shadow: 0 0 0 0;
  border: 0px;
  background-color: transparent;
}

.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: transparent;
  color: #fff;
}

.feba-toggle_item {
  width: 40px;
  height: 40px;
  margin-top: 10px;
  line-height: 40px;
  background-color: #ffc107;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  text-align: center;
  border: 0;
  padding: 0;
}

.el-dropdown-menu__item i {
  margin-right: 0px;
}
</style>

<script>
import { getFileOrFolder } from "@/api/user";
import DropDown from "@/components/DropDown/index.vue";
export default {
  components: { DropDown },
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
      getFileOrFolder(0).then((resp) => {
        this.list = resp.data;
        this.listLoading = false;
      });
    },
    rotateDiv() {
      // 获取 div 节点
      const divNode = this.$refs.rotateDiv;

      // 判断 div 是否已经旋转
      if (divNode.style.transform == "rotate(45deg)") {
        // 如果已经旋转，则返回原来的状态
        divNode.style.transform = "rotate(0deg)";
        divNode.style.backgroundColor = "#ff726f";
      } else {
        // 如果没有旋转，则旋转 90 度
        divNode.style.transform = "rotate(45deg)";
        divNode.style.backgroundColor = "#ff524f";
      }
    },
   
  },
};
</script>

