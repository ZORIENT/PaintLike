<!-- 
  主页的漫画组件
 -->
<template>
  <div class="caricaturePage">
    <ShareItem/>
    <ShareItem/>
    <ShareItem/>
    <ShareItem/>
    <ShareItem/>
  </div>
</template>

<script>
import ShareItem from './ShareItem.vue'
export default {
  name:"CaricaturePage",

  components:{ShareItem},
}
</script>

<style scoped>
</style>