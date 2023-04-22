<!-- 
    评论组件
 -->
<template>
  <div class="commentPage">
    <!-- 评论组件的左半边头像部分 -->
    <div class="leftPart">
      <img :src="commentInfo.observerProfileImg"/>
    </div>

    <!-- 评论组件的右半边详情部分 -->
    <div class="rightPart">
      <!-- 上半部分评论详情内容 -->
      <div class="particular">
        <span>{{commentInfo.observerName}}:</span>
        {{commentInfo.observerContent}}
      </div>

      <!-- 下半部分评论状态信息 -->
      <div class="state">
        <!-- 评论状态中的发布时间 -->
        <div class="time">
          {{commentInfo.observerDate}} {{commentInfo.observerTime}}
        </div>

        <!-- 评论状态中的icon -->
        <div class="likes" :class="isLikeChecked?'iconCheckedState':''">
          <span @click="clickLike" class="iconfont icon-rcd-heart"></span>
          <span v-show="commentInfo.observerLikes">{{commentInfo.observerLikes}}</span>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
export default {
  name:"CommentPage",

  // 接受从ShareItem组件中传递过来的评论详细信息
  props:["commentInfo"],

  data() {
    return {
      // 评论是否被点赞
      isLikeChecked:false,
    }
  },

  methods: {
    clickLike(){
      // console.log("clickLike");
      // 由于props中传递的参数不可以修改，所以这里暂时没有办法动态更新点赞数
      // 之后可以考虑把数据写在vuex中，这样请求数据更方便
      this.isLikeChecked=!this.isLikeChecked;
    }
  },
}
</script>

<style scoped>
.commentPage{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  /* border: 1px solid brown; */
  border-top: 1px solid var(--primaryShadowColor);
  padding: 8px;
}

/* .leftPart{
  border: 1px solid brown;
} */

.leftPart img{
  width: 48px;
  height: 48px;
  border-radius: 100%;
}

.rightPart{
  /* border: 1px solid blue; */
  margin: 0px 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* .rightPart .particular{
  border: 1px solid red;
} */

.rightPart .particular span{
  color: var(--primaryThemeColor);
  font-weight: bold;
  line-height: 24px;
}

.rightPart .state{
  /* border: 1px solid blue; */
  display: flex;
  line-height: 24px;
}

.rightPart .state .time{
  /* border: 1px solid blue; */
  flex-grow: 1;
  color:var(--primaryFontGreyColor);
}

.rightPart .state .likes{
  /* border: 1px solid blue; */
  width: 36px;
  display: flex;
}

.rightPart .state .likes span:first-child{
  cursor: pointer;
  font-size: 24px;
  padding-right: 4px;
}

.iconCheckedState {
  color: var(--primaryThemeColor);
}

</style>