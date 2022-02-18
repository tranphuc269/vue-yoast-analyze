// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue/dist/vue.js'
import App from './App'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    responseData: []
  },
  getters: {
    getRes (state) {
      window.parent.postMessage(state.responseData, '*')
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
      state.responseData = []
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
