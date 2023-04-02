<template>
  <div class="menu-wrapper">
    <ul class="menu-list">
      <li>
        <a href="#" title="删除">
          <button class="feba-toggle_item" type="button">
            <span>
              <i
                class="el-icon-delete"
                style="font-weight: 800; color: #fff"
              ></i>
            </span>
          </button>
        </a>
      </li>
      <li>
        <a href="#" title="下载">
          <button class="feba-toggle_item" type="button">
            <span>
              <i
                class="el-icon-download"
                style="font-weight: 800; color: #fff"
              ></i>
            </span>
          </button>
        </a>
      </li>
      <li>
        <a href="#" title="预览">
          <button class="feba-toggle_item" type="button">
            <span>
              <i
                class="el-icon-picture"
                style="font-weight: 800; color: #fff"
              ></i>
            </span>
          </button>
        </a>
      </li>
    </ul>
    <button class="menu-btn" @click="btnClick"></button>
  </div>
</template>

<style scoped>
.menu-wrapper {
  position: relative;
  z-index: 1000;
  height: 36px;
  width: 36px;
  margin: 0 auto;
  border: 1px #333;
}

.menu-btn {
  height: 36px;
  width: 36px;
  border: 0px;
  background: transparent
    url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNiAxMGMtMS4xIDAtMiAwLjktMiAyczAuOSAyIDIgMiAyLTAuOSAyLTItMC45LTItMi0yem0xMiAwYy0xLjEgMC0yIDAuOS0yIDJzMC45IDIgMiAyIDItMC45IDItMi0wLjktMi0yLTJ6bS02IDBjLTEuMSAwLTIgMC45LTIgMnMwLjkgMiAyIDIgMi0wLjkgMi0yLTAuOS0yLTItMnoiLz48L3N2Zz4K)
    no-repeat center;
  opacity: 0.4;
}

.menu-btn-click {
  opacity: 1;
}

.menu-btn:hover {
  opacity: 1;
}
.feba-toggle_item {
  width: 35px;
  height: 35px;
  line-height: 35px;
  background-color: #ffc107;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  text-align: center;
  border: 0;
  padding: 0;
}
.feba-toggle_item:hover {
  background-color: #f7b900;
}

.menu-list {
  position: absolute;
  height: 36px;
  right: 40px;
  display: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.menu-list-click {
  display: flex;
  justify-content: flex-end;
}

.menu-list li {
  height: 36px;
  display: inline-block;
  margin-left: 10px;
  line-height: 36px;
}

.menu-list a {
  display: inline-block;
  color: #333;
  text-decoration: none;
}
</style>

<script>
export default {
  methods: {
    btnClick() {
      var menuBtn = this.$el.querySelector(".menu-btn");
      var menuList = this.$el.querySelector(".menu-list");
      // 判断菜单是否已经显示
      console.log(menuList.classList.contains("menu-list-click"));
      if (!menuList.classList.contains("menu-list-click")) {
        menuList.classList.add("menu-list-click");
        menuBtn.classList.add("menu-btn-click");
      } else {
        menuList.classList.remove("menu-list-click");
        menuBtn.classList.remove("menu-btn-click");
      }
    },
    InitDropDown(event) {
      var target = event.target;
      console.log(this.$el);
      var menuWrapper = this.$el.querySelector(".menu-wrapper");
      var menuBtn = this.$el.querySelector(".menu-btn");
      // 判断点击的元素是否为菜单或菜单的子元素
      if (target !== menuWrapper && !menuWrapper.contains(target)) {
        var menuList = this.$el.querySelector(".menu-list");
        menuList.classList.remove("menu-list-click");
        menuBtn.classList.remove("menu-btn-click");
      }
    },
  },
};
</script>

