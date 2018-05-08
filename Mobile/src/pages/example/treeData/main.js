import createMain from '@/static/js/createMain.js'
import createRouter from '@/static/js/createRouter'
import routes from './routers'
import App from './app.vue'

createMain(App, createRouter(routes))
