<template>
  <div class="main_page">
    <div class="top_search">
      <el-input
        :prefix-icon="Search"
        v-model="searchValue"
        style="max-width: 600px"
        placeholder="输入工具箱名称条件查询"
        class="input-with-select"
        size="large"
      >
        <template #append>
          <el-button type="primary">搜索</el-button>
        </template>
      </el-input>
    </div>
    <div class="toplist">
      <div class="box">
        <img src="../../../assets/images/login-bg.png" alt="">
        
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const searchValue = ref("");
</script>
<style lang="scss" scoped>
.main_page {
  width: 100%;
  .top_search {
    text-align: center;
  }
}
.el-input-group__append button.el-button,
.el-input-group__append button.el-button:hover,
.el-input-group__append div.el-select .el-select__wrapper,
.el-input-group__append div.el-select:hover .el-select__wrapper,
.el-input-group__prepend button.el-button,
.el-input-group__prepend button.el-button:hover,
.el-input-group__prepend div.el-select .el-select__wrapper,
.el-input-group__prepend div.el-select:hover .el-select__wrapper {
  // background-color: ;
}
</style>
