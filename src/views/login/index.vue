<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" class="left-con">
        <img class="bg" src="../../assets/images/login-bg.png">
      </el-col>
      <el-col :span="12" class="right-con">
        <!-- 登录表单 -->
        <div class="content-con">
          <div class="login-title">{{isLogin ? '登录':'重置密码'}}</div>
          <el-form :model="loginForm" label-width="auto" style="max-width: 600px">
            <el-form-item ant-row ant-form-item label="用户名">
              <el-input v-model="loginForm.name" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginForm.praswood" />
            </el-form-item>
              <!-- <div class="forget" @click="fogetpro"> 忘记密码？</div> -->
            <el-form-item>
              <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import request from "@/request";
import { reactive } from 'vue'
const isLogin = true
// do not use same name with ref
const loginForm = reactive({
  name: '',
  praswood: ''
})
function onSubmit() {
  console.log(loginForm.name);
  request({
    method: 'POST',
    url: '/api/auth/access-token',
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      username: loginForm.name,
      password: loginForm.praswood
    }
  }).then((res)=>{
    console.log(res);
  })
  
  
}
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<style scoped>
.login-container{
  width: 100vw;
  height: 100vh;
}
.login-title{
  text-align: center;
  font-size: 28px;
  color: #2293FC;
  margin-bottom: 52px;
}
.left-con{
  position: relative;
  height: 100vh;
  background: #f2f8fd
}
.bg{
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -45%);
  transform: translate(-50%, -45%);
}
.right-con{
  position: relative;
  height: 100vh;
}
.content-con{
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
.btn-login{
  width: 387px;
    height: 56px;
    background: #2293FC;
    color: #fff;
    border-radius: 56px;
    margin-top: 49px;
}
</style>
