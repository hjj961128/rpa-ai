<template>
  <div class="main_page">
    <div>
      <el-button plain @click="publish" type="primary" class="btn">
        发布
        <el-icon class="el-icon--right">
          <Upload />
        </el-icon>
      </el-button>
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
import { useRouter } from 'vue-router';

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
onMounted(() => {
  const token = sessionStorage.getItem("centerMtoken");
  iframe.value = `${iframeSrc}?token=${token}`;
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
.btn{
  width: 100%;
}
</style>
