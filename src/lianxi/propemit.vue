<template>
  <div>
       <button @click="liclick">点我呀prop</button>  {{msg}}
  </div>
 
</template>

<script>
export default {
  props:{
      msg:{
          type:String,
          default:"我是默认的"
          }
     
  },
  methods: {
      liclick(){
          this.$emit("zdy")
      }
  },
}
</script>

<style>

</style>