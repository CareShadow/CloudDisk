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
            data.roleName.toLowerCase().includes(search.toLowerCase())
        )
      "
    >
      <el-table-column prop="roleName" label="角色" width="180">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.roleName === '超级管理员' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.roleName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="资源配置">
        <template slot-scope="scope">
          <el-transfer
            v-model="scope.row.transferValue"
            :data="transferData"
            :props="{
              key: 'id',
              label: 'name'
            }"
            :titles="['可选资源', '已选资源']"
          ></el-transfer>
        </template>
      </el-table-column>

      <el-table-column align="right" width="400px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Save</el-button>
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

<style>
</style>

<script>
import { getRoleMapResource, getAllResource } from "@/api/user";
export default {
  data() {
    return {
      tableData: [
        {
          roleName: "超级管理员",
        },
        {
          roleName: "超级管理员",
        },
        {
          roleName: "超级管理员",
        },
        {
          roleName: "超级管理员",
        },
      ],
      search: "",
      transferData:[]
    };
  },

  created() {
    getRoleMapResource().then((resp) => {
      // 修饰一下tarnsferValue
      for(let item of resp.data) {
        item.transferValue = [];
        for(let resource of item.resourceList){
          item.transferValue.push(resource.id)
        }
      }
      this.tableData = resp.data;
    })
    getAllResource().then((resp) => {
      // console.log(resp.data);
      this.transferData = resp.data;
    })
  },

  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("imagePath");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    handleEdit(row) {
      console.log(row);
    }
  },
};
</script>

