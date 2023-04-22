<!-- 
  主页的活动版块组件
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
  name:"EventPage",

  components:{ShareItem},
}
</script>

<style>

</style>