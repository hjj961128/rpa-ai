import {
  ref
} from "vue";
import {
  defineStore
} from "pinia";
import request from "@/utils/request";
import router from "@/router/index.js";
import { ElMessage } from "element-plus";

export const useUserCounter = defineStore(
  "user",
  () => {
    const userInfo = ref({});
    console.log('12121212');
    const setUserInfo = async () => {
      await request.get("/api/auth/info").then(
        (res) => {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
          router.push("/home");
        },
        (err) => {
          ElMessage({
            showClose: true,
            message: err.response.data.detail,
            type: "error",
          });
        }
      ).catch((err) => {
        ElMessage({
          showClose: true,
          message: err.response.data.detail,
          type: "error",
        });
      });
    };
    //清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
      sessionStorage.removeItem("refresh_token");
      sessionStorage.removeItem("Authorization");
    };
    // //判断是否有权限
    // const hasPermission = (name) =>{
    //     let flag = false
    //     let permissionId = null
    //     permissions.forEach(item =>{
    //         if(name === item.name){
    //             permissionId = item.id
    //         }
    //     })
    //     if(permissionId && userInfo.value.permission){
    //         if(userInfo.value.permission.split(',').indexOf((permissionId.toString())) != -1){
    //             flag = true
    //         }
    //     }
    //     return flag
    // }
    return {
      userInfo,
      setUserInfo,
      clearUserInfo
    };
  }, {
    persist: true, //持久化存储
  }
);