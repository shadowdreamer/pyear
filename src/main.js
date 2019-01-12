import Vue from 'vue'
import App from './App.vue'
import { Button, Select,Option,Input,InputNumber,DatePicker,Loading} from 'element-ui';
import h2c from 'html2canvas'
import c2img from './components/canvas2image.js'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Loading.directive)

Vue.prototype.$h2c = h2c;
Vue.prototype.$c2img = c2img;

new Vue({
  render: h => h(App),
}).$mount('#app')
