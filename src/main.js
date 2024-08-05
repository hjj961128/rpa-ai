import './assets/main.css'

import { createApp } from 'vue'

// 引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// 引入整个项目入口文件
import App from './App.vue'

// 引入路由
import router from './router'

// 引入echarts
import * as echarts from 'echarts'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { createPinia } from 'pinia'

//svg
import svgIcon from './components/svgIcon.vue';

const app = createApp(App)

const pinia = createPinia()
//挂载到全局
app.use(pinia)
app.component('svg-icon', svgIcon);
app.use(ElementPlus,{locale:zhCn})
app.use(router)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
