<template>
  <div class="main_page">
    <!-- 面包屑 -->
    <div>
      <div class="leftaa">
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
      <div class="rightaa">
        <el-button plain @click="publish" type="primary">
          发布
          <el-icon class="el-icon--right">
            <Upload />
          </el-icon>
        </el-button>
      </div>
    </div>
    <iframe
      id="my-iframe"
      :src="iframe"
      width="100%"
      height="100%"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script setup>
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { Upload } from "@element-plus/icons-vue";
import request from "@/utils/request";
import { ElMessage, ElMessageBox } from "element-plus";

// import router from "../../router/index.js";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const iframe = ref(null);
const iframeSrc = `http://106.14.149.100:8178/webCreator/creator/${route.query.id}`; // 你的iframe内容的URL
const publish = () => {
  request({
    method: "POST",
    url: "/api/process/distribute",
    params: {
      id: route.query.processId,
    },
  })
    .then((res) => {
      ElMessage({
        type: "success",
        message: "发布成功",
      });
      router.push({ name: "processlist" });
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
const gohome = () => {
  router.push("/home");
};
const goBack = () => {
  router.go(-1);
};
onMounted(() => {
  // const token = sessionStorage.getItem("centerMtoken");
  iframe.value = `${iframeSrc}?token=${route.query.token}`;
});
</script>
<style lang="scss" scoped>
.main_page {
  position: relative;
  width: 100%;
  height: 100%;
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
#my-iframe {
  position: fixed;
  top: 1;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 9;
}
.btn {
  width: 100%;
}
.leftaa {
  width: 50%;
  display: inline-block;
  margin-top: 20px;
}
.rightaa {
  width: 50%;
  display: inline-block;
  margin-top: 20px;
  text-align: right;
  padding-right: 50px;
}
</style>
