import axios from 'axios';
import { ElMessage } from "element-plus";


const API_BASE_URL = ''



import { useTokenStore } from '@/stores/modules/auth'


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  // 其他axios配置选项
});
 // 请求拦截器
 apiClient.interceptors.request.use(
  (config) => {
      const tokenStore = useTokenStore()
    const accessToken = tokenStore.token;
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
