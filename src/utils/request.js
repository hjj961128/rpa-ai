import axios from 'axios';
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
const route = useRoute();
const API_BASE_URL = 'http://172.28.144.16:8080/'//tai
// const API_BASE_URL = 'http://127.0.0.1:8080' //sun

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: {
    'Authorization': `${sessionStorage.getItem('Authorization')}`
  }
  // 其他axios配置选项
});
 // 请求拦截器
 apiClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("Authorization");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
apiClient.interceptors.response.use(
  response =>{
    return response
  },
  (error)=>{
    console.log('1111111');
    console.log(error.response);
    if (error.response) {
      // 401响应
      if (error.response.status === 401) {
        // 清除token或做其他登录态清除工作
        // store.commit('LOGOUT');

        // 使用Vue路由器跳转到登录页面
        // router.push('/login');
        ElMessage({
          showClose: true,
          message: 'TOKEN失效，请重新登录',
          type: "error",
        });
        sessionStorage.clear();
        // router.push({path:`/login?redirect=${route.path}`})

      }
      // 可以在这里处理其他错误
    }
    return Promise.reject(error.response.data.detail);
  }
)



export default apiClient;
