// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue/dist/vue.js'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import CKEditor from 'ckeditor4-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(CKEditor)
Vue.config.productionTip = true
Vue.mixin({
  methods: {
    globalHelper: function () {
      console.log('Hello world')
    }
  }
})

const store = new Vuex.Store({
  state: {
    responseData: []
  },
  getters: {
    getRes (state) {
      window.parent.postMessage(state.responseData, '*')
      console.log('state : ' + state.responseData)
      return state.responseData
    }
  },
  mutations: {
    addResponse (state, res) {
      if (res.startsWith('/') || res.startsWith(' ')) {

      } else {
        state.responseData.push(res)
      }
    },
    resetRes (state) {
      console.log('Resset trang thai')
      state.responseData = []
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
