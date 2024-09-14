<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>
<style lang="scss">
body {
  background-color: #fff;
  color: #000;
}
.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  color: #fff !important;
  font-size: 20px !important;
  font-weight: 700 !important;
}
.el-menu--popup {
  background-color: #1657b2;
  padding: 0;
  color: #fff;
  text-align: center;
}
.el-menu--popup-container {
  padding: 0;
  background-color: #1657b2;
  color: #fff;
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
  border: none !important;
  .el-menu {
    // 修改二级菜单整个背景颜色
    background-color: #1657b2;
    text-align: center;
    // 二级菜单中的子选项
    .el-menu-item {
      background-color: transparent !important;
      color: #fff !important;
      // width: 100%;
      font-size: 14px;
      text-align: center;
      // 被选择的子选项
      &:not(.is-disabled):hover {
        background-color: rgba(0, 0, 0, 0.2) !important;
        // width: 100%;
        text-align: center;
      }
    }
  }
  // 弹出的二级菜单
  .el-menu--popup {
    background-color: #1657b2 !important;
    min-width: 6.5rem !important;
    min-height: 7rem !important;
    text-align: center!important;
  }
}
.content-con {
  .el-input__wrapper{
    box-shadow: none !important;
  }
  .el-input__inner{
    background: #fff !important;
  }
}
</style>
