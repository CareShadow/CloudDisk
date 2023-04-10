<template>
  <uploader class="uploader-example" :options="options" :autoStart="false" :file-status-text="fileStatusText"
    @file-added="onFileAdded" @file-success="onFileSuccess" @file-error="onFileError">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>select files</uploader-btn>
      <uploader-btn :attrs="attrs">select images</uploader-btn>
      <uploader-btn :directory="true">select folder</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
import sparkMD5 from "spark-md5";
import { merge } from "@/api/user"
export default {
  props: ['folderId'],
  data() {
    return {
      options: {
        target: "/shadow-api/slice/chunk", // 上传路径
        chunkSize: "2048000", // 分块大小
        fileParameterName: "file", // 上传参数
        maxChunkRetries: 3, // 重试次数
        testChunks: true, // 服务器分片校验
        // 服务器分片校验函数, 秒传及断点断续基础
        checkChunkUploadedByResponse: function (chunk, message) {
          let { data: objectMessage } = JSON.parse(message);
          if (objectMessage.skipUpload) {
            return true;
          }
          return (objectMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0;
        },
        // 额外的自定义查询参数
        query: (file, chunk) => {
          return {
            ...file.params,
          };
        },
      },
      attrs: {
        accept: [".mp4", ".rmvb", ".mkv", ".wmv", ".flv"],
      },
      fileStatusText: {
        success: "上传成功",
        error: "上传失败",
        uploading: "上传中",
        paused: "暂停",
        waiting: "等待上传",
      },
    };
  },
  methods: {
    onFileAdded(file) {
      this.computeMD5(file);
    },
    onFileSuccess(rootFile, file, message, chunk) {
      console.log(file);
      // 调用一个合并文件;
      const data = {
        identifier: file.uniqueIdentifier,
        totalChunks: file.chunks.length,
        contentType: file.fileType,
        size: file.size / 1024,
        name: file.name,
        folderId: this.folderId
      };
      merge(data)
        .then((responseData) => {
          console.log("文件上传", responseData);
        })
        .catch(function (error) {
          console.log("文件上传异常", error);
        });
    },
    onFileError(rootFile, file, response, chunk) {
      console.log("文件上传失败：" + response);
    },
    // 计算MD5
    computeMD5(file) {
      file.pause();
      let fileReader = new FileReader();
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      let currentChunk = 0;
      let time = new Date().getTime();
      const chunkSize = 10 * 1024 * 1000;
      let chunks = Math.ceil(file.size / chunkSize);
      let spark = new sparkMD5.ArrayBuffer();
      loadNext();
      fileReader.onload = (e) => {
        spark.append(e.target.result);
        if (currentChunk < chunks) {
          loadNext();
        } else {
          let md5 = spark.end();
          file.uniqueIdentifier = md5;
          file.params = { folderId: this.folderId }
          file.resume();
          console.log(
            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size
            } 用时：${new Date().getTime() - time} ms`
          );
        }
      };
      fileReader.onerror = function () {
        this.error(`文件${file.name}读取出错，请检查该文件`);
        file.cancel();
        reject();
      };
      function loadNext() {
        let start = currentChunk * chunkSize;
        let end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
        currentChunk++;
      }
    },
    close() {
      this.uploader.cancel();
    },
    error(msg) {
      this.$message.error(msg, 2000);
    },
  },
};
</script>

<style>
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 10px auto 0;
  font-size: 12px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); */
}

.uploader-example .uploader-btn {
  margin-right: 4px;
}

.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>