import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/view/login/login.vue'
import home from '@/view/home/layout.vue'
import chart from '@/view/home/chart/chart.vue'
import question from '@/view/home/question/question.vue'
import businness from '@/view/home/businness/businness.vue'
import userlist from '@/view/home/userlist/userlist.vue'
import subject from '@/view/home/subject/subject.vue'
import {removeToken} from "@/util/token.js"
import store from '@/store/index.js'
import { Message } from 'element-ui'
import  NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use( VueRouter)
const router = new  VueRouter({
    routes:[{
      path:"/",
       component:login,
       meta:{
        title:"登录",
        rules:["超级管理员","管理员","老师","学生"]
       }
    },{
      path:"/home",
       component:home,
       redirect:"/home/subject",
       children :[
         { path:"chart",
         component:chart,
         meta:{
          title:"数据概览",
          rules:["超级管理员","管理员","老师"],
          icon:"el-icon-pie-chart"
        }},
         { path:"userlist",
         component:userlist,
         meta:{
           title:"用户列表",
           rules:["超级管理员","管理员"],
           icon:"el-icon-user"
         }
        },
         { path:"question",
         component:question,
         meta:{
          title:"题库列表",
          rules:["超级管理员","管理员","老师"],
          icon:"el-icon-edit-outline"
        }},
         { path:"businness",
         component:businness,
         meta:{
          title:"企业列表",
          rules:["超级管理员","管理员","老师"],
          icon:"el-icon-office-building"
        }},
         { path:"subject",
         component:subject,
         meta:{
          title:"学科列表",
          rules:["超级管理员","管理员","老师","学生"],
          icon:"el-icon-notebook-2"
        }},
        ]
    }
   ]
 })
 router.beforeEach((to, from, next) => {
  //路由进入前处理
   console.log("to:",to)
   console.log("from:",from)
   NProgress.start()
  
// if(to.fullPath=="/"){
//   next("/login")
// }else{
//   next()
// }
 if(to.meta.rules.includes(store.state.role)){
  next()
 }else{
   Message.warning("无权访问")
   removeToken()
   next("/")
 }

})

router.afterEach((to) => {
  NProgress.done()
  document.title=to.meta.title
})

 export default router