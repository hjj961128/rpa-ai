<template>

  <div class="m-center-container">
      <iframe
      id="m_center"
      :src="centerMIndex"
      width="100%"
      height="100%"
      frameborder="0"
      allowfullscreen
    ></iframe>

  </div>


</template>


<script setup>

import {ElMessage, ElMessageBox} from 'element-plus'
import {ref, onMounted,onBeforeMount} from "vue";
import request from "@/utils/request.js";
import router from "@/router/index.js";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "center"
});

const centerMIndex = ref('')
const centerMToken = ref('')
const centerMURL = ref('http://106.14.149.100:8178/index')


onBeforeMount(async ()=>{

  await getCenterMToken()
  // if(sessionStorage.getItem("centerMtoken")){
  //   centerMToken.value = sessionStorage.getItem("centerMtoken")
  //
  // }else {
  //   await getCenterMToken()
  // }

  centerMIndex.value = `${centerMURL.value}?token=${centerMToken.value}`

})

// 生命周期函数
onMounted(async () => {
  console.log('onMounted')
  // 获取center token
})

// 获取center token
const getCenterMToken = async () => {


  try {
    const res = await request({method: "GET",url: "/api/auth/mcenter-token"})
    sessionStorage.setItem("centerMtoken", res.data.data.token);
    centerMToken.value =   res.data.data.token
  }catch (e) {
    ElMessage({
          showClose: true,
          message: err,
          type: "error",
        });
  }
}

</script>

<style scoped>

.m-center-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 66px);
}

</style>
