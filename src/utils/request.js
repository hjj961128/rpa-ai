import axios from 'axios';
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router/index.js";


console.log('21313uu12io3u1i23u');
console.log(sessionStorage.getItem('Authorization'));


const API_BASE_URL = 'http://172.28.144.167:8080/'

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
  error=>{
    if (error.response) {
      // 401响应
      if (error.response.status === 401) {
        // 清除token或做其他登录态清除工作
        // store.commit('LOGOUT');
 
        // 使用Vue路由器跳转到登录页面
        router.push('/login');
      }
      // 可以在这里处理其他错误
    }
    return Promise.reject(error);
  }
)



export default apiClient;
