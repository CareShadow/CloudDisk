<template>
  <div class="app-container">
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.userName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column
        prop="imagePath"
        label="头像"
        sortable
        width="180"
        column-key="imagePath"
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' },
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <el-avatar
            :src="scope.row.imagePath"
            :icon="scope.row.imagePath === '' ? 'el-icon-user-solid' : ''"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名" width="180">
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="注册时间"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="用户角色"
        :filters="[
          { text: '超级管理员', value: '超级管理员' },
          { text: '普通用户', value: '普通用户' },
          { text: '违规用户', value: '违规用户' },
          { text: '封禁用户', value: '封禁用户' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="!scope.row.showDetails"
            :type="scope.row.roleName === '超级管理员' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.roleName }}
          </el-tag>
          <el-select
            v-if="scope.row.showDetails"
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleSave(scope.row)"
            v-if="scope.row.showDetails"
            >Save</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.row)" v-else
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList, updateUserRole, getAllRoleName } from "@/api/user";
export default {
  data() {
    return {
      tableData: [
        {
          imagePath:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
          userName: "王小虎",
          regiterTime: "2016-05-02",
          roleName: "管理员",
        },
        {
          imagePath:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
          userName: "王小虎",
          regiterTime: "2016-05-02",
          roleName: "管理员",
        },
        {
          imagePath:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
          userName: "王小虎",
          regiterTime: "2016-05-02",
          roleName: "普通用户",
        },
        {
          imagePath:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
          userName: "王小虎",
          regiterTime: "2016-05-02",
          roleName: "管理员",
        },
      ],
      search: "",
      options: [],
      value: "",
    };
  },
  created() {
    getUserList().then((resp) => {
      for (let item of resp.data) {
        item.showDetails = false;
      }
      this.tableData = resp.data;
    });
    getAllRoleName().then((resp) => {
      for (let item of resp.data) {
        this.options.push({ label: item.roleName, value: item.roleId });
      }
      console.log(this.options);
    });
  },
  methods: {
    handleEdit(row) {
      row.showDetails = !row.showDetails;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("imagePath");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.registerTime;
    },
    filterTag(value, row) {
      return row.roleName === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleSave(row) {
      // 判断用户是否修改权限名称
      row.showDetails = !row.showDetails;
      if (this.value === "") {
        return;
      }
      // 将标签设置现在的值
      for (let item of this.options) {
        if (item.value == this.value) {
          row.roleName = item.label;
          row.roleId = this.value;
        }
      }
      const { userId, roleId } = row;
      updateUserRole({ userId: userId, roleId: roleId }).then((resp) => {
        const msg = resp.message;
        this.$message({
          message: msg,
          type: "success",
        });
      });
      this.value = "";
    },
  },
};
</script>