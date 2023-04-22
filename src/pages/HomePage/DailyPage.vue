<!-- 
  主页的日常组件
 -->
<template>
  <div>
    <ShareItem/>
    <ShareItem/>
    <ShareItem/>
    <ShareItem/>
  </div>
</template>

<script>
import ShareItem from './ShareItem.vue'
export default {
  name:"DailyPage",

  components:{ShareItem},
}
</script>

<style>

</style>