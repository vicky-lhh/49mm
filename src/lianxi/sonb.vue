<template>
  <div>
    <button @click="updata">我是儿子b点我修改aa</button>
  </div>
</template>

<script>
export default {
methods: {
    updata(){
        this.$store.state.sona="修改了"+Math.random()*100
    }
},
}
</script>

<style>

</style>