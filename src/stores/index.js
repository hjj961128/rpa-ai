import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia persist
const pinia = createPinia()
// 引入pin持久化
pinia.use(piniaPluginPersistedstate)

export default pinia
