<template>
  <div>用户列表</div>
</template>

<script>
export default {
  created() {
    console.log("luyyyyy",this.$route);
    document.title=this.$route.meta.title
  },
}
</script>

<style>

</style>