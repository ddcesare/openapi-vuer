import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(Vuex)

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  },
})

import jsonApi from './anapi.json'

const store = new Vuex.Store({
  state: {
    spec: jsonApi
  },
  getters: {
    spec: state => state.spec
  }
})

const app = new Vue({
  el: '#app',
  store,
  render: h => h(App)

})

console.log(store, app)
