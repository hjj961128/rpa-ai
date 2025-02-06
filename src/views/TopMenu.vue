<template>
  <div>
    <el-menu
      :default-active="$route.path"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="transparent"
      active-text-color="#079B79"
      @select="handleSelect"
      
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-sub-menu index="2" popper-class="test">
        <template #title>
          <div class="submenu-title">成果库</div>
        </template>
        <el-menu-item
          style="
            border-bottom: 2px solid #fff;
            height: 66px;
            line-height: 66px;
            color: #fff;
            text-align: center;
            font-size: 16px;
          "
          index="/schemeLibrary"
          ><div class="submenu-title">方案库</div></el-menu-item
        >
        <el-menu-item
          style="
            height: 66px;
            line-height: 66px;
            color: #fff;
            text-align: center;
            font-size: 16px;
          "
          index="/workBoxIndex"
          ><div class="submenu-title">工具箱</div></el-menu-item
        >
      </el-sub-menu>
      <el-menu-item index="/processlist">流程画布</el-menu-item>
      <el-menu-item index="/center" v-if="hasPermission()"
        >中控管理</el-menu-item
      >
      <el-menu-item index="/systemManagement">系统管理</el-menu-item>
      <div class="userinfo">
        <el-dropdown placement="bottom-start">
          <span class="el-dropdown-link" v-if="userStore.userInfo">
            {{ userStore.userInfo.nickname }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button @click="dialogVisible = true" link
                  >修改密码</el-button
                >
              </el-dropdown-item>

              <el-dropdown-item>
                <el-button @click="goLogin" link>退出登陆</el-button>
              </el-dropdown-item>
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
    @closed="handleClose"
  >
    <div style="text-align: center; margin-bottom: 10px; color: #e6a23c">
      修改成功后将自动退出，重新登录
    </div>
    <el-form
      ref="passwordFormRef"
      :model="passwordForm"
      :rules="rules"
      label-width="auto"
      style="max-width: 600px"
    >
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="passwordForm.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="再次确认密码" prop="passwordAgain">
        <el-input
          v-model="passwordForm.passwordAgain"
          type="password"
          placeholder="请输入确认密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="putPassword()"> 确认修改 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { onMounted, ref } from "vue";

import { useUserStore } from "@/stores/modules/user";
import { useTokenStore } from "@/stores/modules/auth";

import request from "@/utils/request";
// import router from "../router/index.js";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
function handleSelect(val) {}
import { useRouter } from "vue-router";
const passwordFormRef = ref();
const validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};
const validatePasswordAgain = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else {
    callback();
  }
};

const rules = {
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  passwordAgain: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
  ],
};
const router = useRouter();
const tokenStore = useTokenStore();
const goLogin = () => {
  tokenStore.setToken("");
  router.push({ path: "/login" });
};
const dialogVisible = ref(false);
const passwordForm = ref({
  password: null,
  passwordAgain: null,
});
// 修改密码putPassword
const putPassword = () => {
  passwordFormRef.value.validate((valid) => {
    if (valid) {
      request({
        method: "PUT",
        url: "/api/auth/reset-password",
        data: {
          password: passwordForm.value.password,
          password_again: passwordForm.value.passwordAgain,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            ElMessage({
              showClose: true,
              message: "修改成功，请重新登录",
              type: "success",
            });
            goLogin();
          }
          dialogVisible.value = false;
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
    }
  });
};

const handleClose = () => {
  passwordFormRef.value.resetFields();
  dialogVisible.value = false;
};

// const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
const userStore = useUserStore();

onMounted(() => {});

const hasPermission = () => {
  return userStore.userInfo.roles?.indexOf("admin") !== -1;
};
</script>
<style lang="scss" scoped>
.el-menu {
  text-align: center;
  height: 66px !important;
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
  font-family: AlibabaPuHuiTiR;
  font-size: 18px;
  color: #323233;
  line-height: 25px;
  text-align: center;
  font-style: normal;
}

.el-menu-item.is-active {
  width: 150px;
  font-family: AlibabaPuHuiTiB !important;
  font-size: 18px !important;
  color: #079b79 !important;
  line-height: 25px !important;
  text-align: center !important;
  font-style: normal !important;
}
.el-menu-item:hover {
  background-color: rgba($color: #000000, $alpha: 0.2) !important; /* 鼠标悬停时的背景颜色 */
  color: #079b79 !important; /* 鼠标悬停时的文字颜色 */
}
.submenu-title {
    height: 100%;
    width: 100%;
    display: flex; /* 使用Flexbox布局 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    width: 150px !important;
    font-family: AlibabaPuHuiTiR !important;
    font-size: 18px !important;
    color: #323233 !important;
    line-height: 25px !important;
    text-align: center !important;
    font-style: normal !important;
}
.submenu-title:hover{
  color: #079b79 !important;
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
  height: 66px;
  line-height: 66px;
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
