import axios from 'axios';
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router/index.js";


console.log('21313uu12io3u1i23u');
console.log(sessionStorage.getItem('Authorization'));


const API_BASE_URL = 'http://172.20.10.3:8080/'

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

    // ElMessage({
    //   message: error.message|| 'Error',
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    // // window.location.reload();
    // return router.push('/')
  }
)



export default apiClient;
