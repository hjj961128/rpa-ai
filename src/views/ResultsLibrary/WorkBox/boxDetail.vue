<template>
  <div class="main_page">
    <div class="main">
      <!-- 面包屑 -->
      <div class="breadclass">
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
      <div class="top" v-if="toolList.features">
        <div class="title1">功能介绍</div>
        <div class="top-div">
          <el-card
            class="bxcard"
            v-for="(item, index) in toolList.features"
            :key="index"
          >
            <div class="iconImg el-icon-Watch">
              <svg-icon name="fetures"></svg-icon>
            </div>
            <div class="icontitle">{{ item.name }}</div>
            <div class="iconTxt">
              {{ item.description }}
            </div>
          </el-card>
        </div>
      </div>
      <div class="center">
        <div class="title1">{{ toolList.title }}</div>
        <div class="centerview">
          <div class="left">
            <img :src="toolList.imgurl" alt="" />
          </div>
          <div class="right">
            <div class="show"></div>
            <div class="show">
              <div class="showTitle">简介</div>
              <div class="showDetail">{{ toolList.description }}</div>
            </div>
            <div class="show" v-if="toolList.doc">
              <div class="showTitle">接口文档</div>
              <a :href="toolList.doc">下载接口文档</a>
            </div>
            <div class="show" v-if="toolList.title == '协议编制拼接RPA'">
              <div class="showTitle">使用工具</div>
              <ul>
                <li>
                  <el-upload
                    v-model:file-list="fileEList"
                    class="upload-demo"
                    :limit="1"
                    :auto-upload="false"
                    action="#"
                    accept=".xls,.xlsx"
                    :on-remove="handleERemove"
                  >
                    <el-button plain type="primary">请选择Excel文件</el-button>
                  </el-upload>
                </li>
                <li>
                  <el-upload
                    v-model:file-list="fileWList"
                    class="upload-demo"
                    :limit="1"
                    :auto-upload="false"
                    action="#"
                    accept=".docx"
                    :on-remove="handleWRemove"
                  >
                    <el-button plain type="primary">请选择World文件</el-button>
                  </el-upload>
                </li>
                <li>
                  <el-button type="primary" @click="submitFile"
                    >上传并下载文件</el-button
                  >
                </li>
              </ul>
            </div>
            <div class="show" v-if="toolList.case">
              <div class="showTitle">已有案例</div>
              <el-link type="primary">{{ toolList.case }}</el-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";
import { useRouter } from "vue-router";
const baseURL = ref(import.meta.env.VUE_APP_BASE_URL);
import httpClient from "../../../utils/request.js";

const router = useRouter();
const route = useRoute();
const fileEList = ref([]);
const fileWList = ref([]);

const handleERemove = (file, uploadFiles) => {
  fileEList.value = uploadFiles;
};
const handleWRemove = (file, uploadFiles) => {
  fileWList.value = uploadFiles;
};
const submitFile = () => {
  const formData = new FormData();
  fileWList.value.forEach((item1) => {
    formData.append("word_file", item1.raw);
  });
  fileEList.value.forEach((ele) => {
    formData.append("excel_file", ele.raw);
  });

  request({
    method: "POST",
    url: "/api/tools-api/excel-join-word",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob", // 告知 Axios 以 blob 格式接收响应数据
    data: formData,
  })
    .then((res) => {
      console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const fileName = decodeURI(res.headers["filename"]);
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
const toolList = ref([]);
const gettoolList = () => {
  request({
    method: "GET",
    url: "/api/tool",
    params: {
      id: route.query.id,
      limit: false,
    },
  })
    .then((res) => {
      toolList.value = res.data.data.list[0];
      toolList.value.imgurl =
        httpClient.defaults.baseURL + "api/image?name=" + toolList.value.image;
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
  gettoolList();
});
</script>
<style lang="scss" scoped>
.main_page {
  width: 100%;
  background-color: #fff;
  .breadclass {
    width: 1920px;
    height: 42px;
    box-shadow: inset 0px -1px 0px 0px #f1f2f7;
    font-family: AlibabaPuHuiTiR;
    font-size: 14px;
    color: #303133;
    line-height: 42px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    padding-left: 24px;
  }
  .bottom_c {
    margin: 24px;
    padding: 24px;
    width: 100%;
    background: #ffffff;
    background-image: url("../../../assets/images/cbg.png"); /* 替换为你的图片路径 */
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
}
.top-title {
  width: 100%;
  height: 180px;
  background-image: url("../assets/images/home-bg.jpg");
  /* 替换为你的图片路径 */
  background-size: cover;
  /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat;
  /* 背景图片不重复 */
}

.top-div {
  margin-top: 20px;
  height: 200px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  padding-top: 20px;

  .iconImg {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .icontitle {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #333;
  }

  .iconTxt {
    width: 80%;
    margin: 10px auto;
    font-size: 14px;
    color: #333;
  }
}

svg {
  width: 48px;
  height: 48px;
  color: rgb(81, 81, 81);
}

.title1 {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-family: YouSheBiaoTiHei;
  font-size: 22px;
  color: #303133;
  line-height: 28px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 32px;
    height: 32px;
  }
}

.centerview {
  display: flex;
  margin: auto;
  margin-top: 32px;
  width: 60%;
  background-color: #fff;
  background-image: url("../../../assets/images/cb.png"); /* 替换为你的图片路径 */
  background-size: cover; /* 或者使用 contain */
  background-position: center; /* 确保图片居中 */
  background-repeat: no-repeat; /* 确保不重复 */
  box-shadow: inset 0px -1px 0px 0px rgba(0, 128, 255, 0.48);
  border: 1px solid #e1f6ff;
  border-radius: 3px;
  .left {
    width: 50%;
    padding: 40px;

    // height: 600px;
    img {
      width: 100%;
    }
  }

  .right {
    width: 50%;
    padding: 50px;
    padding-left: 100px;
    // display: inline-block;
  }
}

.bottom {
  margin-top: 40px;
  margin-bottom: 70px;
  .card {
    width: 90%;
    padding: 20px;
    margin-left: 5%;
    background-image: url("../../../assets/images/tableb.png");
    /* 替换为你的图片路径 */
    background-size: cover;
    /* 背景图片覆盖整个元素 */
    background-repeat: no-repeat;

    /* 背景图片不重复 */
    // text-align: center;
    .title {
      width: 100%;
      height: 30px;
      font-weight: 700;
      margin-left: 20px;
    }

    .detail {
      margin-left: 20px;
      margin-top: 20px;
      width: 55%;
      height: 100px;
      color: #797979;
      line-height: 30px;
    }
  }
}

.showTitle:before {
  content: "";
  /* 使用空内容生成内容 */
  background-color: #2468f2;
  /* 设置背景颜色为蓝色 */
  border-radius: 3px;
  /* 圆点形状 */
  display: inline-block;
  /* 使其成为行内块元素 */
  width: 6px;
  /* 宽度 */
  height: 16px;
  /* 高度 */
  margin-left: -1.5em;
  /* 向左移动半个列表项内边距，使得小圆点与文本对齐 */
  margin-right: 0.5em;
  /* 向右移动，为了间隔效果 */
}

.showTitle {
  margin-bottom: 15px;
  font-family: YouSheBiaoTiHei;
  font-size: 18px;
  color: #303133;
  line-height: 28px;
  font-style: normal;
  text-transform: none;
}

.showDetail,
.showui {
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: AlibabaPuHuiTiR;
  font-size: 14px;
  color: #303133;
  line-height: 26px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.show {
  margin-top: 10px;
}

.cardTitle:before {
  content: "";
  /* 使用空内容生成内容 */
  background-color: #2468f2;
  /* 设置背景颜色为蓝色 */
  border-radius: 3px;
  /* 圆点形状 */
  display: inline-block;
  /* 使其成为行内块元素 */
  width: 6px;
  /* 宽度 */
  height: 16px;
  /* 高度 */
  margin-left: -1.5em;
  /* 向左移动半个列表项内边距，使得小圆点与文本对齐 */
  margin-right: 0.5em;
  /* 向右移动，为了间隔效果 */
}
.table-with-bg {
  // background-image: url("../../../assets/images/bbg.png"); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}
</style>
