// right-key-menu.vue 
<template>
  <div id="right-key-menu" class="right-key-menu">
    <div class="rightKeyMenuItem" @click="$emit('edit')">编辑</div>
    <div class="rightKeyMenuItem" @click="$emit('del')">删除</div>
  </div>
</template>
<script>
//...忽略
export default {
  beforeMount() {
    this.$on('load', this.onload)
  },
  methods: {
    onload(row, column, event) {
      //调整菜单出现的位置
      console.log(row);
      let menu = document.querySelector("#right-key-menu");
      let betweenHeight = document.body.clientHeight - event.clientY;
      if (betweenHeight < 150) {
        menu.style.top = event.clientY - 80 + "px";
      } else {
        menu.style.top = event.clientY - 30 + "px";
      }
      menu.style.left = event.clientX + 20 + "px";
      // 监听dom的click事件
      document.addEventListener("click", this.$emit("rightClick"));
    },
  },
};
</script>      
<style>
.right-key-menu {
  display: block;
  line-height: 34px;
  text-align: center;
}
.right-key-menu:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.right-key-menu {
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
.rightKeyMenuItem:hover {
  cursor: pointer;
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
</style>