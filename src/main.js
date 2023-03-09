import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// 引入echarts核心模块，核心模块提供了echarts使用必须要的接口
import * as echarts from 'echarts/core'
// 引入柱状图图表,图标后缀都为Chart
import { BarChart, PieChart} from 'echarts/charts'
// 引入提示框,标题,直角坐标系组件,组件后缀都为Component
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
// 引入Canvas  注意引入CanvasRenderer或者SVGRenderer是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, PieChart, CanvasRenderer])
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import uploader from 'vue-simple-uploader'


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(uploader)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
