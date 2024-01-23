import { createApp } from 'vue'
import App from './App.vue'

import VueFinder from './index.js'

const app = createApp(App);
app.use(VueFinder)
app.mount('#app')
