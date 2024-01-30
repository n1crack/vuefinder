import { createApp } from 'vue'
import App from './App.vue'

import VueFinder from '../src/index.js'

const app = createApp(App);
app.use(VueFinder)
app.mount('#app')
