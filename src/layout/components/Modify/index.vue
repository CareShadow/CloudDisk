<template>
  <div>
    <el-dialog title="个人资料" :visible.sync="currentVisible" width="30%">
      <el-form size="small" label-position="right" label-width="80px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      dialogImageUrl: "",
      dialogImageVisible: false,
      disabled: false,
      imageUrl: "",
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
    handleAvatarSuccess(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
};
</script>

