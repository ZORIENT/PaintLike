<!-- 
  主页的热门版块组件
 -->

<template>
  <div>
    <ShareItem/>
    <ShareItem/>
    <ShareItem/>
  </div>
</template>

<script>
import ShareItem from './ShareItem.vue'

export default {
  name:"HotPage",

  components:{ShareItem},
}
</script>

<style>

</style>