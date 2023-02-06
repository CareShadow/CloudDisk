<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-upload action="" :data="data"  multiple :http-request="uploadFile">
      <el-button>文件上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { upload, uploadByPieces} from "@/api/upload"

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      data:{}
    }
  },
  methods: {
    uploadFileProcess(event, file, fileList) {
        console.log(file)
    },
    async uploadFile(options) {
      const {data, file, onProgress} = options;
      console.log(options);
      console.log(file);
      // data是上传时附带的额外参数，file是文件
      let url = "/slice/file"; //上传文件接口
      try {
        // 如果文件小于5MB，直接上传
        if (file.size < 5 * 1024 * 1024) {
          let formData = new FormData();
          formData.append("file", file);
          const res = await upload(url, formData, onProgress);
          loadingInstance.close();
          return res;
        } else {
          // 如果文件大于等于5MB，分片上传
          data.file = file;
          const res = await uploadByPieces(url, data, onProgress);
          return res;
        }
      } catch (e) {
        return e;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
