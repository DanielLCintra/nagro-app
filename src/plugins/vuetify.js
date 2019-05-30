import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#000000',
    secondary: '#3f51b5',
    accent: '#673ab7',
    error: '#f44336',
    warning: '#ffc107',
    info: '#00bcd4',
    success: '#4caf50'
  }
})
