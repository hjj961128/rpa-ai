<template>
  <div>
    <el-menu
      :default-active="$route.path"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="transparent"
      active-text-color="#1890FF"
      @select="handleSelect"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-sub-menu index="2">
        <template #title>成果库</template>
        <el-menu-item
          style="
            border-bottom: 2px solid #fff;
            height: 60px;
            line-height: 60px;
            color: #fff;
            width: 100%;
            text-align: center;
            font-size: 16px;
          "
          index="/schemeLibraryIndex"
          >方案库</el-menu-item
        >
        <el-menu-item
          style="
            height: 60px;
            line-height: 60px;
            color: #fff;
            width: 100%;
            text-align: center;
            font-size: 16px;
          "
          index="/toBox"
          >工具箱</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item index="/processlist">流程画布</el-menu-item>
      <el-menu-item index="4">中控管理</el-menu-item>
      <el-menu-item index="/systemManagement">系统管理</el-menu-item>
      <div class="userinfo">
        <el-dropdown>
          <span class="el-dropdown-link" v-if="userInfo">
            {{ userInfo.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="dialogVisible = true"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item @click="goLogin">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="修改密码"
    width="500"
    style="text-align: left"
  >
    <el-form :model="passwordForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="密码">
        <el-input v-model="passwordForm.password" />
      </el-form-item>
      <el-form-item label="再次确认密码">
        <el-input v-model="passwordForm.passwordAgain" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="putPassword()"> 确认修改 </el-button>
      </div>
    </template>
  </el-dialog>
</template> 
<script setup>
import { onMounted, ref } from "vue";
import request from "@/utils/request";
import router from "../router/index.js";
import { ElMessage } from "element-plus";
import { ArrowDown } from '@element-plus/icons-vue'
function handleSelect(val) {
}
const goLogin = () => {
  sessionStorage.removeItem("refresh_token");
  sessionStorage.removeItem("Authorization");
  sessionStorage.removeItem("userInfo");
  router.push({ name: "login" });
};
const dialogVisible = ref(false);
const passwordForm = ref({
  password: null,
  passwordAgain: null,
});
// 修改密码putPassword
const putPassword = () => {
  request({
    method: "PUT",
    url: "/api/auth/reset-password",
    data: {
      password: passwordForm.value.password,
      password_again: passwordForm.value.passwordAgain,
    },
  })
    .then((res) => {
      dialogVisible.value = false;
      router.push({ name: "login" });
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
       message: err,
        type: "error",
      });
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
       message: err,
        type: "error",
      });
    });
};
const userInfo = ref({});
onMounted(() => {
  userInfo.value = JSON.parse(sessionStorage.getItem("userInfo"));
});
</script> 
<style lang="scss" scoped>
.el-menu {
  border-bottom: 0 !important;
}
.el-menu-demo {
  width: 100%;
  display: flex;
  font-weight: 900;
  justify-content: center;
  position: relative;
}
/* 水平时，去除底部白边。 */
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.el-menu-item,
.el-sub-menu .el-sub-menu__title {
  width: 150px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

.el-menu-item.is-active {
  background-color: rgba(0, 0, 0, 0.2);
}
.userinfo {
  position: absolute;
  right: 5px;
  color: #fff;
}
.el-dropdown-link {
  color: #fff;
  font-size: 18px;
}
.el-dropdown {
  height: 60px;
  line-height: 60px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-link:focus {
  outline: none;
  cursor: pointer;
}
</style>