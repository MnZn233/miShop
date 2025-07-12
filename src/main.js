import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 从数据文件中导入方法
import { getShangPinData, getShangPinDataById } from "./testdata/data.js"

const app = createApp(App)

//导入数据
app.config.globalProperties.$malldata = getShangPinData("shouji");
app.config.globalProperties.$getShangPinDataById = getShangPinDataById;

//注册全局方法
app.config.globalProperties.$getShangPinData = getShangPinData;

app.use(createPinia())
app.use(router)

app.mount('#app')
