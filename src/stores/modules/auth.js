import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/persist'
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";


export const useTokenStore = defineStore({
  id: 'rpa-token',
  state: () => ({
    token: '',
    refresh_token:'',
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token) {
      this.token = token
    },

    setRefreshToken(refresh_token) {
      this.refresh_token = refresh_token
    },

  },
  persist: piniaPersistConfig('rpa-token')
})
