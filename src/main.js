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

const app = createApp(App)

app.use(router)
app.config.globalProperties.$echarts = echarts
app.use(ElementPlus)
app.mount('#app')
