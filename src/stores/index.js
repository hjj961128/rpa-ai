import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// app.use(createPinia().use(persist))
const pinia=createPinia()
pinia.use(persist)
export default pinia
export * from './user'
