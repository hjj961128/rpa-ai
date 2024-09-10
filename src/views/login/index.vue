<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" class="left-con">
        <!-- <img class="bg" src="../../assets/images/login-bg.png" /> -->
        <!-- 登录表单 -->
        <div class="content-con">
          <div class="login-title">{{ isLogin ? "欢迎登录" : "重置密码" }} <span style="font-size:16px;color:#9195a3">RPA+AI系统</span></div>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginFormRef"
            label-width="auto"
            style="max-width: 600px"
            auto-complete="on"
          >
            <el-form-item prop="name">
              <el-input
                placeholder="请输入用户名"
                v-model="loginForm.name"
                clearable
                auto-complete="on"
                style="height: 60px;"
                class="custom-input"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <user />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="praswood">
              <el-input
                placeholder="请输入密码"
                show-password
                v-model="loginForm.praswood"
                clearable
                auto-complete="on"
                @keyup.enter="onSubmit"
                style="height: 60px;"
                class="custom-input"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <!-- <div class="forget" @click="fogetpro"> 忘记密码？</div> -->
            <el-form-item>
              <el-button class="btn-login"  type="primary" @click="onSubmit" :loading="loading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12" class="right-con">
        
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useUserCounter } from "@/stores/user";
import { ElMessage } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";

import request from "@/utils/request";
import { useRoute } from "vue-router";
import { reactive, watch, ref } from "vue";
// import router from "@/router/index.js";
import { useRouter } from "vue-router";

const router = useRouter();
import CryptoJS from "crypto-js";

const userStore = useUserCounter();
const isLogin = true;
// do not use same name with ref

const loading = ref(false)
const loginForm = reactive({
  name: "",
  praswood: "",
});
const loginFormRef = ref(null);
const validateUsername = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};

const validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const rules = {
  name: [{ validator: validateUsername, trigger: "blur" }],
  praswood: [{ validator: validatePassword, trigger: "blur" }],
};

const redirect = ref(null);
const otherQuery = ref({});
const route = useRoute();
const getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
};
watch(
  route,
  (newValue, oldValue) => {
    const query = route.query;
    if (query) {
      redirect.value = query.redirect;
      otherQuery.value = getOtherQuery(query);
    }
  },
  { deep: true, immediate: true }
);

const Pandora = (plaintext) => {
  if (!plaintext) return "";
  const secretKey = "BiMYkWPwm9e29Leyqoc829Jnhfeu229P"; // 应该是一个复杂的密钥
  const iv = CryptoJS.enc.Utf8.parse("7392999056822815"); // 初始化向量
  const encrypted = CryptoJS.AES.encrypt(
    plaintext,
    CryptoJS.enc.Utf8.parse(secretKey),
    { iv: iv, mode: CryptoJS.mode.CBC }
  );
  return encrypted.toString();
};

function onSubmit() {
  loginFormRef.value.validate((valid) => {
    loading.value = true;
    if (valid) {
      request({
        method: "POST",
        url: "/api/auth/login",
        data: {
          username: loginForm.name,
          password: Pandora(loginForm.praswood),
        },
      })
        .then(async (res) => {
          sessionStorage.setItem("Authorization", res.data.data.access_token);
          sessionStorage.setItem("refresh_token", res.data.data.refresh_token);
          ElMessage({
            showClose: true,
            message: "登录成功",
            type: "success",
          });

          loading.value = false;
          if (sessionStorage.getItem("Authorization")) {
            await userStore.setUserInfo();
          }
          router.push({ path: redirect.value || "/", query: otherQuery.value });
        })
        .catch((err) => {
          ElMessage({
            showClose: true,
            message: err,
            type: "error",
          });
          loading.value = false;
        });
    } else {
      ElMessage.error("登录失败");
      loading.value = false;
      return false;
    }
  });
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/images/login.jpg');
  /* 替换为你的图片路径 */
  background-size: cover;
  /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat;
  /* 背景图片不重复 */
}
.login-title {
  text-align: center;
  font-size: 28px;
  /* color: #2293fc;
   */
  margin-bottom: 20px;
}
.left-con {
  position: relative;
  height: 100vh;
  /* background: #f2f8fd; */
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
  background-color: #fff;
  padding: 50px;
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
  background: #4E6EF2;
  color: #fff;
  /* border-radius: 56px; */
  margin-top: 20px;
  font-size: 20px;
}
.custom-input .el-input__inner {
  font-size: 16px; /* 设置字体大小为16px */
}
</style>
