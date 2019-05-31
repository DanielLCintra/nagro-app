import vue from 'vue'

vue.filter('cpfFormat', (value) => {
  return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(9, 2)}`
})
