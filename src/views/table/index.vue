<template>
  <div class="app-container">
    <el-row>
      <div class="userLabel">
        <div class="breadcrumb">
          <div class="breadcrumb_item">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in content" :key="item.folderId">
                <a @click="enterFolder(item.folderId)">{{ item.folderName }}</a>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
      </div>
    </el-row>
    <el-table stripe v-loading="listLoading" :data="list" element-loading-text="Loading" :border="false" fit
      highlight-current-row>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.type == null ? 'folder' : 'word'" class-name="tableicon-class"></svg-icon>
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
      <el-table-column align="left" prop="created_at" label="上传时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.uploadTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-s-home" circle
            @click="enterFolder(scope.row.id)"></el-button>
          <el-button size="small" type="success" icon="el-icon-download" circle></el-button>
          <el-button size="small" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" circle
          @click="deleteFile(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="el-dropdown-link">
      <el-dropdown placement="top" trigger="click" @visible-change="rotateDiv" :hide-on-click="false">
        <span>
          <button class="feba-toggle" ref="rotateDiv" type="button">
            <span><i class="el-icon-plus" style="font-weight: 800"></i></span>
          </button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-tooltip placement="left" content="创建文件夹">
              <button class="feba-toggle_item" type="button" @click="showInput">
                <span>
                  <i class="el-icon-folder-add" style="font-weight: 800; color: #fff"></i>
                </span>
              </button>
            </el-tooltip>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-tooltip placement="left" content="上传文件">
              <button class="feba-toggle_item" type="button" @click="dialogVisible = true">
                <span>
                  <i class="el-icon-upload2" style="font-weight: 800; color: #fff"></i>
                </span>
              </button>
            </el-tooltip>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="上传文件" :visible.sync="dialogVisible">
      <Upload :folderId="folderId"></Upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="overlay" v-show="inputVisible">
      <div class="modal-dialog">
        <div class="modal-content">
          <button class="close">
            <span @click="inputVisible = false">x</span>
          </button>
          <div class="modal-body">
            <form>
              <div class="input-group">
                <input type="text" class="ig-text" placeholder="文件夹名字" value ref="CreateFolder"
                  @keyup.enter="createFolder" />
                <span class="border"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
  </div>
</template>
 
<style scoped>
.input-group .border {
  position: absolute;
  height: 2px;
  bottom: 0px;
  right: 50%;
  left: 50%;
  background-color: #03a9f4;
  transition: right 0.4s ease-in, left 0.4s ease-in-out;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 3000;
}

.input-group input:focus+.border {
  left: 0;
  right: 0;
}

.input-group input {
  outline: none;
}

.input-group {
  position: relative;
}

.modal-body {
  position: relative;
  padding: 30px 35px;
}

.close span {
  width: 25px;
  height: 25px;
  display: block;
  border-radius: 50%;
  line-height: 24px;
  text-shadow: none;
}

.close {
  right: 15px;
  font-weight: normal;
  opacity: 1;
  font-size: 18px;
  position: absolute;
  text-align: center;
  top: 16px;
  z-index: 1;
  border-radius: 50%;
  padding: 0;
  background-color: #e8e8e8;
  color: #7b7b7b;
  border: 0;
}

.modal-content {
  border-radius: 3px;
  box-shadow: none;
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid transparent;
  outline: 0;
}

.modal-dialog {
  position: fixed;
  right: 25px;
  bottom: 110px;
  width: 400px;
  margin: 0;
  height: 110px;
  opacity: 1;
}

.ig-text {
  width: 100%;
  height: 40px;
  border: 0;
  background-color: transparent;
  text-align: center;
  border-bottom: 1px solid #eee;
  color: #32393f;
  box-shadow: none;
  font-size: 13px;
}

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

.el-dropdown-link {
  position: fixed;
  z-index: 1000;
  bottom: 50px;
  right: 30px;
}

.el-dropdown-menu {
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
import { getFileOrFolder, createNewFolder, deleteFile, deleteFolder, filePreview, downloadFile } from "@/api/user";
import Upload from "@/components/Upload";
export default {
  components: { Upload },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "images",
          postfix: null,
          size: null,
          downloadTime: null,
          type: null,
          uploadTime: "Jun 2, 2008 10:40 PM",
        },
      ],
      folderId: 0,
      listLoading: true,
      inputVisible: false,
      dialogVisible: false,
      content: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getFileOrFolder(this.folderId).then((resp) => {
        this.list = resp.data.folderList;
        this.content = resp.data.content;
        this.listLoading = false;
      });
    },

    rotateDiv() {
      // 获取 div 节点
      const divNode = this.$refs.rotateDiv;
      // 判断 div 是否已经旋转
      if (divNode.style.transform == "rotate(135deg)") {
        // 如果已经旋转，则返回原来的状态
        divNode.style.transform = "rotate(0deg)";
        divNode.style.backgroundColor = "#ff726f";
      } else {
        // 如果没有旋转，则旋转 90 度
        divNode.style.transform = "rotate(135deg)";
        divNode.style.backgroundColor = "#ff524f";
      }
    },
    // 显示input节点,并将焦点锁定
    showInput() {
      this.inputVisible = !this.inputVisible;
      this.$nextTick(() => {
        this.$refs.CreateFolder.focus();
      });
    },
    // 监听回车事件,发送请求
    createFolder() {
      const input_node = this.$refs.CreateFolder;
      this.listLoading = true;
      createNewFolder({
        parentFolderId: this.folderId,
        folderName: input_node.value,
      }).then((resp) => {
        getFileOrFolder(this.folderId).then((resp) => {
          this.list = resp.data.folderList;
        this.content = resp.data.content;
          this.listLoading = false;
        });
      });
      this.inputVisible = false;
      input_node.value = "";
    },

    enterFolder(folderId) {
      this.listLoading = true;
      this.folderId = folderId;
      getFileOrFolder(this.folderId).then((resp) => {
        this.list = resp.data.folderList;
        this.content = resp.data.content;
        this.listLoading = false;
      });
    },

    deleteFile(fileId) {
      deleteFile(fileId).then((resp) => {
        this.$message({
          message: resp.message,
          type: 'success'
        })
        this.flushFile();
      })
    },
    
    // 刷新文件操作
    flushFile() {
      this.listLoading = true;
      getFileOrFolder(this.folderId).then((resp) => {
        this.list = resp.data.folderList;
        this.content = resp.data.content;
        this.listLoading = false;
      });
    }
  },
};
</script>

