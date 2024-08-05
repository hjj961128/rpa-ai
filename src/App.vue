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
  width: 150px !important;
  color: #fff !important;
  font-size: 20px !important;
  font-weight: 700 !important;
}
.el-sub-menu__icon-arrow {
  color: #fff !important;
  font-weight: 700 !important;
  width: 150px !important;
  right: -40px !important;
}
/* .el-tooltip__trigger  {
    background-color: red;
} */
.el-sub-menu.is-opened .el-sub-menu__list {
  display: block; /* 显示子菜单列表 */
  background-color: red !important;
}
.el-menu-bg-color {
  background-color: red !important;
}
.el-menu--popup{
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
.el-sub-menu.is-active .el-sub-menu__title{
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
