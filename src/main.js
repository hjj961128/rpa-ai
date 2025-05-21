import './assets/main.css'

import {createApp} from 'vue'

// 引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



// 引入整个项目入口文件
import App from './App.vue'

// 引入路由
import router from './router'

// 引入echarts
import * as echarts from 'echarts'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import pinia from '@/stores'

//svg
import svgIcon from './components/svgIcon.vue';
// import vue3videoPlay from 'vue3-video-play' // 引入组件
// import '/dist/style.css' // 引入css

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//挂载到全局
app.use(vue3videoPlay)
app.use(pinia)
app.component('svg-icon', svgIcon);
app.use(ElementPlus, {locale: zhCn})
app.use(router)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
