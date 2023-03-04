<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />
    <el-row>
      <el-col span="6">
        <el-tree
          ref="tree2"
          accordion
          :data="data2"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          :render-content="renderContent"
          highlight-current
        />
      </el-col>
      <el-col span="18">

      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.custom-class {
  font-size: 24px;
  vertical-align: -0.2em !important;
}
</style>

<script>
export default {
  data() {
    return {
      filterText: "",
      data2: [
        {
          id: 1,
          label: "careshadow",
          children: [
            {
              id: 4,
              label: "Level two 1-1",
              children: [
                {
                  id: 9,
                  label: "Level three 1-1-1",
                },
                {
                  id: 10,
                  label: "Level three 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "gala",
          children: [
            {
              id: 5,
              label: "Level two 2-1",
            },
            {
              id: 6,
              label: "Level two 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "imgs",
          children: [
            {
              id: 7,
              label: "Level two 3-1",
            },
            {
              id: 8,
              label: "Level two 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <svg-icon icon-class="folder" class-name="custom-class" />
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

