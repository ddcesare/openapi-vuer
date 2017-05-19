import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import App from './App.vue'
import * as OAI from 'oai-ts-core'

Vue.use(Vuex)
Vue.use(VueMaterial)

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


import petstoreSpec2 from './petstore-extended-2.json'
const spec = petstoreSpec2

const oai = new OAI.OasLibraryUtils();
const oasDoc = oai.createDocument(spec)

const store = new Vuex.Store({
  state: {
    spec,
    oasDoc
  },
  getters: {
    spec: state => state.spec
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

console.log(store.getters.spec)
