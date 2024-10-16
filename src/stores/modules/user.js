import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/persist'
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";


export const useUserStore = defineStore({
  id: 'rpa-user',
  state: () => ({
    userInfo: ''
  }),
  getters: {},
  actions: {

    async setUserInfo(){
      try {
        const res = await request.get("/api/auth/info")
        this.userInfo = res.data.data

        }catch (e) {
            ElMessage({
            showClose: true,
            message: err,
            type: "error",
          });
        }
    }
  },
})
