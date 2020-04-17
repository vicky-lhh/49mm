import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
      tip:"电脑好卡呀,ll",
      sona:"我是儿子a",
      userinfo:"",
      roleObj: {
        1:"超级管理员",
        2: "管理员",
        3: "老师",
        4: "学生"
      },
      queObj: {
        1:"简单",
        2: "一般",
        3: "困难",
      },
      role:"超级管理员"
    }
 })
 export default store