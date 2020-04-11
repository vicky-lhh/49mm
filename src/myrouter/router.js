import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/view/login/login.vue'
import home from '@/view/home/layout.vue'
import chart from '@/view/home/chart/chart.vue'
import question from '@/view/home/question/question.vue'
import businness from '@/view/home/businness/businness.vue'
import userlist from '@/view/home/userlist/userlist.vue'
import subject from '@/view/home/subject/subject.vue'

import  NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use( VueRouter)
const router = new  VueRouter({
    routes:[{
      path:"/",
       component:login
    },{
      path:"/home",
       component:home,
       redirect:"/home/userlist",
       children:[
         { path:"chart",
         component:chart,
         meta:{
          title:"数据概览"
        }},
         { path:"userlist",
         component:userlist,
         meta:{
           title:"用户列表"
         }
        },
         { path:"question",
         component:question,
         meta:{
          title:"题库列表"
        }},
         { path:"businness",
         component:businness,
         meta:{
          title:"企业列表"
        }},
         { path:"subject",
         component:subject,
         meta:{
          title:"学科列表"
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
   next()
// if(to.fullPath=="/"){
//   next("/login")
// }else{
//   next()
// }

})

router.afterEach((to) => {
  NProgress.done()
  document.title=to.meta.title
})

 export default router