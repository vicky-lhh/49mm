<template>
  <div class="App">  
  <router-link to="/">跳转</router-link>

  <span>{{$store.state.tip}}</span>
  <sona></sona>
  <sonb></sonb>
  
  <propmit @zdy="search" :msg="msg"></propmit>
  <router-view></router-view>
 
  </div>
</template>

<script>
import sona from './lianxi/sona.vue'
import sonb from './lianxi/sonb.vue'
import  propmit from "./lianxi/propemit.vue"


export default {
  data() {
    return {
      msg:"haha"
    }
  },
   components:{
     sona,
     sonb,
      propmit
   },methods: {
     search(){
        alert('33333');
     }
   },
}
</script>

<style lang="less">
  
</style>


