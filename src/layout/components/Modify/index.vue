<template>
  <div>
    <el-dialog title="个人资料" :visible.sync="currentVisible" width="30%">
      <el-form size="small" label-position="right" label-width="80px">
        <el-form-item label="头像">
          <div class="file_style">
            <i class="el-icon-plus" style="font-size: 28px; color: #8c939d"></i>
            <input type="file" id="upload" style="display: none" />
          </div>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog width="30%" :visible.sync="dialogImageVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      dialogImageUrl: "",
      dialogImageVisible: false,
      disabled: false,
    };
  },
  computed: {
    currentVisible: {
      get() {
        return this.dialogVisible;
      },
      set(newVal) {
        this.$emit("update:dialogVisible", newVal);
      },
    },
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlerPictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.file_style {
  display: block;
  margin: 0 auto;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  cursor: pointer;
  line-height: 80px;
  text-align: center;
}
</style>
