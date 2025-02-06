<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView :key="$route.fullPath"/>
</template>
<style lang="scss">
body {
  background-color: #fff;
  color: #000;
}
.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  width: 150px !important;
  font-family: AlibabaPuHuiTiR !important;
  font-size: 18px !important;
  color: #323233 !important;
  line-height: 25px !important;
  text-align: center !important;
  font-style: normal !important;
}
.el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover {
  background-color: rgba($color: #000000, $alpha: 0.2) !important; /* 鼠标悬停时的背景颜色 */
  color: #079b79 !important; /* 鼠标悬停时的文字颜色 */
}
.el-menu--popup {
  background-color: #4CD7AD;
  padding: 0;
  color: #fff;
  text-align: center;
}
.el-menu--popup-container {
  padding: 0;
  background-color: #4CD7AD;
  color: #fff;
}

.el-sub-menu .el-sub-menu__icon-arrow {
  font-size: 16px !important;
  right: -35% !important;
  top: 45%;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

/* 适用于所有浏览器 */
body {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}
.test {
  // border: none !important;
  
  .el-menu {
    // 修改二级菜单整个背景颜色
    background-color: #D3F4EE;
    color: #079B79;
    text-align: center;
    // 二级菜单中的子选项
    .el-menu-item {
      background-color: transparent !important;
      color: #079B79 !important;
      width: 150px;
      font-size: 16px;
      text-align: center;
      // 被选择的子选项
      &:not(.is-disabled):hover {
        // width: 100%;
        text-align: center;
      }
    }
  }
  // 弹出的二级菜单
  .el-menu--popup {
    background-color: rgba(234,249,249) !important;
    width: 150px !important;
    min-width: 6.5rem !important;
    min-height: 7rem !important;
    text-align: center !important;
    color: #323233;
    flex-direction: column; /* 使菜单项垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  }
  /* 为弹出菜单添加一个自定义类 */
.el-menu--popup.custom-popup {
  display: flex;
  flex-direction: column; /* 使菜单项垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
}

/* 确保每个菜单项也使用Flexbox布局 */
.el-menu--popup.custom-popup .el-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
}
.el-input__wrapper {
  box-shadow: none !important;
  border: 1px solid #37b6a0 !important;
  padding: 5px 10px !important;
  border-radius: 4px !important;
}
.el-input__inner {
  background: #fff !important;
  height: 100% !important;
  font-size: 16px !important;
}
.el-input__icon {
  font-size: 18px !important; /* 设置图标大小 */
}
.el-button--primary {
  background-color: #37b6a0 !important;
  border-color: #37b6a0 !important;
}
/* 添加自动填充的样式 */
.auto-fill-input input::-webkit-input-placeholder {
  color: transparent !important;
}
.auto-fill-input input:-moz-placeholder {
  color: transparent !important;
}
.auto-fill-input input::-moz-placeholder {
  color: transparent !important;
}
.auto-fill-input input:-ms-input-placeholder {
  color: transparent !important;
}
 
/* 添加背景颜色 */
.auto-fill-input input:focus {
  background-color: rgba(13, 117, 165, 0.5) !important; /* 你想要的底色 */
}
.el-input__inner:-webkit-autofill {
    transition: background-color 50000s ease-in-out 0s !important; 
    -webkit-text-fill-color: #999 !important; //记住密码的颜色
    caret-color: #37b6a0 !important;//改变输入框光标颜色,同时又不改变输入框里面的内容的颜色
    font-size: 16px !important;
}
.el-pagination.is-background .btn-next.is-active, .el-pagination.is-background .btn-prev.is-active, .el-pagination.is-background .el-pager li.is-active{
  background-color: #079B79 ;
}
</style>
