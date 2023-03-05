<!-- eslint-disable -->
<template>
  <div class="oss-upload">
    <el-upload
      ref="upload"
      action
      :show-file-list="false"
      :multiple="multiple"
      :on-change="handleChange"
      :auto-upload="false"
      :accept="accept"
    >
      <el-button type="primary" icon="el-icon-upload2" round>上 传</el-button>
    </el-upload>
    <!-- 此处代码为3.1.1部分的el-upload组件代码-->
    <el-dialog
      :visible.sync="dialogVisible"
      width="650px"
      destroy-on-close
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div slot="title">
        <span>上传</span>
        <span class="num">
          {{ fileList.length - unList.length }}/{{ fileList.length }}
        </span>
      </div>
      <div class="dialog-head">
        <div class="head-btn">
          <el-button
            size="small"
            type="primary"
            :disabled="uploadDisabled"
            icon="el-icon-video-play"
          >
            开始上传
          </el-button>
          <!-- @click="startUpload"   @click="resumeUpload" @click="stopUplosd"-->
          <el-button
            class="item-btn"
            size="small"
            :disabled="resumeDisabled"
            icon="el-icon-refresh-right"
            type="success"
          >
            继续
          </el-button>
          <el-button
            class="item-btn"
            size="small"
            icon="el-icon-video-pause"
            type="danger"
            :disabled="pauseDisabled"
          >
            暂停
          </el-button>
        </div>
      </div>

      <div class="file-list">
        <div class="file-item" v-for="(item, index) in fileList" :key="index">
          <div class="file-name">
            <div class="name">
              <span class="file-name-item">
                {{ index + 1 }}.{{ item.name }}
              </span>
              <span class="speed" v-if="item.isLoading && !item.isPlay">
                准备就绪
              </span>
              <span class="speed" v-if="item.isPlay && item.percentage !== 100">
                {{ item.speed }}/s
              </span>
              <span v-if="item.percentage === 100" class="success">完成</span>
              <div class="total">
                {{ filterSize(item.size) }}
              </div>
            </div>
            <span class="name error" v-if="item.errMsg">{{ item.errMsg }}</span>
            <el-progress
              :percentage="item.percentage"
              v-if="item.percentage < 100 && !item.errMsg"
            ></el-progress>
            <template v-else>
              <el-progress
                :percentage="item.percentage"
                :status="item.errMsg ? 'exception' : 'success'"
              ></el-progress>
            </template>
          </div>
          <div class="tool">
            <span
              v-if="
                !item.percentage || (0 < item.percentage < 100 && !item.isPlay)
              "
              class="icon delete"
              @click="handleDeleteChangeFile(index)"
            >
              <i class="el-icon-close"></i>
            </span>
            <span
              v-if="item.percentage && item.percentage !== 100"
              class="icon"
              :class="item.isPlay ? 'delete' : 'success'"
              @click="handleChangeFileStatus(index, item)"
            >
              <i
                :class="`el-icon-${
                  item.isPlay ? 'video-pause' : 'caret-right'
                }`"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // 接受上传的文件类型，默认全部
    accept: {
      type: String,
      default: "",
    },
    // 是否支持多文件上传,默认支持
    multiple: {
      type: Boolean,
      default: true,
    },
    // 绑定值
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      unList: [], // 未上传列表
      fileList: [], // 文件列表
      file: null, // 文件信息
      uploadDisabled: true, // 上传按钮状态
      resumeDisabled: true, // 恢复上传按钮状态
      pauseDisabled: true, // 暂停上传按钮状态
      partSize: 1024 * 1024, // 分片大小
      parallel: 4, // 并发数量
      checkpoints: {}, // 分片信息
      credentials: null, // oss
      dialogVisible: false,
      fileMap: {},
      map_max_key: 0,
    };
  },
  methods: {
    /**
     * @description 选择文件事件
     * @param {*} file 文件信息
     * @param {*} fileList 文件列表
     */
    handleChange(file, fileList) {
      fileList.forEach((item) => {
        item.client = null; // 初始化oss 为了能单独控制单文件
        item.isPlay = false; // 是否开始 控制开启状态
        item.isLoading = false; // 是否处于就绪状态
        item.abortCheckpoint = false; // 是否分片
      });
      this.fileList = fileList;
      this.file = file.raw;
      this.uploadDisabled = false; // 默认开启上传状态
      this.pauseDisabled = this.resumeDisabled = true; // 关闭暂停恢复按钮
    },
    handleClose() {
      // 关闭事件
      this.$emit("on-close");
      // 处理正在上传的文件逻辑代码，可根据自己的业务开发
    },

    filterSize(size) {
      if (!size) return "-";
      if (size < this.pow1024(1)) return size + " B";
      if (size < this.pow1024(2)) return (size / this.pow1024(1)).toFixed(2) + " KB";
      if (size < this.pow1024(3)) return (size / this.pow1024(2)).toFixed(2) + " MB";
      if (size < this.pow1024(4)) return (size / this.pow1024(3)).toFixed(2) + " GB";
      return (size / this.pow1024(4)).toFixed(2) + " TB";
    },

    pow1024(num) {
      return Math.pow(1024, num);
    },
  },
  watch: {
    fileList: {
      handler(val) {
        if (val.length) {
          this.dialogVisible = true;
          let list = [];
          let unList = [];
          val.forEach((item) => {
            // 上传进度不满足100%都存放到未完成列表，反之完成列表
            if (item.percentage === 100) list.push(item);
            else unList.push(item);
          });
          // 判断是否全部完成
          if (list.length === val.length) {
            this.pauseDisabled = true;
          }
          this.unList = unList;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.file-list {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}
.icon-file {
  width: 2.5em;
  height: 2.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
::v-deep {
  .el-progress-circle {
    width: 40px !important;
    height: 40px !important;
  }
}
.file-item {
  display: flex;
  align-content: center;
  .file-name {
    flex: 1;
    .name {
      width: 100%;
      display: flex;
      .total {
        margin-left: 20px;
      }
      // justify-content: space-between;
      .file-name-item {
        font-weight: 500;
        width: 290px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .speed {
        width: 120px;
        text-align: center;
        font-size: 13px;
        color: #485cdf;
      }
      .success {
        text-align: center;
        width: 120px;
        color: #91cc75;
      }
      &.error {
        color: #f45;
        font-size: 12px;
      }
    }
  }
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  &:last-child {
    border-bottom: 0;
  }
  .tool {
    margin-left: 15px;
    .icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background-color: #eee;
      border-radius: 5px;
      margin: 0px 4px;
      cursor: pointer;
      font-size: 15px;
      color: rgb(255, 68, 85);
      font-weight: 600;
      &.success {
        color: #91cc75;
        background-color: #eee;
      }
    }
  }
}
.dialog-head {
  display: flex;
  justify-content: space-between;
}
::v-deep {
  .el-progress-bar {
    width: 320px !important;
  }
}
.num {
  background: #515256a8;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 5px;
  color: #fff;
}
</style>