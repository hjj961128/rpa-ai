<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" class="left-con">
        <img class="bg" src="../../assets/images/login-bg.png" />
      </el-col>
      <el-col :span="12" class="right-con">
        <!-- 登录表单 -->
        <div class="content-con">
          <div class="login-title">{{ isLogin ? "登录" : "重置密码" }}</div>
          <el-form
            :model="loginForm"
            label-width="auto"
            style="max-width: 600px"
            auto-complete="on"
          >
            <el-form-item ant-row ant-form-item label="用户名">
              <el-input placeholder="请输入用户名" v-model="loginForm.name" clearable auto-complete="on" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                placeholder="请输入密码"
                show-password
                v-model="loginForm.praswood"
                clearable
                auto-complete="on"
              />
            </el-form-item>
            <!-- <div class="forget" @click="fogetpro"> 忘记密码？</div> -->
            <el-form-item>
              <el-button class="btn-login" type="primary" @click="onSubmit"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useUserCounter } from "@/stores/user";
import { ElMessage } from "element-plus";
import request from "@/utils/request";
import { reactive } from "vue";
const userStore = useUserCounter();
const isLogin = true;
// do not use same name with ref
const loginForm = reactive({
  name: "",
  praswood: "",
});
function onSubmit() {
  request({
    method: "POST",
    url: "/api/auth/login",
    data: {
      username: loginForm.name,
      password: loginForm.praswood,
    },
  })
    .then((res) => {
      sessionStorage.setItem("Authorization", res.data.data.access_token);
      sessionStorage.setItem("refresh_token", res.data.data.refresh_token);
      ElMessage({
        showClose: true,
        message: "登录成功",
        type: "success",
      });
      console.log("sessionStorage");
      console.log(sessionStorage.getItem("Authorization"));
      console.log("sessionStorage");

      if (sessionStorage.getItem("Authorization")) {
        userStore.setUserInfo();
      }
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err.response.data.detail,
        type: "error",
      });
    });
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
}
.login-title {
  text-align: center;
  font-size: 28px;
  color: #2293fc;
  margin-bottom: 52px;
}
.left-con {
  position: relative;
  height: 100vh;
  background: #f2f8fd;
}
.bg {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -45%);
  transform: translate(-50%, -45%);
}
.right-con {
  position: relative;
  height: 100vh;
}
.content-con {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.forget {
  font-size: 16px;
  color: #666;
  margin-top: 40px;
  text-align: right;
  cursor: pointer;
}
.btn-login {
  width: 387px;
  height: 56px;
  background: #2293fc;
  color: #fff;
  border-radius: 56px;
  margin-top: 49px;
}
</style>
