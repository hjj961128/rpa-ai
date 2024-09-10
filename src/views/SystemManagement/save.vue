<template>
  <div class="main_page">
     <!-- 面包屑 -->
     <div style="margin:20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-link type="primary" @click="gohome()">首页</el-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-link type="primary" @click="goBack()"
            >上一页</el-link
          ></el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="anquan">
      <iframe
      id="my-iframe"
      :src="iframe"
      width="100%"
      height="100%"
      frameborder="0"
      allowfullscreen
    ></iframe>
    </div>
    
  </div>
</template>
<script setup>
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
const baseURL = ref(import.meta.env.VUE_APP_BASE_URL);
import httpClient from "../../utils/request.js";


// import router from "../../router/index.js";
import { useRouter } from 'vue-router';

const router = useRouter();
const getSecondSegment=(str)=> {
  const match = str.match(/^[^:]*:[^:]*:(.*?):/);
  return match ? match[1] : null;
}
const iframe = ref(null);

const iframeSrc ='http://172.28.144.167:8084/'; // 你的iframe内容的URL
console.log(iframeSrc.value);
const gohome = () => {
  router.push("/home");
};
const goBack = () => {
  router.go(-1);
};
onMounted(() => {
  const token = sessionStorage.getItem("centerMtoken");
  iframe.value = `${iframeSrc}?token=${token}`;
console.log(httpClient.defaults.baseURL);

});
</script>
<style lang="scss" scoped>
.main_page {
  position: relative;
  width: 100%;
  height: 100%;
  // margin-left: 30%;
  .overlay {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    /* 确保div在iframe上方 */
  }
}
// #my-iframe {
//   position: fixed;
//   top: 1;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   border: none;
//   z-index: 9;
// }
.btn{
  width: 100%;
}
.anquan{
  width: 100%;
  height: 85vh;
}
</style>
