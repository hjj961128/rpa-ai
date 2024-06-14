<template>
  <div>
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="top-search">
      <el-form :model="form" label-width="auto">
        <el-form-item label="用户名称">
          <el-input width="'300" class="sinp" v-model="form.name" />
          <el-button class="sbtn" type="primary">查询</el-button>
          <div class="btns">
            <el-button class="sbtn" type="primary">停用</el-button>
            <el-button class="sbtn" type="primary">启用</el-button>
            <el-button class="sbtn" type="primary">删除</el-button>
            <el-button class="sbtn" type="primary">增加用户</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="Date" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="序号" label="Name" width="120" />
        <el-table-column property="用户名称" label="Name" width="120" />
        <el-table-column property="账号" label="Name" width="120" />
        <el-table-column property="角色" label="Name" width="120" />
        <el-table-column property="状态" label="Name" width="120" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            {{ scope.row.date }}
            <div> </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">
          Toggle selection status of second and third rows
        </el-button>
        <el-button @click="toggleSelection()">Clear selection</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const form = reactive({
  name: "",
});
</script>
<style lang="less" scoped>
.top-search {
  margin-top: 30px;
  width: 100%;
}

.sinp {
  display: inline-block;
  width: 200px;
}
.sbtn {
  display: inline-block;
}
.btns {
  float: right;
}
</style>