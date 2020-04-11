<template>
  <div class="App">  
  <router-link to="/">跳转</router-link>
  <span>{{$store.state.tip}}</span>
  <sona></sona>
  <sonb></sonb>
  <router-view></router-view>
  
  </div>
</template>

<script>
import sona from './lianxi/sona.vue'
import sonb from './lianxi/sonb.vue'


export default {
   components:{
     sona,
     sonb
   }
}
</script>

<style lang="less">
  
</style>


